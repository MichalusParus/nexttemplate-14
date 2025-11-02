import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef, forwardRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Image } from '.'

expect.extend(toHaveNoViolations)

jest.mock('next/image', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const ImageMock = forwardRef(({ src, alt, className, fill, ...props }: any, ref) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} ref={ref} {...props} />
  ))
  ImageMock.displayName = 'Image'

  return {
    __esModule: true,
    default: ImageMock,
  }
})

describe('Image', () => {
  it('default', () => {
    render(<Image className="className" src="/#" alt="image" />)
    const imageRole = screen.getByRole('img')

    expect(imageRole).toBeInTheDocument()
    expect(imageRole).toHaveClass('className')
    expect(imageRole).toHaveAttribute('alt', 'image')
  })

  it('ratio/width', () => {
    render(<Image alt="ddc" src="/#" ratio="aspect-video" width="w-96" />)
    const ratioWrapTestId = screen.getByTestId('ImageRatioWrap')

    expect(ratioWrapTestId).toBeInTheDocument()
    expect(ratioWrapTestId).toHaveClass('aspect-video')
    expect(ratioWrapTestId).toHaveClass('w-96')
  })

  it('object', () => {
    render(<Image alt="ddc" src="/#" objectFit="object-cover" objectPosition="object-center" />)
    const imageRole = screen.getByRole('img')

    expect(imageRole).toHaveClass('object-cover')
    expect(imageRole).toHaveClass('object-center')
  })

  it('ref', () => {
    const ref = createRef<HTMLImageElement>()
    render(<Image ref={ref} src="/#" alt="image" />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Image src="/#" alt="image" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
