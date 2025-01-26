import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Ghost } from '.'

expect.extend(toHaveNoViolations)

describe('Ghost', () => {
  it('default', () => {
    render(<Ghost className="className" />)
    const statusRole = screen.getByRole('status')

    expect(statusRole).toBeInTheDocument()
    expect(statusRole).toHaveClass('className')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Ghost ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Ghost />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
