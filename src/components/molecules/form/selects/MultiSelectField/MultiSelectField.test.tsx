import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import {
  getOptions,
  JestFormProvider,
  JestMockProvider,
} from '../../../../../../.storybook/helpers'
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
            options={getOptions('multiSelectTest', 20)}
          />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByTestId('Select')).toHaveClass('className')
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
            options={getOptions('multiSelectTest', 20)}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })

  it('description', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['multiSelectTest']} values={[[]]}>
          <MultiSelectField
            className="className"
            name="multiSelectTest"
            label="label"
            options={getOptions('multiSelectTest', 20)}
            labelProps={{ description: 'description' }}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
