import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { SearchInput } from '.'

expect.extend(toHaveNoViolations)

describe('SearchInput', () => {
  describe('Semantics', () => {
    it('renders input with type search and searchbox role', () => {
      render(<SearchInput name="search" placeholder="Search" onChange={() => {}} />)
      const input = screen.getByRole('searchbox')

      expect(input).toHaveAttribute('type', 'search')
      expect(input).toHaveAttribute('id', 'search')
      expect(input).toHaveAttribute('name', 'search')
    })

    it('renders decorative search icon with aria-hidden', () => {
      render(<SearchInput name="search" onChange={() => {}} />)
      const icon = screen.getByTestId('SearchIcon')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden')
    })

    it('renders clear button with aria-label', () => {
      render(<SearchInput name="search" value="query" onChange={() => {}} />)
      const clear = screen.getByRole('button')

      expect(clear).toBeInTheDocument()
      expect(clear).toHaveAttribute('aria-label')
    })

    it('className lands on TextInput wrapper', () => {
      render(<SearchInput className="w-96" name="search" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('error adds error class to wrapper', () => {
      render(<SearchInput name="search" error="required" onChange={() => {}} />)
      const wrapper = screen.getByTestId('InputWrap')

      expect(wrapper).toHaveClass('error')
    })

    it('disabled disables both input and clear button', () => {
      render(<SearchInput name="search" value="query" disabled onChange={() => {}} />)
      const input = screen.getByRole('searchbox')
      const clear = screen.getByRole('button')

      expect(input).toBeDisabled()
      expect(clear).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Keyboard', () => {
    it('Tab focuses the input', () => {
      render(<SearchInput name="search" onChange={() => {}} />)
      const input = screen.getByRole('searchbox')

      input.focus()
      expect(document.activeElement).toBe(input)
    })
  })

  describe('Interaction', () => {
    it('onChange fires with string value', () => {
      const onChange = jest.fn()
      render(<SearchInput name="search" value="" onChange={onChange} />)
      const input = screen.getByRole('searchbox')

      fireEvent.change(input, { target: { value: 'query' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('query')
    })

    it('clear button calls onChange with empty string', () => {
      const onChange = jest.fn()
      render(<SearchInput name="search" value="query" onChange={onChange} />)
      const clear = screen.getByRole('button')

      fireEvent.click(clear)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith('')
    })

    it('clear button calls onClear when provided', () => {
      const onChange = jest.fn()
      const onClear = jest.fn()
      render(<SearchInput name="search" value="query" onChange={onChange} onClear={onClear} />)
      const clear = screen.getByRole('button')

      fireEvent.click(clear)
      expect(onClear).toHaveBeenCalledTimes(1)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Ref', () => {
    it('forwards ref to input element', () => {
      const ref = createRef<HTMLInputElement>()
      render(<SearchInput ref={ref} name="search" onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <SearchInput name="search" placeholder="Search" onChange={() => {}} />,
      )
      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
