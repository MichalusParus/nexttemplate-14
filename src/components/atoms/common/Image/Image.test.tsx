import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { Image } from '.'

expect.extend(toHaveNoViolations)

describe('Image', () => {
  it('default', () => {
    render(<Image className="className" src="/#" alt="image" />)
    const imageRole = screen.getByRole('img')

    expect(imageRole).toBeInTheDocument()
    expect(imageRole).toHaveClass('className')
    expect(imageRole).toHaveAttribute('alt', 'image')
  })

  it('ratio/width', () => {
    render(<Image alt="ddc" src="/#" ratio="aspect-w-16 aspect-h-9" width="w-96" />)
    const ratioWrapTestId = screen.getByTestId('ImageRatioWrap')

    expect(ratioWrapTestId).toBeInTheDocument()
    expect(ratioWrapTestId).toHaveClass('aspect-w-16')
    expect(ratioWrapTestId).toHaveClass('aspect-h-9')
    expect(ratioWrapTestId).toHaveClass('w-96')
  })

  it('object', () => {
    render(<Image alt="ddc" src="/#" objectFit="object-cover" objectPosition="object-center" />)
    const imageRole = screen.getByRole('img')

    expect(imageRole).toHaveClass('object-cover')
    expect(imageRole).toHaveClass('object-center')
  })

  it('axe', async () => {
    const { container } = render(<Image src="/#" alt="image" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
