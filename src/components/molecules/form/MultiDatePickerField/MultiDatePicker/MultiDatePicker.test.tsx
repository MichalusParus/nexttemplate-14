import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { format } from 'date-fns'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
import { MultiDatePicker } from '.'

describe('MultiDatePicker', () => {
  it('default', () => {
    const date = new Date()
    render(
      <JestMockProvider>
        <MultiDatePicker
          className="className"
          name="datePickerTest"
          label="label"
          value={[date]}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('Calendar')).toBeTruthy()
    expect(screen.getByTestId('DatePicker')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'datePickerTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('error', () => {
    const date = new Date()
    render(
      <JestMockProvider>
        <MultiDatePicker
          name="datePickerTest"
          label="label"
          value={[date]}
          error="error"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    const date = new Date()
    render(
      <JestMockProvider>
        <MultiDatePicker
          name="datePickerTest"
          label="label"
          value={[date]}
          labelProps={{ description: 'description' }}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    const date = new Date()
    render(
      <JestMockProvider>
        <MultiDatePicker name="datePickerTest" label="label" value={[date]} onChange={() => {}} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent(format(date, 'dd.M.y'))
  })

  it('onChange', () => {
    const spy = jest.fn()
    const date = new Date()
    render(
      <JestMockProvider>
        <MultiDatePicker name="datePickerTest" label="label" value={[date]} onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(spy).toHaveBeenCalled()
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <MultiDatePicker
          name="datePickerTest"
          label="label"
          value={[]}
          disabled
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
