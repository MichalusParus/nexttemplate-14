import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { options } from '../../../../../../.storybook/helpers'
import MultiSelect from '.'

describe('MultiSelect', () => {
  it('default', () => {
    render(
      <MultiSelect
        className="className"
        name="multiSelectTest"
        label="label"
        value={[]}
        options={options}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'multiSelectTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        label="label"
        value={[]}
        options={options}
        error="error"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        label="label"
        value={[]}
        options={options}
        description="description"
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        label="label"
        value={['value1']}
        options={options}
        onChange={() => {}}
      />,
    )
    expect(screen.getByTestId('SelectedOptionsWrap')).toHaveTextContent('label1')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <MultiSelect
        name="multiSelectTest"
        label="label"
        value={[]}
        options={options}
        onChange={spy}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalled()
  })

  it('disabled', () => {
    render(
      <MultiSelect
        name="multiSelectTest"
        label="label"
        value={[]}
        options={options}
        disabled
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
