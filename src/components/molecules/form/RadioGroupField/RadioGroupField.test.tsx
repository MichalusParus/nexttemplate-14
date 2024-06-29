import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import { options } from '../../../../../.storybook/helpers'
import Form from '../Form'
import RadioGroupField from '.'

describe('RadioGroupField', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{ radioGroupFieldTest: 'radioGroupFieldTest' }}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
      >
        <RadioGroupField
          className="className"
          name="radioGroupFieldTest"
          label="label"
          options={options}
        />
      </Form>,
    )
    expect(screen.getAllByRole('radio')[0]).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('id', 'value1')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('name', 'radioGroupFieldTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <Form
        initialValues={{ radioGroupFieldTest: 'radioGroupFieldTest' }}
        validationSchema={object().shape({
          RadioGroupFieldTest: string().required('required'),
        })}
        onSubmit={spy}
      >
        <RadioGroupField
          className="className"
          name="radioGroupFieldTest"
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
