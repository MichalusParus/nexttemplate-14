import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestFormProvider, JestMockProvider } from '../../../../../.storybook/helpers'
import { TextField } from '.'

describe('TextField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <JestFormProvider fields={['inputTest']}>
          <TextField className="className" type="text" name="inputTest" label="label" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    fireEvent.change(screen.getByRole('textbox'), {
      target: {
        value: 'inputTest',
      },
    })
    expect(screen.getByTestId('InputWrap')).toBeTruthy()
    expect(screen.getByTestId('InputWrap')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'inputTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    expect(screen.getByRole('textbox')).toHaveAttribute('value', 'inputTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <JestFormProvider fields={['inputTest']} onSubmit={spy}>
          <TextField className="className" type="text" name="inputTest" label="label" />
          <button type="submit" />
        </JestFormProvider>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
