import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { SearchInput } from '.'

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
    expect(screen.getByTestId('InputWrap')).toBeInTheDocument()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
    expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'placeholder')
  })

  it('value', () => {
    render(<SearchInput name="name" value="value" onChange={() => {}} />)
    expect(screen.getByRole('searchbox')).toHaveValue('value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<SearchInput name="name" value="value" onChange={spy} />)
    fireEvent.change(screen.getByRole('searchbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('clear', () => {
    const spy = jest.fn()
    render(<SearchInput name="name" value="value" onChange={spy} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('error', () => {
    render(<SearchInput name="name" error="error" onChange={() => {}} />)
    expect(screen.getByTestId('InputWrap')).toHaveClass('error')
  })

  it('disabled', () => {
    render(<SearchInput name="name" value="" disabled onChange={() => {}} />)
    expect(screen.getByRole('searchbox')).toHaveAttribute('disabled', '')
  })
})
