import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { format } from 'date-fns'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
import { DatePicker } from '.'

describe('DatePicker', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <DatePicker
          className="className"
          name="datePickerTest"
          label="label"
          value={new Date()}
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
    render(
      <JestMockProvider>
        <DatePicker
          name="datePickerTest"
          label="label"
          value={new Date()}
          error="error"
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <JestMockProvider>
        <DatePicker
          name="datePickerTest"
          label="label"
          value={new Date()}
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
        <DatePicker name="datePickerTest" label="label" value={new Date()} onChange={() => {}} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent(format(date, 'dd.M.y'))
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <DatePicker name="datePickerTest" label="label" value={new Date()} onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(spy).toHaveBeenCalled()
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <DatePicker
          name="datePickerTest"
          label="label"
          value={new Date()}
          disabled
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
