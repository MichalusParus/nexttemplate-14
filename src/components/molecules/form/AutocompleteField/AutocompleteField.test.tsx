import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { object, string } from 'yup'

import { options } from '../../../../../.storybook/helpers'
import Form from '../Form'
import AutocompleteField from '.'

describe('AutocompleteField', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{ autocompleteTest: 'autocompleteTest' }}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
      >
        <AutocompleteField
          className="className"
          name="autocompleteTest"
          label="label"
          options={options}
          inputValue=""
          onInputChange={() => {}}
        />
      </Form>,
    )
    expect(screen.getByRole('listbox')).toBeTruthy()
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveClass('className')
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-controls', 'autocompleteTest')
    expect(screen.getAllByTestId('LabelWrap')[0]).toHaveTextContent('label')
  })

  it('onSubmit', () => {
    const spy = jest.fn()
    render(
      <Form
        initialValues={{ autocompleteTest: 'autocompleteTest' }}
        validationSchema={object().shape({
          autocompleteTest: string().required('required'),
        })}
        onSubmit={spy}
      >
        <AutocompleteField
          className="className"
          name="autocompleteTest"
          label="label"
          options={options}
          inputValue=""
          onInputChange={() => {}}
        />
        <button type="submit" data-testid="submit" />
      </Form>,
    )
    screen.getByTestId('Form').onsubmit = spy
    fireEvent.click(screen.getByTestId('submit'))
    expect(spy).toHaveBeenCalled()
  })
})
