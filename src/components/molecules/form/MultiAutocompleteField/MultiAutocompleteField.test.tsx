import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import { JestMockProvider, options } from '../../../../../.storybook/helpers'
import Form from '../Form'
import MultiAutocompleteField from '.'

describe('MultiAutocompleteField', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Form
          initialValues={{ MultiAutocompleteTest: ['MultiAutocompleteTest'] }}
          validationSchema={object().shape({})}
          onSubmit={() => {}}
        >
          <MultiAutocompleteField
            className="className"
            name="MultiAutocompleteTest"
            label="label"
            options={options}
            onInputChange={() => {}}
          />
        </Form>
      </JestMockProvider>,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'MultiAutocompleteTest')
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Form
          initialValues={{ MultiAutocompleteTest: ['MultiAutocompleteTest'] }}
          validationSchema={object().shape({
            MultiAutocompleteTest: string().required('required'),
          })}
          onSubmit={spy}
        >
          <MultiAutocompleteField
            className="className"
            name="MultiAutocompleteTest"
            label="label"
            options={options}
            onInputChange={() => {}}
          />
          <button type="submit" data-testid="submit" />
        </Form>
      </JestMockProvider>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })
})
