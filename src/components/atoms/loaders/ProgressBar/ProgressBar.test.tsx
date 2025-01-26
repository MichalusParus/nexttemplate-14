import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { ProgressBar } from '.'

expect.extend(toHaveNoViolations)

describe('ProgressBar', () => {
  it('default', () => {
    render(<ProgressBar className="className" />)
    const progressRole = screen.getByRole('progressbar')

    expect(progressRole).toBeInTheDocument()
    expect(progressRole).toHaveClass('className')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ProgressBar ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<ProgressBar />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
