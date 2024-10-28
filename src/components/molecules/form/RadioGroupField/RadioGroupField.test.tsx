import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, options } from '../../../../../.storybook/helpers'
import RadioGroupField from '.'

describe('RadioGroupField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['radioGroupFieldTest']}>
        <RadioGroupField
          className="className"
          name="radioGroupFieldTest"
          label="label"
          options={options}
        />
      </JestFormProvider>,
    )
    expect(screen.getAllByRole('radio')[0]).toBeTruthy()
    expect(screen.getByRole('radiogroup')).toHaveClass('className')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('id', 'value1')
    expect(screen.getAllByRole('radio')[0]).toHaveAttribute('name', 'radioGroupFieldTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['radioGroupFieldTest']} onSubmit={spy}>
        <RadioGroupField
          className="className"
          name="radioGroupFieldTest"
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
