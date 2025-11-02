import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, ReactNode } from 'react'

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

const ToastButton = ({ status, message, title, options }: AddToastProps) => {
  const { addToast } = useToast()
  return (
    <button
      onClick={() =>
        addToast(status ?? 'error', message ?? 'Message', title ?? 'Title', options ?? {})
      }
      data-testid="button"
    >
      Show Toast
    </button>
  )
}

const renderWithProvider = (children: ReactNode) => {
  return render(<ToastProvider>{children}</ToastProvider>, {})
}

describe('ToastProvider', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('default', async () => {
    renderWithProvider(<ToastButton />)
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.click(buttonTestId)
    })

    const toastsWrapTestId = screen.getByTestId('ToastsWrap')
    const toastTestId = screen.getByTestId('Toast')
    const spanTestId = screen.getByTestId('Span')

    await waitFor(() => {
      expect(toastsWrapTestId).toBeInTheDocument()
      expect(toastTestId).toBeInTheDocument()
      expect(spanTestId).toBeInTheDocument()
      expect(spanTestId).toHaveTextContent('Title')
      expect(toastTestId).toHaveTextContent('Message')
      expect(toastTestId).toHaveAttribute('role', 'alert')
      expect(toastTestId).toHaveAttribute('aria-live', 'polite')
      expect(toastTestId).toHaveAttribute('aria-atomic', 'true')
    })

    await act(async () => {
      jest.advanceTimersByTime(3010)
    })

    await waitFor(() => {
      expect(toastsWrapTestId).not.toBeInTheDocument()
      expect(toastTestId).not.toBeInTheDocument()
    })
  })

  it('duration', async () => {
    renderWithProvider(<ToastButton options={{ duration: 1000 }} />)
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.click(buttonTestId)
    })

    const toastsWrapTestId = screen.getByTestId('ToastsWrap')
    const toastTestId = screen.getByTestId('Toast')

    await waitFor(() => {
      expect(toastsWrapTestId).toBeInTheDocument()
      expect(toastTestId).toBeInTheDocument()
    })

    await act(async () => {
      jest.advanceTimersByTime(1010)
    })

    await waitFor(() => {
      expect(toastsWrapTestId).not.toBeInTheDocument()
      expect(toastTestId).not.toBeInTheDocument()
    })
  })

  it('persistent', async () => {
    renderWithProvider(<ToastButton options={{ isPersistent: true }} />)
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.click(buttonTestId)
    })

    const toastsWrapTestId = screen.getByTestId('ToastsWrap')
    const toastTestId = screen.getByTestId('Toast')
    const cleatButtonTestId = screen.getByTestId('ClearButton')

    await waitFor(() => {
      expect(toastsWrapTestId).toBeInTheDocument()
      expect(toastTestId).toBeInTheDocument()
      expect(cleatButtonTestId).toBeInTheDocument()
    })

    await act(async () => {
      jest.advanceTimersByTime(6010)
    })

    await waitFor(() => {
      expect(toastsWrapTestId).toBeInTheDocument()
      expect(toastTestId).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(cleatButtonTestId)
    })

    await waitFor(() => {
      expect(toastsWrapTestId).not.toBeInTheDocument()
      expect(toastTestId).not.toBeInTheDocument()
    })
  })

  it('alertProps', async () => {
    renderWithProvider(<ToastButton options={{ alertProps: { className: 'alertClass' } }} />)
    const buttonTestId = screen.getByTestId('button')

    await act(async () => {
      fireEvent.click(buttonTestId)
    })

    const toastTestId = screen.getByTestId('Toast')

    await waitFor(() => {
      expect(toastTestId).toHaveClass('alertClass')
    })
  })

  it('axe', async () => {
    jest.setTimeout(10000)
    jest.useRealTimers()

    const { container } = renderWithProvider(<ToastButton />)

    await new Promise(resolve => setTimeout(resolve, 100))

    const results = await axe(container)
    expect(results).toHaveNoViolations()

    jest.useFakeTimers()
  }, 10000)
})
