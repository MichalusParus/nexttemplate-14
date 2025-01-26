import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Ellipsis } from '.'

expect.extend(toHaveNoViolations)

describe('Ellipsis', () => {
  it('default', () => {
    render(<Ellipsis className="className">text</Ellipsis>)
    expect(screen.getByTestId('Ellipsis')).toBeInTheDocument()
    expect(screen.getByTestId('Ellipsis')).toHaveClass('className')
    expect(screen.getByTestId('Ellipsis')).toHaveTextContent('text')
    expect(screen.queryByRole('tooltip')).toBeNull()
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Ellipsis ref={ref}>text</Ellipsis>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Ellipsis>text</Ellipsis>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
