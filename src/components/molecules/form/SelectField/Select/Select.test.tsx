import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { options } from '../../../../../../.storybook/helpers'
import Select from '.'

describe('Select', () => {
  it('default', () => {
    render(
      <Select
        className="className"
        name="selectTest"
        label="label"
        value=""
        options={options}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'selectTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <Select
        name="selectTest"
        label="label"
        value=""
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <Select
        name="selectTest"
        label="label"
        value=""
        options={options}
        description="description"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(
      <Select
        name="selectTest"
        label="label"
        value="value1"
        options={options}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveTextContent('label1')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<Select name="selectTest" label="label" value="" options={options} onChange={spy} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalledWith('value1')
  })

  it('disabled', () => {
    render(
      <Select
        name="selectTest"
        label="label"
        value=""
        options={options}
        disabled
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
