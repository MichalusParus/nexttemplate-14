import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../.storybook/helpers'
import { Select } from '.'

describe('Select', () => {
  it('default', () => {
    render(
      <Select
        className="className"
        name="selectTest"
        value=""
        options={getOptions('selectTest', 20)}
        onChange={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Select')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'selectTest')
  })

  it('value', () => {
    render(
      <Select
        name="selectTest"
        value="value1selectTest"
        options={getOptions('selectTest', 20)}
        onChange={() => {}}
      />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent('label1')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <Select name="selectTest" value="" options={getOptions('selectTest', 20)} onChange={spy} />,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <Select
        name="selectTest"
        value=""
        options={getOptions('selectTest', 20)}
        disabled
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
  })
})
