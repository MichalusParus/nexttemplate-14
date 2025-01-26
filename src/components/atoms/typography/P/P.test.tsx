import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { P } from '.'

expect.extend(toHaveNoViolations)

describe('P', () => {
  it('default', () => {
    render(
      <P className="className" align="text-center">
        Paragraph text
      </P>,
    )
    const PTestId = screen.getByTestId('P')

    expect(PTestId).toBeInTheDocument()
    expect(PTestId).toHaveClass('className')
    expect(PTestId).toHaveClass('text-center')
    expect(PTestId).toHaveTextContent('Paragraph text')
  })

  it('isLoading', () => {
    render(
      <P isLoading expectedLines={5}>
        Paragraph text
      </P>,
    )
    const statusQuery = screen.queryAllByRole('status')
    const textQuery = screen.queryByText('Paragraph text')

    expect(textQuery).toBeNull()
    expect(statusQuery).toHaveLength(5)
  })

  it('ref', () => {
    const ref = createRef<HTMLParagraphElement>()
    render(<P ref={ref}>Paragraph text</P>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<P>Paragraph text</P>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
