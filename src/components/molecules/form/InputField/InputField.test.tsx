import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import Form from '../Form'
import InputField from '.'

describe('InputField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Form
          initialValues={{ inputTest: 'inputTest' }}
          validationSchema={object().shape({})}
          onSubmit={() => {}}
        >
          <InputField className="className" type="text" name="inputTest" label="label" />
        </Form>
      </JestMockProvider>,
    )
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
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
        <Form
          initialValues={{ inputTest: 'inputTest' }}
          validationSchema={object().shape({
            inputTest: string().required('required'),
          })}
          onSubmit={spy}
        >
          <InputField className="className" type="text" name="inputTest" label="label" />
          <button type="submit" />
        </Form>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
