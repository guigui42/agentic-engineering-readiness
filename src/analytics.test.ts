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
  it('creates a client for a valid Hydro app ID', () => {
    const client = createAnalyticsClient(' agentic-engineering-readiness ')

    expect(client?.collectorUrl).toBe(
      'https://collector.githubapp.com/agentic-engineering-readiness/collect',
    )
  })

  it('stays disabled when the Hydro app ID is absent', () => {
    expect(createAnalyticsClient(undefined)).toBeUndefined()
    expect(createAnalyticsClient('  ')).toBeUndefined()
  })

  it('rejects malformed Hydro app IDs', () => {
    expect(() => createAnalyticsClient('agentic/readiness')).toThrow(
      'Invalid Hydro app ID: agentic/readiness',
    )
  })

  it('disables analytics without breaking the app when runtime config is invalid', () => {
    const reportError = vi.fn()

    expect(
      createConfiguredAnalyticsClient('agentic/readiness', reportError),
    ).toBeUndefined()
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid Hydro app ID: agentic/readiness',
      }),
    )
  })

  it('publishes page views and controlled interaction context', () => {
    const client = createTransport()

    trackPageView(client)
    trackInteraction(
      {
        category: 'assessment',
        action: 'change',
        label: 'response-selected',
      },
      client,
    )

    expect(client.sendPageView).toHaveBeenCalledOnce()
    expect(client.sendBatchedEvent).toHaveBeenCalledWith(
      'agentic_engineering_readiness.interaction',
      {
        category: 'assessment',
        action: 'change',
        label: 'response-selected',
      },
    )
  })
})
