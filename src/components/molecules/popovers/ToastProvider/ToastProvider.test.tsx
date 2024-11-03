import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { ToastProvider, useToast } from '.'

const ButtonWithHooks = () => {
  const { addToast } = useToast()
  return (
    <button onClick={() => addToast('error', 'message')} data-testid="button">
      Click
    </button>
  )
}

describe('ToastProvider', () => {
  it('default', () => {
    render(
      <ToastProvider>
        <ButtonWithHooks />
      </ToastProvider>,
    )
    fireEvent.click(screen.getByTestId('button'))
    expect(screen.getByTestId('ToastsWrap')).toBeTruthy()
    expect(screen.getByTestId('Toast')).toBeTruthy()
    expect(screen.getByTestId('Toast')).toHaveTextContent('message')
  })
})
