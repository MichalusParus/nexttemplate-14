import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider } from '../../../../../.storybook/helpers'
import { PasswordField } from '.'

describe('PasswordField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['searchTest']}>
          <PasswordField className="className" name="searchTest" label="label" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByTestId('PasswordInput'), {
      target: {
        value: 'searchTest',
      },
    })
    expect(screen.getByTestId('InputWrap')).toBeTruthy()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('id', 'searchTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('name', 'searchTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('value', 'searchTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['searchTest']} onSubmit={spy}>
          <PasswordField className="className" name="searchTest" label="label" />
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
          <PasswordField
            className="className"
            name="searchTest"
            label="label"
            labelProps={{ description: 'description' }}
          />
          <button type="submit" data-testid="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })
})
