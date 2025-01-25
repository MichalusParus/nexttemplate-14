import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Paper } from '.'

expect.extend(toHaveNoViolations)

describe('Paper', () => {
  it('default', () => {
    render(<Paper className="className">Paper</Paper>)
    const paperTestId = screen.getByTestId('Paper')
    const paperText = screen.getByText('Paper')

    expect(paperTestId).toBeInTheDocument()
    expect(paperTestId).toHaveClass('className')
    expect(paperText).toBeInTheDocument()
  })

  it('props', () => {
    render(
      <Paper padding="p-6" rounded="rounded-lg">
        Paper
      </Paper>,
    )
    const paperTestId = screen.getByTestId('Paper')

    expect(paperTestId).toHaveClass('p-6')
    expect(paperTestId).toHaveClass('rounded-lg')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Paper ref={ref}>Paper</Paper>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Paper>Paper</Paper>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
