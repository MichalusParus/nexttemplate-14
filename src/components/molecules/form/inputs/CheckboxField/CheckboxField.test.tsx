import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider } from '../../../../../../.storybook/helpers'
import { CheckboxField } from '.'

describe('CheckboxField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['checkboxTest']}>
        <CheckboxField className="className" name="checkboxTest" label="label" />
      </JestFormProvider>,
    )
    fireEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
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
      <JestFormProvider fields={['checkboxTest']} onSubmit={spy}>
        <CheckboxField className="className" name="checkboxTest" label="label" />
        <button type="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
