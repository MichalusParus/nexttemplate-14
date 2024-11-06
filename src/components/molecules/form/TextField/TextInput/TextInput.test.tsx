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
          type="text"
          name="inputTest"
          label="label"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByRole('textbox')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('number', () => {
    render(
      <JestMockProvider>
        <TextInput type="number" name="inputTest" label="label" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <TextInput type="text" name="inputTest" label="label" error="error" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <JestMockProvider>
        <TextInput
          type="text"
          name="inputTest"
          label="label"
          labelProps={{ description: 'description' }}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <TextInput name="name" label="label" value="value" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('value', 'value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <TextInput name="name" label="label" value="value" onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <TextInput name="name" label="label" value="" disabled onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled', '')
  })
})
