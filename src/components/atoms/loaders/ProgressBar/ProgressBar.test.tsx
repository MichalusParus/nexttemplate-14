import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { ProgressBar } from '.'

describe('ProgressBar', () => {
  it('default', () => {
    render(<ProgressBar className="className" />)
    expect(screen.getByTestId('ProgressBar')).toBeTruthy()
    expect(screen.getByTestId('ProgressBar')).toHaveClass('className')
  })
})
