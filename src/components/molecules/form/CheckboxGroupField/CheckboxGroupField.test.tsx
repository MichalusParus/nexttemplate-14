import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, options } from '../../../../../.storybook/helpers'
import CheckboxGroupField from '.'

describe('CheckboxGroupField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['checkboxGroupFieldTest']}>
        <CheckboxGroupField
          className="className"
          name="checkboxGroupFieldTest"
          label="label"
          options={options}
        />
      </JestFormProvider>,
    )
    expect(screen.getAllByRole('checkbox')[0]).toBeTruthy()
    expect(screen.getByTestId('CheckboxGroup')).toHaveClass('className')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('id', 'value1')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('name', 'value1')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['checkboxGroupFieldTest']} onSubmit={spy}>
        <CheckboxGroupField
          className="className"
          name="checkboxGroupFieldTest"
          label="label"
          options={options}
        />
        <button type="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
