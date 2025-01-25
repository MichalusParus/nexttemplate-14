import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Button } from '.'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  it('default', () => {
    render(<Button className="className">button</Button>)
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toBeInTheDocument()
    expect(buttonRole).toHaveClass('className')
    expect(buttonRole).toHaveTextContent('button')
    expect(buttonRole).toHaveAttribute('type', 'button')
    buttonRole.focus()
    expect(document.activeElement).toBe(buttonRole)
  })

  it('iconOnly', () => {
    render(<Button startIcon={<svg role="img" />} aria-label="label" />)
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(buttonRole).toHaveTextContent('')
    expect(buttonRole).toHaveAttribute('aria-label', 'label')
  })

  it('startIcon', () => {
    render(<Button startIcon={<svg role="img" />}>button</Button>)
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(buttonRole).toHaveTextContent('button')
  })

  it('endIcon', () => {
    render(<Button endIcon={<svg role="img" />}>button</Button>)
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(buttonRole).toHaveTextContent('button')
  })

  it('isLoading', () => {
    const spy = jest.fn()
    render(
      <Button isLoading={true} onClick={spy}>
        button
      </Button>,
    )
    const buttonRole = screen.getByRole('button')
    const statusRole = screen.getByRole('status')
    const buttonText = screen.getByText('button')

    expect(statusRole).toBeInTheDocument()
    expect(buttonRole).toHaveAttribute('aria-busy', 'true')
    expect(buttonRole).toHaveAttribute('aria-disabled', 'true')
    expect(buttonText).toHaveAttribute('aria-hidden', 'true')
    expect(buttonText).toHaveClass('invisible')
    fireEvent.click(screen.getByRole('button'))
    expect(spy).not.toHaveBeenCalled()
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(<Button onClick={spy} />)
    const buttonRole = screen.getByRole('button')

    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('submit', () => {
    render(<Button type="submit" />)
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toHaveAttribute('type', 'submit')
  })

  it('disabled', () => {
    const spy = jest.fn()
    render(<Button onClick={spy} disabled />)
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toBeDisabled()
    expect(buttonRole).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(buttonRole)
    expect(spy).not.toHaveBeenCalled()
    buttonRole.focus()
    expect(document.activeElement).not.toBe(buttonRole)
  })

  it('no aria-label warning', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(<Button startIcon={<svg role="img" />} />)

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Icon-only buttons should have an aria-label for accessibility.',
    )
    consoleWarnSpy.mockRestore()
  })

  it('ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>button</Button>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Button>button</Button>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
