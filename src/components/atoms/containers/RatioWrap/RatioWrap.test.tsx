import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import RatioWrap from '.'

describe('RatioWrap', () => {
  it('default', () => {
    render(<RatioWrap ratio={100} className="className" />)
    expect(screen.getByTestId('RatioWrap')).toBeTruthy()
    expect(screen.getByTestId('RatioWrap')).toHaveClass('className')
  })
})
