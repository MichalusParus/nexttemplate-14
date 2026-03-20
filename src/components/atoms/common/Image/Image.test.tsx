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
  describe('Semantics', () => {
    it('renders as img', () => {
      render(<Image src="/#" alt="image" />)
      const image = screen.getByRole('img')

      expect(image).toBeInTheDocument()
    })

    it('forwards className to img', () => {
      render(<Image className="className" src="/#" alt="image" />)
      const image = screen.getByRole('img')

      expect(image).toHaveClass('className')
    })

    it('forwards alt attribute', () => {
      render(<Image src="/#" alt="image" />)
      const image = screen.getByRole('img')

      expect(image).toHaveAttribute('alt', 'image')
    })

    it('default ratio and width on wrapper', () => {
      render(<Image src="/#" alt="image" />)
      const wrapper = screen.getByTestId('ImageRatioWrap')

      expect(wrapper).toHaveClass('aspect-video')
      expect(wrapper).toHaveClass('w-full')
    })

    it('custom ratio on wrapper', () => {
      render(<Image src="/#" alt="image" ratio="aspect-square" />)
      const wrapper = screen.getByTestId('ImageRatioWrap')

      expect(wrapper).toHaveClass('aspect-square')
    })

    it('custom width on wrapper', () => {
      render(<Image src="/#" alt="image" width="w-96" />)
      const wrapper = screen.getByTestId('ImageRatioWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('default objectFit and objectPosition', () => {
      render(<Image src="/#" alt="image" />)
      const image = screen.getByRole('img')

      expect(image).toHaveClass('object-contain')
      expect(image).toHaveClass('object-center')
    })

    it('custom objectFit', () => {
      render(<Image src="/#" alt="image" objectFit="object-cover" />)
      const image = screen.getByRole('img')

      expect(image).toHaveClass('object-cover')
    })

    it('custom objectPosition', () => {
      render(<Image src="/#" alt="image" objectPosition="object-top" />)
      const image = screen.getByRole('img')

      expect(image).toHaveClass('object-top')
    })

    it('sizes default is 100vw', () => {
      render(<Image src="/#" alt="image" />)
      const image = screen.getByRole('img')

      expect(image).toHaveAttribute('sizes', '100vw')
    })

    it('custom sizes', () => {
      render(<Image src="/#" alt="image" sizes="(max-width: 768px) 100vw, 50vw" />)
      const image = screen.getByRole('img')

      expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw')
    })

  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLImageElement>()
      render(<Image ref={ref} src="/#" alt="image" />)

      expect(ref.current).toBeInstanceOf(HTMLImageElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Image src="/#" alt="image" />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
