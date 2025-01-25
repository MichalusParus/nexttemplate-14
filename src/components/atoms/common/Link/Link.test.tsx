import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Link } from '.'

expect.extend(toHaveNoViolations)

describe('Link', () => {
  it('default', () => {
    render(
      <Link className="className" href="/#">
        title
      </Link>,
    )
    const linkRole = screen.getByRole('link')

    expect(linkRole).toBeInTheDocument()
    expect(linkRole).toHaveClass('className')
    expect(linkRole).toHaveTextContent('title')
    expect(linkRole).toHaveAttribute('href', '/#')
    linkRole.focus()
    expect(document.activeElement).toBe(linkRole)
  })

  it('iconOnly', () => {
    render(<Link startIcon={<svg role="img" />} href="#" aria-label="label" />)
    const linkRole = screen.getByRole('link')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(linkRole).toHaveTextContent('')
    expect(linkRole).toHaveAttribute('aria-label', 'label')
  })

  it('startIcon', () => {
    render(
      <Link startIcon={<svg role="img" />} href="#">
        title
      </Link>,
    )
    const linkRole = screen.getByRole('link')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(linkRole).toHaveTextContent('title')
  })

  it('endIcon', () => {
    render(
      <Link endIcon={<svg role="img" />} href="#">
        title
      </Link>,
    )
    const linkRole = screen.getByRole('link')
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
    expect(linkRole).toHaveTextContent('title')
  })

  it('no aria-label warning', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    render(<Link startIcon={<svg role="img" />} href="#" />)

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Icon-only links should have an aria-label for accessibility.',
    )
    consoleWarnSpy.mockRestore()
  })

  it('ref', () => {
    const ref = createRef<HTMLAnchorElement>()
    render(
      <Link ref={ref} href="/#">
        title
      </Link>,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Link href="#">title</Link>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
