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

function seedCoreAnswers(value: 0 | 1 | 2 | 3) {
  const answers = Object.fromEntries(
    assessmentQuestions
      .filter((question) =>
        ['governance', 'knowledge', 'adoption'].includes(question.dimension),
      )
      .map((question) => [question.id, value]),
  )
  localStorage.setItem(
    'agentic-engineering-readiness-v1',
    JSON.stringify({ version: 1, answers }),
  )
}

describe('App', () => {
  beforeEach(() => {
    trackInteraction.mockClear()
  })

  it('presents the framework, assessment, results, and public sources', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /prepare your agentic engineering system/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Assess the system around agent work' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Complete the core assessment' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Public source index' }),
    ).toBeInTheDocument()

    for (const link of document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="http"]',
    )) {
      expect(link.target).toBe('_blank')
      expect(link.rel).toContain('noopener')
      expect(link.rel).toContain('noreferrer')
    }
  })

  it('stores a controlled response locally without sending its value to analytics', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(
      screen.getAllByRole('radio', { name: /Established/ })[0],
    )

    await waitFor(() => {
      expect(localStorage.getItem('agentic-engineering-readiness-v1')).toContain(
        '"precondition-infrastructure":2',
      )
    })
    expect(trackInteraction).toHaveBeenCalledWith({
      category: 'assessment',
      action: 'change',
      label: 'response-selected',
    })
  })

  it('classifies strong foundations and broad adoption as healthy agent-native', () => {
    seedCoreAnswers(3)
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Healthy agent-native system' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('progressbar', { name: 'Governance score' })
        .closest('article'),
    ).toHaveTextContent('100%')
    expect(
      screen.getByText('Your result', { selector: '.matrix-cell span' })
        .closest('article'),
    ).toHaveTextContent('Healthy agent-native system')
    expect(screen.getByText('GitHub surface')).toBeInTheDocument()
    expect(screen.getByText('Implement in GitHub')).toBeInTheDocument()
    expect(screen.getByText('Verify in GitHub')).toBeInTheDocument()
  })

  it('copies the public page link and Markdown plan', async () => {
    const user = userEvent.setup()
    const clipboardSpy = vi.spyOn(navigator.clipboard, 'writeText')
    seedCoreAnswers(1)
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Copy page link' }))
    expect(clipboardSpy).toHaveBeenCalledWith(
      'https://guigui42.github.io/agentic-engineering-readiness/',
    )

    await user.click(
      screen.getByRole('button', { name: 'Copy GitHub checklist' }),
    )
    expect(clipboardSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('# Agentic Engineering readiness assessment'),
    )
  })

  it('requires confirmation before clearing local answers', async () => {
    const user = userEvent.setup()
    seedCoreAnswers(2)
    render(<App />)

    await user.click(
      screen.getByRole('button', { name: 'Reset local answers' }),
    )
    expect(
      screen.getByRole('button', { name: 'Confirm reset' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Healthy agent-native system' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Confirm reset' }))
    expect(
      screen.getByRole('heading', { name: 'Complete the core assessment' }),
    ).toBeInTheDocument()
  })
})
