import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import { options } from '../../../../../.storybook/helpers'
import Form from '../Form'
import CheckboxGroupField from '.'

describe('CheckboxGroupField', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{ checkboxGroupFieldTest: 'checkboxGroupFieldTest' }}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
      >
        <CheckboxGroupField
          className="className"
          name="checkboxGroupFieldTest"
          label="label"
          options={options}
        />
      </Form>,
    )
    expect(screen.getAllByRole('checkbox')[0]).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('id', 'value1')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('name', 'value1')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <Form
        initialValues={{ checkboxGroupFieldTest: 'checkboxGroupFieldTest' }}
        validationSchema={object().shape({
          checkboxGroupFieldTest: string().required('required'),
        })}
        onSubmit={spy}
      >
        <CheckboxGroupField
          className="className"
          name="checkboxGroupFieldTest"
          label="label"
          options={options}
        />
        <button type="submit" />
      </Form>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
