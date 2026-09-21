import { describe, expect, it, vi } from 'vitest'
import {
  createAnalyticsClient,
  createConfiguredAnalyticsClient,
  trackInteraction,
  trackPageView,
  type AnalyticsTransport,
} from './analytics'

function createTransport(): AnalyticsTransport {
  return {
    collectorUrl: 'https://collector.example.test/collect',
    sendPageView: vi.fn(),
    sendBatchedEvent: vi.fn(),
  }
}

describe('analytics', () => {
  it('creates the configured AES assessment collector', () => {
    const client = createAnalyticsClient(' aes-assessment ')

    expect(client?.collectorUrl).toBe(
      'https://collector.githubapp.com/aes-assessment/collect',
    )
  })

  it('stays disabled when an explicit app ID is absent', () => {
    expect(createAnalyticsClient(undefined)).toBeUndefined()
    expect(createAnalyticsClient('  ')).toBeUndefined()
  })

  it('rejects malformed Hydro app IDs', () => {
    expect(() => createAnalyticsClient('aes/assessment')).toThrow(
      'Invalid Hydro app ID: aes/assessment',
    )
  })

  it('disables analytics without breaking the app when runtime config is invalid', () => {
    const reportError = vi.fn()

    expect(
      createConfiguredAnalyticsClient('aes/assessment', reportError),
    ).toBeUndefined()
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid Hydro app ID: aes/assessment',
      }),
    )
  })

  it('publishes page views and controlled interaction context', () => {
    const client = createTransport()

    trackPageView(client)
    trackInteraction(
      {
        category: 'readiness',
        action: 'change',
        label: 'response-selected',
      },
      client,
    )

    expect(client.sendPageView).toHaveBeenCalledOnce()
    expect(client.sendBatchedEvent).toHaveBeenCalledWith(
      'aes_assessment.interaction',
      {
        category: 'readiness',
        action: 'change',
        label: 'response-selected',
      },
    )
  })
})
