import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider } from '../../../../../../.storybook/helpers'
import { TextAreaField } from '.'

describe('TextAreaField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['textAreaTest']}>
          <TextAreaField className="className" name="textAreaTest" label="label" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'textAreaTest',
      },
    })
    expect(screen.getByTestId('TextAreaWrap')).toBeInTheDocument()
    expect(screen.getByTestId('TextAreaWrap')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'textAreaTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'textAreaTest')
    expect(screen.getByRole('textbox')).toHaveValue('textAreaTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-labelledby', 'label-textAreaTest')
    expect(screen.getByTestId('Label')).toBeInTheDocument()
    expect(screen.getByTestId('Label')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['textAreaTest']} onSubmit={spy}>
          <TextAreaField className="className" name="textAreaTest" label="label" />
          <button type="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })

  it('description', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['textAreaTest']}>
          <TextAreaField
            className="className"
            name="textAreaTest"
            label="label"
            labelProps={{ description: 'description' }}
          />
          <button type="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Alert')).toBeInTheDocument()
    expect(screen.getByTestId('Alert')).toHaveTextContent('description')
  })
})
