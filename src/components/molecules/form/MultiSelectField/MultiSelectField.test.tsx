import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import { options } from '../../../../../.storybook/helpers'
import Form from '../Form'
import MultiSelectField from '.'

describe('MultiSelectField', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{ multiSelectTest: ['multiSelectTest'] }}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
      >
        <MultiSelectField
          className="className"
          name="multiSelectTest"
          label="label"
          options={options}
        />
      </Form>,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'multiSelectTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <Form
        initialValues={{ multiSelectTest: ['multiSelectTest'] }}
        validationSchema={object().shape({
          multiSelectTest: string().required('required'),
        })}
        onSubmit={spy}
      >
        <MultiSelectField
          className="className"
          name="multiSelectTest"
          label="label"
          options={options}
        />
        <button type="submit" data-testid="submit" />
      </Form>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })
})
