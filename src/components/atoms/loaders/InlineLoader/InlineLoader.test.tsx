import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { InlineLoader } from '.'

expect.extend(toHaveNoViolations)

describe('InlineLoader', () => {
  it('default', () => {
    render(<InlineLoader className="className" />)
    const statusRole = screen.getByRole('status')

    expect(statusRole).toBeInTheDocument()
    expect(statusRole).toHaveClass('className')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<InlineLoader ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<InlineLoader />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
