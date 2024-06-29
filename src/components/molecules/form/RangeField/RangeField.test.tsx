import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import Form from '../Form'
import RangeField from '.'

describe('RangeField', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{ rangeTest: 'rangeTest' }}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
      >
        <RangeField className="className" name="rangeTest" label="label" />
      </Form>,
    )
    expect(screen.getByRole('slider')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('slider')).toHaveAttribute('id', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('name', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('type', 'range')
    expect(screen.getByRole('slider')).toHaveAttribute('value', 'rangeTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <Form
        initialValues={{ rangeTest: 'rangeTest' }}
        validationSchema={object().shape({
          rangeTest: string().required('required'),
        })}
        onSubmit={spy}
      >
        <RangeField className="className" name="rangeTest" label="label" />
        <button type="submit" />
      </Form>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
