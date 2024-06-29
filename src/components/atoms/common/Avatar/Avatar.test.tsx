import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Avatar from '.'

describe('Avatar', () => {
  it('default', () => {
    render(<Avatar className="className" />)
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('img')).toBeTruthy()
    expect(screen.getByRole('img')).toHaveClass('className')
    expect(screen.getByRole('img')).not.toHaveTextContent('UN')
  })

  it('username', () => {
    render(<Avatar username="User Name" />)
    expect(screen.getByRole('img')).toHaveTextContent('UN')
  })

  it('src', () => {
    render(<Avatar username="User Name" src="/src" />)
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src')
  })
})
