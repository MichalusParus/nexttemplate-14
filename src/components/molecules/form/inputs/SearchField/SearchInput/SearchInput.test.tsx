import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { SearchInput } from '.'

expect.extend(toHaveNoViolations)

describe('SearchInput', () => {
  it('default', () => {
    render(
      <SearchInput
        className="className"
        name="searchTest"
        placeholder="placeholder"
        onChange={() => {}}
      />,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')
    const inputRole = screen.getByRole('searchbox')

    expect(inputWrapTestId).toBeInTheDocument()
    expect(inputWrapTestId).toHaveClass('className')
    expect(inputRole).toHaveAttribute('type', 'search')
    expect(inputRole).toHaveAttribute('id', 'searchTest')
    expect(inputRole).toHaveAttribute('name', 'searchTest')
    expect(inputRole).toHaveAttribute('placeholder', 'placeholder')
    inputRole.focus()
    expect(document.activeElement).toBe(inputRole)
  })

  it('value', () => {
    render(<SearchInput name="name" value="value" onChange={() => {}} />)
    const inputRole = screen.getByRole('searchbox')

    expect(inputRole).toHaveValue('value')
  })

  it('icon', () => {
    render(<SearchInput name="name" value="value" onChange={() => {}} />)
    const svgTestId = screen.getByTestId('SearchIcon')

    expect(svgTestId).toBeInTheDocument()
    expect(svgTestId).toHaveAttribute('aria-hidden')
  })

  it('clear', () => {
    const spy = jest.fn()
    render(<SearchInput name="name" value="value" onChange={spy} />)
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toBeInTheDocument()
    expect(buttonRole).toHaveAttribute('aria-label')
    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('')
  })

  it('error', () => {
    render(<SearchInput name="name" error="error" onChange={() => {}} />)
    const inputWrapTestId = screen.getByTestId('InputWrap')

    expect(inputWrapTestId).toHaveClass('error')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<SearchInput name="name" value="value" onChange={spy} />)
    const inputRole = screen.getByRole('searchbox')

    fireEvent.change(inputRole, {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('disabled', () => {
    render(<SearchInput name="name" value="" disabled onChange={() => {}} />)
    const inputRole = screen.getByRole('searchbox')

    expect(inputRole).toHaveAttribute('disabled')
    expect(inputRole).toHaveAttribute('tabindex', '-1')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(
      <SearchInput ref={ref} name="searchTest" placeholder="placeholder" onChange={() => {}} />,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <SearchInput name="searchTest" placeholder="placeholder" onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
