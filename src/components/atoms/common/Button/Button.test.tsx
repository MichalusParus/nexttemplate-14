import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Button } from '.'

expect.extend(toHaveNoViolations)

describe('Button', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Button className="className">button</Button>
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toBeInTheDocument()
    expect(buttonRole).toHaveClass('className')
    expect(buttonRole).toHaveTextContent('button')
    expect(buttonRole).toHaveAttribute('type', 'button')
    buttonRole.focus()
    expect(document.activeElement).toBe(buttonRole)
  })

  it('iconOnly', () => {
    render(
      <JestMockProvider>
        <Button startIcon={<svg role="img" />} aria-label="label" />
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(buttonRole).toHaveTextContent('')
    expect(buttonRole).toHaveAttribute('aria-label', 'label')
  })

  it('startIcon', () => {
    render(
      <JestMockProvider>
        <Button startIcon={<svg role="img" />}>button</Button>
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(buttonRole).toHaveTextContent('button')
  })

  it('endIcon', () => {
    render(
      <JestMockProvider>
        <Button endIcon={<svg role="img" />}>button</Button>
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(buttonRole).toHaveTextContent('button')
  })

  it('isLoading', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Button isLoading={true} onClick={spy}>
          button
        </Button>
      </JestMockProvider>,
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
    render(
      <JestMockProvider>
        <Button onClick={spy} />
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')

    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('submit', () => {
    render(
      <JestMockProvider>
        <Button type="submit" />
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toHaveAttribute('type', 'submit')
  })

  it('disabled', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Button onClick={spy} disabled />
      </JestMockProvider>,
    )
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
    render(
      <JestMockProvider>
        <Button startIcon={<svg role="img" />} />
      </JestMockProvider>,
    )

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Icon-only buttons should have an aria-label for accessibility.',
    )
    consoleWarnSpy.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <JestMockProvider>
        <Button>button</Button>
      </JestMockProvider>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
