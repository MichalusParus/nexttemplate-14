import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions, JestMockProvider } from '../../../../../../../.storybook/helpers'
import { Select } from '.'

describe('Select', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Select
          className="className"
          name="selectTest"
          value=""
          options={getOptions('selectTest', 20)}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Select')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'selectTest')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <Select
          name="selectTest"
          value="value1selectTest"
          options={getOptions('selectTest', 20)}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).toHaveTextContent('label1')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Select name="selectTest" value="" options={getOptions('selectTest', 20)} onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <Select
          name="selectTest"
          value=""
          options={getOptions('selectTest', 20)}
          disabled
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
  })
})
