import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { getOptions, JestFormProvider } from '../../../../../../.storybook/helpers'
import { CheckboxGroupField } from '.'

describe('CheckboxGroupField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['checkboxGroupFieldTest']}>
        <CheckboxGroupField
          className="className"
          name="checkboxGroupFieldTest"
          label="label"
          options={getOptions('checkboxGroupFieldTest', 20)}
        />
      </JestFormProvider>,
    )
    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument()
    expect(screen.getByTestId('CheckboxGroup')).toHaveClass('className')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute('id', 'value1checkboxGroupFieldTest')
    expect(screen.getAllByRole('checkbox')[0]).toHaveAttribute(
      'name',
      'value1checkboxGroupFieldTest',
    )
    expect(screen.getByTestId('FakeLabel')).toBeInTheDocument()
    expect(screen.getByTestId('FakeLabel')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['checkboxGroupFieldTest']} onSubmit={spy}>
        <CheckboxGroupField
          className="className"
          name="checkboxGroupFieldTest"
          label="label"
          options={getOptions('checkboxGroupFieldTest', 20)}
        />
        <button type="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })

  it('description', () => {
    render(
      <JestFormProvider fields={['checkboxGroupFieldTest']}>
        <CheckboxGroupField
          className="className"
          name="checkboxGroupFieldTest"
          label="label"
          options={getOptions('checkboxGroupFieldTest', 20)}
          labelProps={{ description: 'description' }}
        />
        <button type="submit" />
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
