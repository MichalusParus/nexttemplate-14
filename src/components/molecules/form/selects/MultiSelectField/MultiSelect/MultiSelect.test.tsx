import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions, JestMockProvider } from '../../../../../../../.storybook/helpers'
import { MultiSelect } from '.'

describe('MultiSelect', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <MultiSelect
          className="className"
          name="multiSelectTest"
          value={[]}
          options={getOptions('multiSelectTest', 20)}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Select')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'multiSelectTest')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <MultiSelect
          name="multiSelectTest"
          value={['value1multiSelectTest']}
          options={getOptions('multiSelectTest', 20)}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('SelectValue')).toHaveTextContent('label1')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={getOptions('multiSelectTest', 20)}
          onChange={spy}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getAllByRole('option')[0])
    expect(spy).toHaveBeenCalled()
  })

  it('disabled', () => {
    render(
      <JestMockProvider>
        <MultiSelect
          name="multiSelectTest"
          value={[]}
          options={getOptions('multiSelectTest', 20)}
          disabled
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true')
  })
})
