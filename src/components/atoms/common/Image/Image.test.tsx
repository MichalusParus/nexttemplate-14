import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Image } from '.'

describe('Image', () => {
  it('default', () => {
    render(<Image alt="ddc" src="/#" ratio="aspect-w-16 aspect-h-9" className="className" />)
    expect(screen.getByRole('img')).toBeTruthy()
    expect(screen.getByRole('img')).toHaveClass('className')
  })
})
