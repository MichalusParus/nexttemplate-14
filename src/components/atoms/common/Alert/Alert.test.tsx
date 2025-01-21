import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Alert } from '.'

describe('Alert', () => {
  it('default', () => {
    render(<Alert className="className">Alert</Alert>)
    expect(screen.getByTestId('Alert')).toBeVisible()
    expect(screen.getByTestId('Alert')).toHaveClass('className')
    expect(screen.getByTestId('Alert')).toHaveTextContent('Alert')
  })

  it('title', () => {
    render(<Alert title="Alert title">Alert info</Alert>)
    expect(screen.getAllByTestId('Span')[0]).toHaveTextContent('Alert title')
    expect(screen.getAllByTestId('Span')[1]).toHaveTextContent('Alert info')
  })

  it('error', () => {
    render(
      <Alert status="error" title="Alert title">
        Alert
      </Alert>,
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('icon', () => {
    render(
      <Alert status="none" title="Alert title" icon={<svg role="img" />}>
        Alert
      </Alert>,
    )
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
