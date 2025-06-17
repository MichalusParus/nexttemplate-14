import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
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
    const alertRole = screen.getByRole('alert')

    expect(alertRole).toBeInTheDocument()
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

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Alert ref={ref}>Alert</Alert>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Alert className="className">Alert</Alert>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
