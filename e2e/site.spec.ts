import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

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
  await page.evaluate(
    ({ scope, storedAnswers }) => {
      localStorage.setItem(
        'agentic-engineering-readiness-v2',
        JSON.stringify({ version: 2, scope, answers: storedAnswers }),
      )
    },
    { scope: resolved.scope, storedAnswers: answers },
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
    'Independent Agentic Engineering Readiness Check',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://guigui42.github.io/agentic-engineering-readiness/',
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /independent, unofficial AES readiness check/i,
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

test('keeps scope and answers local without external requests', async ({ page }) => {
  const externalRequests: string[] = []
  page.on('request', (request) => {
    const url = new URL(request.url())
    if (url.origin !== 'http://127.0.0.1:4173') {
      externalRequests.push(request.url())
    }
  })

  await page.goto('./')
  await page.getByLabel('What are you checking?').fill('Payments bug fixes')
  await page.getByRole('radio', { name: 'Established' }).first().check()

  await expect.poll(() =>
    page.evaluate(() =>
      localStorage.getItem('agentic-engineering-readiness-v2'),
    ),
  ).toContain('"scope":"Payments bug fixes"')
  expect(externalRequests).toEqual([])
})
