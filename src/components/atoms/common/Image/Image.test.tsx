import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Image from '.'

describe('Image', () => {
  it('default', () => {
    render(<Image alt="ddc" src="/#" ratio={50} className="className" />)
    expect(screen.getByRole('img')).toBeTruthy()
    expect(screen.getByRole('img')).toHaveClass('className')
  })
})
