import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Avatar } from '.'

expect.extend(toHaveNoViolations)

describe('Avatar', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Avatar className="className" />
      </JestMockProvider>,
    )
    const avatarTestId = screen.getByTestId('Avatar')
    const profileIconRole = screen.getByRole('img')

    expect(avatarTestId).toBeInTheDocument()
    expect(avatarTestId).toHaveClass('className')
    expect(avatarTestId).toHaveTextContent('')
    expect(profileIconRole).toBeInTheDocument()
  })

  it('username', () => {
    render(
      <JestMockProvider>
        <Avatar username="First Second Third" />
      </JestMockProvider>,
    )
    const avatarTestId = screen.getByTestId('Avatar')
    const initialsText = screen.getByText('FT')

    expect(avatarTestId).toHaveTextContent('FT')
    expect(initialsText).toHaveAttribute('aria-hidden', 'true')
  })

  it('single username', () => {
    render(
      <JestMockProvider>
        <Avatar username="First" />
      </JestMockProvider>,
    )
    const avatarTestId = screen.getByTestId('Avatar')

    expect(avatarTestId).toHaveTextContent('F')
  })

  it('src', () => {
    render(
      <JestMockProvider>
        <Avatar username="User Name" src="/src" />
      </JestMockProvider>,
    )
    const profileImgRole = screen.getByRole('img')

    expect(profileImgRole).toBeInTheDocument()
    expect(profileImgRole).toHaveAttribute('src')
  })

  it('axe', async () => {
    const { container } = render(
      <JestMockProvider>
        <Avatar username="Accessibility Test" src="/src" />
      </JestMockProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
