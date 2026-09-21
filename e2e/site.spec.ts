import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

interface HydroPayload {
  page_views?: Array<{
    context?: Record<string, string>
    page: string
    title: string
  }>
  events?: Array<{
    context?: Record<string, string>
    page: string
    title: string
    type: string
  }>
}

const questionDimensions = {
  'precondition-infrastructure': 'preconditions',
  'precondition-skills': 'preconditions',
  'precondition-culture': 'preconditions',
  'precondition-access': 'preconditions',
  'governance-scope': 'governance',
  'governance-proportionality': 'governance',
  'governance-layered': 'governance',
  'knowledge-guidance': 'knowledge',
  'knowledge-definition': 'knowledge',
  'knowledge-context': 'knowledge',
  'adoption-define': 'adoption',
  'adoption-deliver': 'adoption',
  'adoption-detect': 'adoption',
  'value-outcomes': 'value',
  'value-quality': 'value',
  'learning-loop': 'learning',
} as const

test.beforeEach(async ({ page }) => {
  await page.route('https://collector.githubapp.com/**', async (route) => {
    await route.fulfill({ status: 204 })
  })
})

async function interceptAnalytics(
  page: Page,
  payloads: HydroPayload[] = [],
) {
  await page.unroute('https://collector.githubapp.com/**')
  await page.route('https://collector.githubapp.com/**', async (route) => {
    payloads.push(route.request().postDataJSON() as HydroPayload)
    await route.fulfill({ status: 204 })
  })
  return payloads
}

async function seedReadinessCheck(
  page: Page,
  values: {
    scope?: string
    preconditions?: 0 | 1 | 2 | 3
    governance?: 0 | 1 | 2 | 3
    knowledge?: 0 | 1 | 2 | 3
    adoption?: 0 | 1 | 2 | 3
    value?: 0 | 1 | 2 | 3
    learning?: 0 | 1 | 2 | 3
  } = {},
) {
  const resolved = {
    scope: 'Payments bug fixes',
    preconditions: 2,
    governance: 3,
    knowledge: 3,
    adoption: 2,
    value: 2,
    learning: 2,
    ...values,
  }
  const answers = Object.fromEntries(
    Object.entries(questionDimensions).map(([id, dimension]) => [
      id,
      resolved[dimension],
    ]),
  )
  const baselineAnswers = Object.fromEntries(
    Object.entries(answers).filter(([id]) =>
      id.startsWith('precondition-'),
    ),
  )
  const workflowAnswers = Object.fromEntries(
    Object.entries(answers).filter(
      ([id]) => !id.startsWith('precondition-'),
    ),
  )
  await page.evaluate(
    ({ scope, storedBaseline, storedWorkflow }) => {
      localStorage.setItem(
        'agentic-engineering-baseline-v1',
        JSON.stringify({ version: 1, answers: storedBaseline }),
      )
      localStorage.setItem(
        'agentic-engineering-workflow-v1',
        JSON.stringify({ version: 1, scope, answers: storedWorkflow }),
      )
    },
    {
      scope: resolved.scope,
      storedBaseline: baselineAnswers,
      storedWorkflow: workflowAnswers,
    },
  )
  await page.reload()
}

test('classifies a scoped workflow and persists it locally', async ({ page }) => {
  await page.goto('./')
  await seedReadinessCheck(page)

  await expect(
    page.getByRole('heading', { name: 'Healthy agent-native system' }),
  ).toBeVisible()
  await expect(page.getByText('Payments bug fixes', { exact: true })).toBeVisible()
  await expect(page.getByText('Your result')).toBeVisible()

  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Healthy agent-native system' }),
  ).toBeVisible()
})

test('blocks placement while a precondition is unresolved', async ({ page }) => {
  await page.goto('./')
  await seedReadinessCheck(page, { preconditions: 1 })

  await expect(
    page.getByRole('heading', {
      name: 'Resolve operating preconditions before placement',
    }),
  ).toBeVisible()
  await expect(page.getByText(/operating preconditions unresolved/i)).toBeVisible()
  await expect(page.getByText('Your result')).toHaveCount(0)
})

test('renders a concrete implementation checklist', async ({ page }) => {
  await page.goto('./')
  await seedReadinessCheck(page, {
    governance: 1,
    knowledge: 1,
    adoption: 0,
    value: 1,
    learning: 1,
  })

  await expect(
    page.getByRole('heading', { name: 'Implementation plan' }),
  ).toBeVisible()
  await expect(page.getByText('GitHub surface').first()).toBeVisible()
  await expect(page.getByText('Implement').first()).toBeVisible()
  await expect(page.getByText('Verify').first()).toBeVisible()
  await expect(
    page.getByText(
      'Strengthen the weaker foundation before delegation expands',
    ),
  ).toBeVisible()
  await expect(
    page.getByText('Pilot one bounded delivery class'),
  ).toHaveCount(0)

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()
  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2),
  ).toEqual([])

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasOverflow).toBe(false)
})

test('publishes independent search and sharing metadata', async ({ page, request }) => {
  await page.goto('./')

  await expect(page).toHaveTitle(
    'Agentic Engineering Readiness | GitHub AES Check',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://guigui42.github.io/agentic-engineering-readiness/',
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /AES readiness check for one workflow/i,
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /social-card\.png$/,
  )
  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent()
  expect(JSON.parse(structuredData ?? '{}')).toMatchObject({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
  })

  const robots = await request.get('./robots.txt')
  expect(robots.ok()).toBe(true)

  const sitemap = await request.get('./sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  expect(await sitemap.text()).toContain(
    '<loc>https://guigui42.github.io/agentic-engineering-readiness/</loc>',
  )
})

test('has no detectable WCAG A or AA violations', async ({ page }) => {
  await page.goto('./')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2),
  ).toEqual([])
})

test('fits the selected viewport without horizontal overflow', async ({ page }) => {
  await page.goto('./')

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})

test('keeps Hydro analytics controlled and readiness content local', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === 'mobile-chromium',
    'Hydro batch timing is covered deterministically by unit tests and desktop Chromium.',
  )
  const payloads = await interceptAnalytics(page)
  const externalRequests: string[] = []
  page.on('request', (request) => {
    const url = new URL(request.url())
    if (
      url.origin !== 'http://127.0.0.1:4173' &&
      url.origin !== 'https://collector.githubapp.com'
    ) {
      externalRequests.push(request.url())
    }
  })

  await page.goto('./')
  await page
    .getByLabel('Name the workflow, team, or repository class')
    .fill('Payments bug fixes')
  await page
    .locator('#section-governance')
    .getByRole('radio', { name: 'Established' })
    .first()
    .check()

  await expect.poll(() =>
    page.evaluate(() =>
      localStorage.getItem('agentic-engineering-workflow-v1'),
    ),
  ).toContain('"scope":"Payments bug fixes"')

  await expect
    .poll(
      () => payloads.flatMap((payload) => payload.events ?? []).length,
      { timeout: 15_000 },
    )
    .toBe(1)

  const pageViews = payloads.flatMap((payload) => payload.page_views ?? [])
  const events = payloads.flatMap((payload) => payload.events ?? [])
  expect(pageViews).toHaveLength(1)
  expect(events[0]).toMatchObject({
    context: {
      action: 'change',
      category: 'readiness',
      label: 'response-selected',
      site: 'agentic-engineering-readiness',
    },
    type: 'aes_assessment.interaction',
  })

  const serialized = JSON.stringify(payloads)
  expect(serialized).not.toContain('Payments bug fixes')
  expect(serialized).not.toContain('precondition-infrastructure')
  expect(serialized).not.toContain('"score"')
  expect(serialized).not.toContain('"quadrant"')
  expect(externalRequests).toEqual([])
})
