import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import { JestMockProvider, options } from '../../../../../.storybook/helpers'
import Form from '../Form'
import SelectField from '.'

describe('SelectField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Form
          initialValues={{ selectTest: 'selectTest' }}
          validationSchema={object().shape({})}
          onSubmit={() => {}}
        >
          <SelectField className="className" name="selectTest" label="label" options={options} />
        </Form>
      </JestMockProvider>,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'selectTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Form
          initialValues={{ selectTest: 'selectTest' }}
          validationSchema={object().shape({
            selectTest: string().required('required'),
          })}
          onSubmit={spy}
        >
          <SelectField className="className" name="selectTest" label="label" options={options} />
          <button type="submit" data-testid="submit" />
        </Form>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })
})
