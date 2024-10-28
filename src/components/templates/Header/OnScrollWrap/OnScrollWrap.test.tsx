import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { OnScrollWrap } from '.'

describe('OnScrollWrap', () => {
  it('default', () => {
    render(<OnScrollWrap className="className" />)
    expect(screen.getByTestId('OnScrollWrap')).toBeTruthy()
    expect(screen.getByTestId('OnScrollWrap')).toHaveClass('className')
  })
})
