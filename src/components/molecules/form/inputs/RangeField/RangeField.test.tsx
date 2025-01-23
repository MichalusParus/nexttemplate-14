import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider } from '../../../../../../.storybook/helpers'
import { RangeField } from '.'

describe('RangeField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['rangeTest']}>
        <RangeField className="className" name="rangeTest" label="label" />
      </JestFormProvider>,
    )
    fireEvent.change(screen.getByRole('slider'), {
      target: {
        value: '50',
      },
    })
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toHaveClass('className')
    expect(screen.getByRole('slider')).toHaveAttribute('id', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('name', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('type', 'range')
    expect(screen.getByRole('slider')).toHaveAttribute('aria-labelledby', 'rangeTest-label')
    expect(screen.getByRole('slider')).toHaveAttribute('value', '50')
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['rangeTest']} onSubmit={spy}>
        <RangeField className="className" name="rangeTest" label="label" />
        <button type="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })

  it('description', () => {
    render(
      <JestFormProvider fields={['rangeTest']}>
        <RangeField
          className="className"
          name="rangeTest"
          label="label"
          labelProps={{ description: 'description' }}
        />
        <button type="submit" />
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
