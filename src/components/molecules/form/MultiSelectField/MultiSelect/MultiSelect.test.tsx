import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider, options } from '../../../../../../.storybook/helpers'
import MultiSelect from '.'

describe('MultiSelect', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <MultiSelect
          className="className"
          name="multiSelectTest"
          label="label"
          value={[]}
          options={options}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('MultiSelect')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'multiSelectTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('error', () => {
    render(
      <JestMockProvider>
        <MultiSelect
          name="multiSelectTest"
          label="label"
          value={[]}
          options={options}
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
        <MultiSelect
          name="multiSelectTest"
          label="label"
          value={[]}
          options={options}
          labelProps={{ description: 'description' }}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('value', () => {
    render(
      <JestMockProvider>
        <MultiSelect
          name="multiSelectTest"
          label="label"
          value={['value1']}
          options={options}
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByTestId('SelectedOptionsWrap')).toHaveTextContent('label1')
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <MultiSelect
          name="multiSelectTest"
          label="label"
          value={[]}
          options={options}
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
          label="label"
          value={[]}
          options={options}
          disabled
          onChange={() => {}}
        />
      </JestMockProvider>,
    )
    expect(screen.getByRole('combobox')).toHaveAttribute('disabled', '')
  })
})
