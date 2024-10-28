import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider } from '../../../../../.storybook/helpers'
import TextAreaField from '.'

describe('TextAreaField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['textareaTest']}>
        <TextAreaField className="className" name="textareaTest" label="label" />
      </JestFormProvider>,
    )
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByRole('textbox')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'textareaTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'textareaTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['textareaTest']} onSubmit={spy}>
        <TextAreaField className="className" name="textareaTest" label="label" />
        <button type="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
