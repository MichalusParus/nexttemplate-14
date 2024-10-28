import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
import { Input } from '.'

describe('Input', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Input
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
        <Input type="number" name="inputTest" label="label" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <Input type="text" name="inputTest" label="label" error="error" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <JestMockProvider>
        <Input
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
        <Input name="name" label="label" value="value" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('value', 'value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Input name="name" label="label" value="value" onChange={spy} />
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
        <Input name="name" label="label" value="" disabled onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled', '')
  })
})
