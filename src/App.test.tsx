import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { assessmentQuestions } from './assessment/questions'
import App from './App'

const { trackInteraction } = vi.hoisted(() => ({
  trackInteraction: vi.fn(),
}))

vi.mock('./analytics', () => ({
  trackInteraction,
}))

Object.defineProperty(navigator, 'clipboard', {
  configurable: true,
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
})

function seedReadinessCheck({
  scope = 'Payments bug fixes',
  preconditions = 2,
  governance = 3,
  knowledge = 3,
  adoption = 2,
  value = 2,
  learning = 2,
}: {
  scope?: string
  preconditions?: 0 | 1 | 2 | 3
  governance?: 0 | 1 | 2 | 3
  knowledge?: 0 | 1 | 2 | 3
  adoption?: 0 | 1 | 2 | 3
  value?: 0 | 1 | 2 | 3
  learning?: 0 | 1 | 2 | 3
} = {}) {
  const values = {
    preconditions,
    governance,
    knowledge,
    adoption,
    value,
    learning,
  }
  const answers = Object.fromEntries(
    assessmentQuestions.map((question) => [
      question.id,
      values[question.dimension],
    ]),
  )
  localStorage.setItem(
    'agentic-engineering-readiness-v2',
    JSON.stringify({ version: 2, scope, answers }),
  )
}

describe('App', () => {
  beforeEach(() => {
    trackInteraction.mockClear()
  })

  it('presents an independent, scoped readiness check and public sources', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /prepare your agentic engineering system/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Check one workflow, not the whole organization',
      }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('What are you checking?')).toBeInTheDocument()
    expect(
      screen.getAllByText(/anonymous usage analytics/i).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getByText(/independent, unofficial resource/i),
    ).toBeInTheDocument()
    expect(document.querySelector('.hero')).not.toHaveTextContent(
      'Independent, unofficial',
    )
    expect(
      screen.getByRole('heading', { name: 'Public source index' }),
    ).toBeInTheDocument()
  })

  it('stores the scope and answers locally', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(
      screen.getByLabelText('What are you checking?'),
      'Payments bug fixes',
    )
    await user.click(
      screen.getAllByRole('radio', { name: /Established/ })[0],
    )

    await waitFor(() => {
      const stored = localStorage.getItem('agentic-engineering-readiness-v2')
      expect(stored).toContain('"scope":"Payments bug fixes"')
      expect(stored).toContain('"precondition-infrastructure":2')
    })
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'readiness',
      action: 'change',
      label: 'response-selected',
    })
  })

  it('blocks placement when a precondition is unresolved', () => {
    seedReadinessCheck({ preconditions: 1 })
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'Resolve operating preconditions before placement',
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Your result')).not.toBeInTheDocument()
  })

  it('classifies healthy foundations and broad participation', () => {
    seedReadinessCheck()
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Healthy agent-native system' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: 'Governance score' })
        .closest('article'),
    ).toHaveTextContent('Strong')
    expect(screen.getByText('Embedded')).toBeInTheDocument()
    expect(screen.getByText('GitHub surface')).toBeInTheDocument()
    expect(screen.getByText('Implement')).toBeInTheDocument()
    expect(screen.getByText('Verify')).toBeInTheDocument()
  })

  it('copies the page link and scoped implementation checklist', async () => {
    const user = userEvent.setup()
    const clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText')
    seedReadinessCheck({ governance: 1, knowledge: 1, adoption: 0 })
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Copy page link' }))
    expect(clipboardSpy).toHaveBeenCalledWith(
      'https://guigui42.github.io/agentic-engineering-readiness/',
    )

    await user.click(
      screen.getByRole('button', { name: 'Copy implementation checklist' }),
    )
    expect(clipboardSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('Scope: Payments bug fixes'),
    )
    expect(clipboardSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('Independent, unofficial resource'),
    )
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'navigation',
      action: 'copy',
      label: 'page-link',
    })
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'result',
      action: 'copy',
      label: 'implementation-checklist',
    })
  })

  it('requires confirmation before clearing local scope and answers', async () => {
    const user = userEvent.setup()
    seedReadinessCheck()
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'Reset local readiness check' }),
    )
    expect(
      screen.getByRole('button', { name: 'Confirm reset' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Healthy agent-native system' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Confirm reset' }))
    expect(
      screen.getByRole('heading', {
        name: 'Name the workflow you are checking',
      }),
    ).toBeInTheDocument()
  })
})
