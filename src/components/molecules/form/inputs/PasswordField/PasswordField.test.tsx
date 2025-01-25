import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { JestFormProvider } from '../../../../../../.storybook/helpers'
import { PasswordField } from '.'

describe('PasswordField', () => {
  it('default', () => {
    render(
      <JestFormProvider fields={['passwordTest']}>
        <PasswordField className="className" name="passwordTest" label="label" />
      </JestFormProvider>,
    )
    fireEvent.change(screen.getByTestId('PasswordInput'), {
      target: {
        value: 'passwordTest',
      },
    })
    expect(screen.getByTestId('InputWrap')).toBeInTheDocument()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('id', 'passwordTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('name', 'passwordTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute('value', 'passwordTest')
    expect(screen.getByTestId('PasswordInput')).toHaveAttribute(
      'aria-labelledby',
      'passwordTest-label',
    )
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestFormProvider fields={['passwordTest']} onSubmit={spy}>
        <PasswordField className="className" name="passwordTest" label="label" />
        <button type="submit" data-testid="submit" />
      </JestFormProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })

  it('description', () => {
    render(
      <JestFormProvider fields={['passwordTest']}>
        <PasswordField
          className="className"
          name="passwordTest"
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
