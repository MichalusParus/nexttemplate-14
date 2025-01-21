import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Avatar } from '.'

describe('Avatar', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Avatar className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveClass('className')
    expect(screen.getByRole('img')).not.toHaveTextContent('UN')
  })

  it('username', () => {
    render(
      <JestMockProvider>
        <Avatar username="User Name" />
      </JestMockProvider>,
    )
    expect(screen.getByRole('img')).toHaveTextContent('UN')
  })

  it('src', () => {
    render(
      <JestMockProvider>
        <Avatar username="User Name" src="/src" />
      </JestMockProvider>,
    )
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src')
  })
})
