import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Avatar } from '.'

expect.extend(toHaveNoViolations)

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
