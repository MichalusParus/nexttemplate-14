import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { object } from 'yup'

import Form from '.'

describe('Form', () => {
  it('default', () => {
    render(
      <Form
        initialValues={{}}
        validationSchema={object().shape({})}
        onSubmit={() => {}}
        className="className"
      >
        Children
      </Form>,
    )
    expect(screen.getByTestId('Form')).toBeTruthy()
    expect(screen.getByTestId('Form')).toHaveClass('className')
  })
})
