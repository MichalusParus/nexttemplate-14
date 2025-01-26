import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Title } from '.'

expect.extend(toHaveNoViolations)

describe('Title', () => {
  it('default', () => {
    render(
      <Title variant="h1" className="className" align="text-center">
        Title
      </Title>,
    )
    const titleRole = screen.getByRole('heading')

    expect(titleRole).toBeInTheDocument()
    expect(titleRole).toHaveClass('className')
    expect(titleRole).toHaveClass('text-center')
    expect(titleRole).toHaveTextContent('Title')
    expect(titleRole.tagName).toBe('H1')
  })

  it('tagname', () => {
    render(<Title variant="h2">Title</Title>)
    const titleRole = screen.getByRole('heading')

    expect(titleRole.tagName).toBe('H2')
  })

  it('isLoading', () => {
    render(
      <Title variant="h1" isLoading>
        Title
      </Title>,
    )
    const statusQuery = screen.queryAllByRole('status')
    const textQuery = screen.queryByText('Title')

    expect(textQuery).toBeNull()
    expect(statusQuery).toHaveLength(1)
  })

  it('ref', () => {
    const ref = createRef<HTMLHeadingElement>()
    render(
      <Title variant="h1" ref={ref}>
        Title
      </Title>,
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Title variant="h1">Title</Title>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
