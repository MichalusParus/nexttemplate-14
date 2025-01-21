import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions, JestFormProvider } from '../../../../../../.storybook/helpers'
import { RadioGroupField } from '.'

describe('RadioGroupField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['radioGroupFieldTest']}>
        <RadioGroupField
          className="className"
          name="radioGroupFieldTest"
          label="label"
          options={getOptions('radioGroupFieldTest', 20)}
        />
      </JestFormProvider>,
    )
    expect(screen.getAllByRole('radio')[0]).toBeInTheDocument()
    expect(screen.getByRole('radiogroup')).toHaveClass('className')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('id', 'value1radioGroupFieldTest')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('name', 'radioGroupFieldTest')
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['radioGroupFieldTest']} onSubmit={spy}>
        <RadioGroupField
          className="className"
          name="radioGroupFieldTest"
          label="label"
          options={getOptions('radioGroupFieldTest', 20)}
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
      <JestFormProvider fields={['radioGroupFieldTest']}>
        <RadioGroupField
          className="className"
          name="radioGroupFieldTest"
          label="label"
          options={getOptions('radioGroupFieldTest', 20)}
          labelProps={{ description: 'description' }}
        />
        <button type="submit" />
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
