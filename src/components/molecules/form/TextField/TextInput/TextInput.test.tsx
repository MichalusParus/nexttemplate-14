import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
import { TextInput } from '.'

describe('TextInput', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <TextInput
          className="className"
          name="inputTest"
          placeholder="placeholder"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('InputWrap')).toBeTruthy()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'placeholder')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <TextInput name="name" value="value" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('value', 'value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <TextInput name="name" value="value" onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('startIcon', () => {
    render(
      <JestMockProvider>
        <TextInput name="inputTest" startIcon={<svg data-testid="testSvg" />} onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('testSvg')).toBeTruthy()
  })

  it('endIcon', () => {
    render(
      <JestMockProvider>
        <TextInput name="inputTest" endIcon={<svg data-testid="testSvg" />} onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('testSvg')).toBeTruthy()
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <TextInput name="inputTest" error="error" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('InputWrap')).toHaveClass('error')
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <TextInput name="name" value="" disabled onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled', '')
  })
})
