import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef, forwardRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Avatar } from '.'

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

describe('Avatar', () => {
  describe('Semantics', () => {
    it('renders fallback profile icon', () => {
      render(<Avatar />)
      const icon = screen.getByRole('img')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-label', 'profile')
    })

    it('forwards className', () => {
      render(<Avatar className="className" />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar).toHaveClass('className')
    })

    it('multi-word username shows initials', () => {
      render(<Avatar username="First Second Third" />)
      const initials = screen.getByText('FT')

      expect(initials).toHaveAttribute('aria-hidden', 'true')
    })

    it('single-word username shows one initial', () => {
      render(<Avatar username="First" />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar).toHaveTextContent('F')
    })

    it('initials sr-only text', () => {
      render(<Avatar username="First Third" />)
      const srOnly = screen.getByText('initials FT')

      expect(srOnly).toHaveClass('sr-only')
    })

    it('image renders with src', () => {
      render(<Avatar username="User Name" src="/src" />)
      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src')
    })

    it('image alt includes username', () => {
      render(<Avatar username="User Name" src="/src" />)
      const img = screen.getByRole('img')

      expect(img).toHaveAttribute('alt', 'profile User Name')
    })

    it('image alt generic without username', () => {
      render(<Avatar src="/src" />)
      const img = screen.getByRole('img')

      expect(img).toHaveAttribute('alt', 'profile')
    })

    it('extra spaces in username filtered', () => {
      render(<Avatar username="First  Third" />)
      const initials = screen.getByText('FT')

      expect(initials).toBeInTheDocument()
    })

    it('lowercase username uppercased', () => {
      render(<Avatar username="john doe" />)
      const initials = screen.getByText('JD')

      expect(initials).toBeInTheDocument()
    })

    it('outer div has no role', () => {
      render(<Avatar />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar).not.toHaveAttribute('role')
    })

    it('image error falls back to initials', () => {
      render(<Avatar username="User Name" src="/broken" />)
      const img = screen.getByRole('img')

      fireEvent.error(img)
      const initials = screen.getByText('UN')

      expect(initials).toBeInTheDocument()
    })

    it('image error falls back to icon without username', () => {
      render(<Avatar src="/broken" />)
      const img = screen.getByRole('img')

      fireEvent.error(img)
      const icon = screen.getByRole('img')

      expect(icon).toHaveAttribute('aria-label', 'profile')
    })

    it('render priority src over username', () => {
      render(<Avatar username="User" src="/src" />)
      const img = screen.getByRole('img')
      const initials = screen.queryByText('U')

      expect(img).toBeInTheDocument()
      expect(initials).not.toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLDivElement>()
      render(<Avatar ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Hue', () => {
    it('applies inline hue styles when hue provided', () => {
      render(<Avatar hue={200} username="Test" />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar.style.getPropertyValue('--av-text')).toContain('200')
    })

    it('does not apply baseVariant classes when hue provided', () => {
      render(<Avatar hue={200} variant="contained" color="primary" username="Test" />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar.className).not.toContain('bg-primary')
    })

    it('applies contained hue styles', () => {
      render(<Avatar hue={100} variant="contained" username="Test" />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar.style.getPropertyValue('--av-bg')).toContain('100')
      expect(avatar.style.getPropertyValue('--av-border')).toContain('100')
      expect(avatar.style.getPropertyValue('--av-text')).toContain('100')
    })

    it('merges user style with hue style', () => {
      render(<Avatar hue={100} username="Test" style={{ margin: '4px' }} />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar.style.margin).toBe('4px')
      expect(avatar.style.getPropertyValue('--av-text')).toContain('100')
    })

    it('does not apply hue styles without hue prop', () => {
      render(<Avatar variant="outlined" color="primary" username="Test" />)
      const avatar = screen.getByTestId('Avatar')

      expect(avatar.style.getPropertyValue('--av-text')).toBe('')
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Avatar username="Accessibility Test" src="/src" />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
