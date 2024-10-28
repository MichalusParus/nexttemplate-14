import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider } from '../../../../../.storybook/helpers'
import RangeField from '.'

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
    expect(screen.getByRole('slider')).toBeTruthy()
    expect(screen.getByRole('slider')).toHaveClass('className')
    expect(screen.getByRole('slider')).toHaveAttribute('id', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('name', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('type', 'range')
    expect(screen.getByRole('slider')).toHaveAttribute('value', '50')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
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
})
