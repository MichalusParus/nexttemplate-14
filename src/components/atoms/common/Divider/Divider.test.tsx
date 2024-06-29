import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Divider from '.'

describe('Divider', () => {
  it('default', () => {
    render(<Divider className="className" />)
    expect(screen.getByRole('separator')).toBeTruthy()
    expect(screen.getByRole('separator')).toHaveClass('className')
  })

  it('label', () => {
    render(<Divider className="className" label="label" />)
    expect(screen.getByTestId('Span')).toHaveTextContent('label')
    expect(screen.getAllByTestId('Divider')[1]).toBeVisible()
  })
})
