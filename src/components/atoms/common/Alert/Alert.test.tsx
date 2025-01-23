import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { Alert } from '.'

expect.extend(toHaveNoViolations)

describe('Alert', () => {
  it('default', () => {
    render(<Alert className="className">Alert</Alert>)
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveClass('className')
    expect(alertTestId).toHaveTextContent('Alert')
  })

  it('error', () => {
    render(
      <Alert status="error" title="Alert title">
        Alert
      </Alert>,
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('title', () => {
    render(<Alert title="Alert title">Alert info</Alert>)
    const titleText = screen.getByText('Alert title')
    const infoText = screen.getByText('Alert info')

    expect(titleText).toBeInTheDocument()
    expect(infoText).toBeInTheDocument()
  })

  it('icon', () => {
    render(
      <Alert status="none" title="Alert title" icon={<svg role="img" />}>
        Alert
      </Alert>,
    )
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
  })

  it('axe', async () => {
    const { container } = render(<Alert className="className">Alert</Alert>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
