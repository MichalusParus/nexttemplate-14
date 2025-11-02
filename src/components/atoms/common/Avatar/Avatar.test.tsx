import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef, forwardRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
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
  it('default', () => {
    render(<Avatar className="className" />)
    const avatarTestId = screen.getByTestId('Avatar')
    const profileIconRole = screen.getByRole('img')

    expect(avatarTestId).toBeInTheDocument()
    expect(avatarTestId).toHaveClass('className')
    expect(avatarTestId).toHaveTextContent('')
    expect(profileIconRole).toBeInTheDocument()
  })

  it('username', () => {
    render(<Avatar username="First Second Third" />)
    const avatarTestId = screen.getByTestId('Avatar')
    const initialsText = screen.getByText('FT')

    expect(avatarTestId).toHaveTextContent('FT')
    expect(initialsText).toHaveAttribute('aria-hidden', 'true')
  })

  it('single username', () => {
    render(<Avatar username="First" />)
    const avatarTestId = screen.getByTestId('Avatar')

    expect(avatarTestId).toHaveTextContent('F')
  })

  it('src', () => {
    render(<Avatar username="User Name" src="/src" />)
    const profileImgRole = screen.getByRole('img')

    expect(profileImgRole).toBeInTheDocument()
    expect(profileImgRole).toHaveAttribute('src')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Avatar ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Avatar username="Accessibility Test" src="/src" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
