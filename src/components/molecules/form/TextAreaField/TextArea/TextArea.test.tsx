import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { TextArea } from '.'

describe('TextArea', () => {
  it('default', () => {
    render(<TextArea className="className" name="textareaTest" label="label" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByRole('textbox')).toHaveClass('className')
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'textareaTest')
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'textareaTest')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
  })

  it('error', () => {
    render(<TextArea name="textareaTest" label="label" error="error" onChange={() => {}} />)
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(
      <TextArea
        name="textareaTest"
        label="label"
        labelProps={{ description: 'description' }}
        onChange={() => {}}
      />,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })

  it('disabled', () => {
    render(<TextArea name="name" label="label" value="" disabled onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('disabled', '')
  })
})
