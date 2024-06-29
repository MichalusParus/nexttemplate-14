import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import ComponentTemplate from '.'

describe('ComponentTemplate', () => {
  it('default', () => {
    render(<ComponentTemplate className="className" />)
    expect(screen.getByTestId('ComponentTemplate')).toBeTruthy()
    expect(screen.getByTestId('ComponentTemplate')).toHaveClass('className')
  })
})
