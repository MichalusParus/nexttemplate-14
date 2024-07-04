import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import Form from '../Form'
import CheckboxField from '.'

describe('CheckboxField', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{ checkboxTest: 'checkboxTest' }}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
      >
        <CheckboxField className="className" name="checkboxTest" label="label" />
      </Form>,
    )
    expect(screen.getByRole('checkbox')).toBeTruthy()
    expect(screen.getByTestId('Checkbox')).toHaveClass('className')
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'checkboxTest')
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'checkboxTest')
    expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox')
    expect(screen.getByRole('checkbox')).toHaveAttribute('value', 'checkboxTest')
    expect(screen.getByTestId('Checkbox')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <Form
        initialValues={{ checkboxTest: 'checkboxTest' }}
        validationSchema={object().shape({
          checkboxTest: string().required('required'),
        })}
        onSubmit={spy}
      >
        <CheckboxField className="className" name="checkboxTest" label="label" />
        <button type="submit" />
      </Form>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
