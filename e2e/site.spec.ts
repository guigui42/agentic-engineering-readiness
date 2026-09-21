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

const coreQuestionIds = [
  'governance-scope',
  'governance-risk',
  'governance-review',
  'governance-deployment',
  'governance-audit',
  'governance-learning',
  'knowledge-repository',
  'knowledge-decisions',
  'knowledge-definition',
  'knowledge-signals',
  'knowledge-freshness',
  'knowledge-learning',
  'adoption-define',
  'adoption-deliver',
  'adoption-assess',
  'adoption-detect',
  'adoption-portfolio',
  'adoption-evidence',
]

async function interceptAnalytics(
  page: Page,
  payloads: HydroPayload[] = [],
) {
  await page.route('https://collector.githubapp.com/**', async (route) => {
    payloads.push(route.request().postDataJSON() as HydroPayload)
    await route.fulfill({ status: 204 })
  })

  return payloads
}

async function seedCoreAssessment(page: Page, value: 0 | 1 | 2 | 3) {
  const answers = Object.fromEntries(coreQuestionIds.map((id) => [id, value]))
  await page.evaluate((storedAnswers) => {
    localStorage.setItem(
      'agentic-engineering-readiness-v1',
      JSON.stringify({ version: 1, answers: storedAnswers }),
    )
  }, answers)
  await page.reload()
}

test('classifies a completed core assessment and persists it locally', async ({
  page,
}) => {
  await interceptAnalytics(page)
  await page.goto('./')
  await seedCoreAssessment(page, 3)

  await expect(
    page.getByRole('heading', { name: 'Healthy agent-native system' }),
  ).toBeVisible()
  await expect(page.getByText('Your result')).toBeVisible()

  await page.reload()
  await expect(
    page.getByRole('heading', { name: 'Healthy agent-native system' }),
  ).toBeVisible()
})

test('publishes complete search and sharing metadata', async ({ page, request }) => {
  await interceptAnalytics(page)
  await page.goto('./')

  await expect(page).toHaveTitle(
    'Agentic Engineering Readiness | GitHub AES Assessment',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://guigui42.github.io/agentic-engineering-readiness/',
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /governance, shared knowledge, agent adoption/i,
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
  expect(await robots.text()).toContain(
    'Sitemap: https://guigui42.github.io/agentic-engineering-readiness/sitemap.xml',
  )

  const sitemap = await request.get('./sitemap.xml')
  expect(sitemap.ok()).toBe(true)
  expect(await sitemap.text()).toContain(
    '<loc>https://guigui42.github.io/agentic-engineering-readiness/</loc>',
  )
})

test('has no detectable WCAG A or AA violations', async ({ page }) => {
  await interceptAnalytics(page)
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
  await interceptAnalytics(page)
  await page.goto('./')

  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})

test('keeps assessment values out of analytics payloads', async ({ page }) => {
  const payloads = await interceptAnalytics(page)
  await page.goto('./')

  await page.getByRole('radio', { name: 'Established' }).first().check()

  await expect.poll(
    () => payloads.flatMap((payload) => payload.events ?? []).length,
  ).toBe(1)

  const events = payloads.flatMap((payload) => payload.events ?? [])
  expect(events[0]).toMatchObject({
    context: {
      action: 'change',
      category: 'assessment',
      label: 'response-selected',
      site: 'agentic-engineering-readiness',
    },
    type: 'agentic_engineering_readiness.interaction',
  })

  const serialized = JSON.stringify(events)
  expect(serialized).not.toContain('precondition-infrastructure')
  expect(serialized).not.toContain('"score"')
  expect(serialized).not.toContain('"quadrant"')
  expect(serialized).not.toContain('"value":2')
})
