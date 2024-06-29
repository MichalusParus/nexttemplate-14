import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Link from '.'

describe('Link', () => {
  it('default', () => {
    render(
      <Link className="className" href="/#">
        title
      </Link>,
    )
    expect(screen.getByRole('link')).toBeVisible()
    expect(screen.getByRole('link')).toHaveClass('className')
    expect(screen.getByRole('link')).toHaveTextContent('title')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/#')
  })

  it('iconOnly', () => {
    render(<Link startIcon={<svg role="img" />} href="#" />)
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('link')).toHaveTextContent('')
  })

  it('startIcon', () => {
    render(
      <Link startIcon={<svg role="img" />} href="#">
        title
      </Link>,
    )
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('link')).toHaveTextContent('title')
  })

  it('endIcon', () => {
    render(
      <Link endIcon={<svg role="img" />} href="#">
        title
      </Link>,
    )
    expect(screen.getByRole('img')).toBeVisible()
    expect(screen.getByRole('link')).toHaveTextContent('title')
  })
})
