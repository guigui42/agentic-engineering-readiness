import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  createRoot: vi.fn(),
  render: vi.fn(),
}))

vi.mock('react-dom/client', () => ({
  createRoot: mocks.createRoot,
}))

vi.mock('./App.tsx', () => ({
  default: () => null,
}))

describe('application entry point', () => {
  beforeEach(() => {
    vi.resetModules()
    mocks.createRoot.mockReset()
    mocks.render.mockReset()
    mocks.createRoot.mockReturnValue({ render: mocks.render })
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('renders without initializing external analytics', async () => {
    await import('./main.tsx')

    expect(mocks.createRoot).toHaveBeenCalledOnce()
    expect(mocks.render).toHaveBeenCalledOnce()
  })
})
