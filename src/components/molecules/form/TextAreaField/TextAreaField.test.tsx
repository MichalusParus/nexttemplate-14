import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import Form from '../Form'
import TextAreaField from '.'

describe('TextAreaField', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{ textareaTest: 'textareaTest' }}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
      >
        <TextAreaField className="className" name="textareaTest" label="label" />
      </Form>,
    )
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'textareaTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'textareaTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <Form
        initialValues={{ textareaTest: 'textareaTest' }}
        validationSchema={object().shape({
          textareaTest: string().required('required'),
        })}
        onSubmit={spy}
      >
        <TextAreaField className="className" name="textareaTest" label="label" />
        <button type="submit" />
      </Form>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
