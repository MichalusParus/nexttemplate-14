import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Alert from '.'

describe('Alert', () => {
  it('default', () => {
    render(<Alert className="className">Alert</Alert>)
    expect(screen.getByRole('alert')).toBeVisible()
    expect(screen.getByRole('alert')).toHaveClass('className')
    expect(screen.getByRole('alert')).toHaveTextContent('Alert')
  })

  it('title', () => {
    render(<Alert title="Alert title">Alert info</Alert>)
    expect(screen.getAllByTestId('Span')[0]).toHaveTextContent('Alert title')
    expect(screen.getAllByTestId('Span')[1]).toHaveTextContent('Alert info')
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
