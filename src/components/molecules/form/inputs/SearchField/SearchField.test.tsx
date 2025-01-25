import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { JestFormProvider } from '../../../../../../.storybook/helpers'
import { SearchField } from '.'

describe('SearchField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['searchTest']}>
        <SearchField className="className" name="searchTest" label="label" />
      </JestFormProvider>,
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
    expect(screen.getByRole('searchbox')).toHaveAttribute('aria-labelledby', 'searchTest-label')
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['searchTest']} onSubmit={spy}>
        <SearchField className="className" name="searchTest" label="label" />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })

  it('description', () => {
    render(
      <JestFormProvider fields={['searchTest']}>
        <SearchField
          className="className"
          name="searchTest"
          label="label"
          labelProps={{ description: 'description' }}
        />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
