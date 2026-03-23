import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef, ReactNode } from 'react'

import { AlertStatusType } from '@/components/atoms/common/Alert'

import { fireEvent, render, screen, waitFor } from '../../../../../.jest/customRender'
import { ToastProvider, useToast } from '.'
import { ToastOptions } from './types'

expect.extend(toHaveNoViolations)

type AddToastProps = {
  status?: AlertStatusType
  message?: ReactNode
  title?: string
  options?: ToastOptions
}

const ToastButton = ({ status, message, title = 'Title', options }: AddToastProps) => {
  const { addToast } = useToast()
  return (
    <button
      onClick={() =>
        addToast(status ?? 'error', message ?? 'Message', title, options ?? {})
      }
      data-testid="button"
    >
      Show Toast
    </button>
  )
}

const renderWithProvider = (children: ReactNode, ref?: React.Ref<HTMLDivElement>) => {
  return render(
    <ToastProvider ref={ref}>
      {children}
    </ToastProvider>,
    {},
  )
}

const triggerToast = async () => {
  await act(async () => {
    fireEvent.click(screen.getByTestId('button'))
  })
}

describe('ToastProvider', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('Semantics', () => {
    it('ToastsWrap always present as persistent aria-live region', async () => {
      renderWithProvider(<ToastButton />)

      expect(screen.getByTestId('ToastsWrap')).toBeInTheDocument()
    })

    it('error toast has aria-live assertive and aria-atomic true', async () => {
      renderWithProvider(<ToastButton status="error" />)
      await triggerToast()

      const toast = screen.getByTestId('Toast')
      expect(toast).toHaveAttribute('aria-live', 'assertive')
      expect(toast).toHaveAttribute('aria-atomic', 'true')
    })

    it('non-error toast has aria-live polite', async () => {
      renderWithProvider(<ToastButton status="success" />)
      await triggerToast()

      expect(screen.getByTestId('Toast')).toHaveAttribute('aria-live', 'polite')
    })

    it('error status gets role alert', async () => {
      renderWithProvider(<ToastButton status="error" />)
      await triggerToast()

      expect(screen.getByTestId('Toast')).toHaveAttribute('role', 'alert')
    })

    it('non-error status has no role', async () => {
      const statuses: AlertStatusType[] = ['success', 'info', 'warning', 'none']
      for (const status of statuses) {
        const { unmount } = renderWithProvider(<ToastButton status={status} />)
        await triggerToast()

        expect(screen.getByTestId('Toast')).not.toHaveAttribute('role')
        unmount()
      }
    })

    it('renders title', async () => {
      renderWithProvider(<ToastButton title="Test Title" />)
      await triggerToast()

      expect(screen.getByTestId('Span')).toHaveTextContent('Test Title')
    })

    it('renders message', async () => {
      renderWithProvider(<ToastButton message="Test Message" />)
      await triggerToast()

      expect(screen.getByTestId('Toast')).toHaveTextContent('Test Message')
    })

    it('no title renders no Span', async () => {
      const NoTitleButton = () => {
        const { addToast } = useToast()
        return (
          <button onClick={() => addToast('success', 'Message')} data-testid="button">
            Show Toast
          </button>
        )
      }
      renderWithProvider(<NoTitleButton />)
      await triggerToast()

      expect(screen.queryByTestId('Span')).not.toBeInTheDocument()
    })

    it('persistent toast renders ClearButton', async () => {
      renderWithProvider(<ToastButton options={{ isPersistent: true }} />)
      await triggerToast()

      expect(screen.getByTestId('ClearButton')).toBeInTheDocument()
    })

    it('non-persistent toast has no ClearButton', async () => {
      renderWithProvider(<ToastButton />)
      await triggerToast()

      expect(screen.queryByTestId('ClearButton')).not.toBeInTheDocument()
    })

    it('alertProps className forwarded', async () => {
      renderWithProvider(<ToastButton options={{ alertProps: { className: 'alertClass' } }} />)
      await triggerToast()

      expect(screen.getByTestId('Toast')).toHaveClass('alertClass')
    })

    it('multiple toasts render', async () => {
      renderWithProvider(<ToastButton />)
      await triggerToast()
      await triggerToast()

      expect(screen.getAllByTestId('Toast')).toHaveLength(2)
    })
  })

  describe('Interaction', () => {
    it('auto-dismisses after default duration', async () => {
      renderWithProvider(<ToastButton />)
      await triggerToast()

      const toast = screen.getByTestId('Toast')
      expect(toast).toBeInTheDocument()

      await act(async () => {
        jest.advanceTimersByTime(3010)
      })

      await waitFor(() => {
        expect(toast).not.toBeInTheDocument()
      })
    })

    it('auto-dismisses after custom duration', async () => {
      renderWithProvider(<ToastButton options={{ duration: 1000 }} />)
      await triggerToast()

      const toast = screen.getByTestId('Toast')
      expect(toast).toBeInTheDocument()

      await act(async () => {
        jest.advanceTimersByTime(1010)
      })

      await waitFor(() => {
        expect(toast).not.toBeInTheDocument()
      })
    })

    it('persistent toast not dismissed after duration', async () => {
      renderWithProvider(<ToastButton options={{ isPersistent: true }} />)
      await triggerToast()

      const toast = screen.getByTestId('Toast')

      await act(async () => {
        jest.advanceTimersByTime(6010)
      })

      expect(toast).toBeInTheDocument()
    })

    it('ClearButton click dismisses persistent toast', async () => {
      renderWithProvider(<ToastButton options={{ isPersistent: true }} />)
      await triggerToast()

      const toast = screen.getByTestId('Toast')
      const clearButton = screen.getByTestId('ClearButton')

      await act(async () => {
        fireEvent.click(clearButton)
      })

      await act(async () => {
        jest.advanceTimersByTime(200)
      })

      await waitFor(() => {
        expect(toast).not.toBeInTheDocument()
      })
    })

    it('max toasts limit logs warning', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation()
      renderWithProvider(<ToastButton />)

      for (let i = 0; i < 21; i++) {
        await triggerToast()
      }

      expect(warnSpy).toHaveBeenCalledWith('Toasts max count reached')
      warnSpy.mockRestore()
    })
  })

  describe('Ref', () => {
    it('exposes DOM element via ref', () => {
      const ref = createRef<HTMLDivElement>()
      renderWithProvider(<ToastButton />, ref)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      jest.useRealTimers()

      const { container } = renderWithProvider(<ToastButton />)

      await new Promise(resolve => setTimeout(resolve, 100))

      const results = await axe(container)
      expect(results).toHaveNoViolations()

      jest.useFakeTimers()
    })
  })
})
