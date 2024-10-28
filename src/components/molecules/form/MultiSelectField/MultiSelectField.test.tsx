import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider, options } from '../../../../../.storybook/helpers'
import { MultiSelectField } from '.'

describe('MultiSelectField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['multiSelectTest']} values={[[]]}>
          <MultiSelectField
            className="className"
            name="multiSelectTest"
            label="label"
            options={options}
          />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('MultiSelect')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'multiSelectTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['multiSelectTest']} values={[[]]} onSubmit={spy}>
          <MultiSelectField
            className="className"
            name="multiSelectTest"
            label="label"
            options={options}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })
})
