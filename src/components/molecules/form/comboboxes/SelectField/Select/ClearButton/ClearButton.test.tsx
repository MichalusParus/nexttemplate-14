import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { ClearButton } from '.'

expect.extend(toHaveNoViolations)

describe('ClearButton', () => {
  it('default', () => {
    render(<ClearButton className="className" />)
    const buttonRole = screen.getByRole('button')
    const iconTestId = screen.getByTestId('ClearIcon')

    expect(buttonRole).toBeInTheDocument()
    expect(buttonRole).toHaveClass('className')
    expect(buttonRole.tagName).toBe('SPAN')
    expect(buttonRole).toHaveAttribute('aria-label')
    expect(buttonRole).toHaveAttribute('tabIndex', '-1')
    expect(iconTestId).toBeInTheDocument()
    expect(iconTestId).toHaveAttribute('aria-hidden')
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(<ClearButton onClick={spy} />)
    const buttonRole = screen.getByRole('button')

    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalled()
  })

  it('onKeyDown', () => {
    const spy = jest.fn()
    render(<ClearButton onClick={spy} />)
    const buttonRole = screen.getByRole('button')

    fireEvent.keyDown(buttonRole, { code: 'Enter' })
    expect(spy).toHaveBeenCalled()
  })

  it('axe', async () => {
    const { container } = render(<ClearButton />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
