import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
import { TextArea } from '.'

describe('TextArea', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <TextArea
          className="className"
          name="textAreaTest"
          placeholder="placeholder"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('TextAreaWrap')).toBeTruthy()
    expect(screen.getByTestId('TextAreaWrap')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'textAreaTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'textAreaTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'placeholder')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <TextArea name="name" value="value" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveValue('value')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <TextArea name="name" value="value" onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <TextArea name="name" error="error" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('TextAreaWrap')).toHaveClass('error')
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <TextArea name="name" value="" disabled onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled', '')
  })
})
