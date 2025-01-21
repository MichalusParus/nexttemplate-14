import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../../.storybook/helpers'
import { SearchInput } from '.'

describe('SearchInput', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <SearchInput
          className="className"
          name="searchTest"
          placeholder="placeholder"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('InputWrap')).toBeInTheDocument()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
    expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'placeholder')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <SearchInput name="name" value="value" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('searchbox')).toHaveAttribute('value', 'value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <SearchInput name="name" value="value" onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('searchbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('clear', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <SearchInput name="name" value="value" onChange={spy} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <SearchInput name="name" error="error" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('InputWrap')).toHaveClass('error')
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <SearchInput name="name" value="" disabled onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('searchbox')).toHaveAttribute('disabled', '')
  })
})
