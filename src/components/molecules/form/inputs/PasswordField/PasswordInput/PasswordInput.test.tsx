import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../../.storybook/helpers'
import { PasswordInput } from '.'

describe('PasswordInput', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <PasswordInput
          className="className"
          name="searchTest"
          placeholder="placeholder"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('InputWrap')).toBeInTheDocument()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('id', 'searchTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('name', 'searchTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('placeholder', 'placeholder')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <PasswordInput name="name" value="value" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('value', 'value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <PasswordInput name="name" value="value" onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByTestId('PasswordInput'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('visible', () => {
    render(
      <JestMockProvider>
        <PasswordInput name="name" value="value" onChange={() => {}} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('type', 'text')
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <PasswordInput name="name" error="error" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('InputWrap')).toHaveClass('error')
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <PasswordInput name="name" value="" disabled onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('disabled', '')
  })
})
