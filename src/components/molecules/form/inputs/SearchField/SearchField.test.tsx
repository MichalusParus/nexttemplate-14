import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider } from '../../../../../../.storybook/helpers'
import { SearchField } from '.'

describe('SearchField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['searchTest']}>
          <SearchField className="className" name="searchTest" label="label" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('searchbox'), {
      target: {
        value: 'searchTest',
      },
    })
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('name', 'searchTest')
    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
    expect(screen.getByRole('searchbox')).toHaveAttribute('value', 'searchTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['searchTest']} onSubmit={spy}>
          <SearchField className="className" name="searchTest" label="label" />
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
        <JestFormProvider fields={['searchTest']}>
          <SearchField
            className="className"
            name="searchTest"
            label="label"
            labelProps={{ description: 'description' }}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
