import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { getOptions, JestFormProvider, JestMockProvider } from '../../../../../.storybook/helpers'
import { SelectField } from '.'

describe('SelectField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['selectTest']}>
          <SelectField
            className="className"
            name="selectTest"
            label="label"
            options={getOptions('selectTest', 20)}
          />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('Select')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'selectTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['selectTest']} onSubmit={spy}>
          <SelectField
            className="className"
            name="selectTest"
            label="label"
            options={getOptions('selectTest', 20)}
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
        <JestFormProvider fields={['selectTest']}>
          <SelectField
            className="className"
            name="selectTest"
            label="label"
            options={getOptions('selectTest', 20)}
            labelProps={{ description: 'description' }}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })
})
