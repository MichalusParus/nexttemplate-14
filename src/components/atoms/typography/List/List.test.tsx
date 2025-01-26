import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { List } from '.'
import { Li } from './Li/Li'

expect.extend(toHaveNoViolations)

describe('List', () => {
  it('default', () => {
    render(<List className="className" listStyleType="list-circle" />)
    const listRole = screen.getByRole('list')
    const liQueries = screen.queryAllByRole('listitem')
    const titleQuery = screen.queryByRole('heading')
    const descriptionQuery = screen.queryByTestId('P')
    const statusQueries = screen.queryAllByRole('status')

    expect(listRole).toBeInTheDocument()
    expect(listRole).toHaveClass('className')
    expect(listRole.tagName).toBe('OL')
    expect(listRole).toHaveClass('list-circle')
    expect(liQueries).toHaveLength(0)
    expect(titleQuery).toBeNull()
    expect(descriptionQuery).toBeNull()
    expect(statusQueries).toHaveLength(0)
  })

  it('ul', () => {
    render(<List type="ul" listStyleType="list-decimal" />)
    const listRole = screen.getByRole('list')

    expect(listRole.tagName).toBe('UL')
    expect(listRole).toHaveClass('list-decimal')
  })

  it('content', () => {
    render(<List content={['1', '2', '3']} />)
    const liQueries = screen.queryAllByRole('listitem')

    expect(liQueries).toHaveLength(3)
    expect(liQueries[0]).toHaveTextContent('1')
    expect(liQueries[1]).toHaveTextContent('2')
    expect(liQueries[2]).toHaveTextContent('3')
  })

  it('children', () => {
    render(
      <List>
        {['1', '2', '3'].map(li => (
          <Li key={li}>{li}</Li>
        ))}
      </List>,
    )
    const liQueries = screen.queryAllByRole('listitem')

    expect(liQueries).toHaveLength(3)
    expect(liQueries[0]).toHaveTextContent('1')
    expect(liQueries[1]).toHaveTextContent('2')
    expect(liQueries[2]).toHaveTextContent('3')
  })

  it('title', () => {
    render(<List title="title" titleProps={{ variant: 'h2' }} />)
    const titleRole = screen.getByRole('heading')
    const titleText = screen.getByText('title')

    expect(titleRole).toBeInTheDocument()
    expect(titleRole).toHaveTextContent('title')
    expect(titleRole.tagName).toBe('H2')
    expect(titleText).toBeInTheDocument()
  })

  it('description', () => {
    render(<List description="description" pProps={{ className: 'pClass' }} />)
    const PTestId = screen.getByTestId('P')
    const descriptionText = screen.getByText('description')

    expect(PTestId).toBeInTheDocument()
    expect(PTestId).toHaveTextContent('description')
    expect(PTestId).toHaveClass('pClass')
    expect(descriptionText).toBeInTheDocument()
  })

  it('isloading', () => {
    render(
      <List
        title="title"
        description="description"
        titleProps={{ isLoading: true }}
        pProps={{ isLoading: true }}
        isLoading={true}
        expectedLines={6}
      />,
    )
    const statusQueries = screen.queryAllByRole('status')
    const titleText = screen.queryByText('title')
    const descriptionText = screen.queryByText('description')

    expect(statusQueries).toHaveLength(8)
    expect(titleText).toBeNull()
    expect(descriptionText).toBeNull()
  })

  it('icon', () => {
    render(<List content={['1', '2', '3']} icon={<svg data-testid="testSvg" />} />)
    const svgQueries = screen.queryAllByTestId('testSvg')

    expect(svgQueries).toHaveLength(3)
  })

  it('ref', () => {
    const ref = createRef<HTMLOListElement>()
    render(<List ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<List />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
