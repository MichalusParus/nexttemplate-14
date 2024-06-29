import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Label from '.'

describe('Label', () => {
  it('default', () => {
    render(<Label name="labelTest" label="label" className="className" />)
    expect(screen.getByTestId('LabelWrap')).toBeTruthy()
    expect(screen.getByTestId('LabelWrap')).toHaveClass('className')
    expect(screen.getByTestId('LabelWrap')).toHaveTextContent('label')
    expect(screen.getByTestId('Label')).toHaveAttribute('for', 'labelTest')
  })

  it('error', () => {
    render(<Label name="labelTest" label="label" className="className" error="error" />)
    expect(screen.getByRole('alert')).toHaveTextContent('error')
  })

  it('description', () => {
    render(<Label name="labelTest" label="label" className="className" description="description" />)
    expect(screen.getByRole('alert')).toHaveTextContent('description')
  })
})
