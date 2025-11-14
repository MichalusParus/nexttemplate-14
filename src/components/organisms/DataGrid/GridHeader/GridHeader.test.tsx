import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import {
  gridColsDef,
  gridMultiColsDef,
  JestDataGridProvider,
} from '../../../../../.storybook/helpers'
import { GridHeader } from '.'

expect.extend(toHaveNoViolations)

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
})

describe('GridHeader', () => {
  it('default', () => {
    render(
      <JestDataGridProvider columns={gridColsDef}>
        <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" className="className" />
      </JestDataGridProvider>,
    )
    const rowgroup = screen.getByRole('rowgroup')
    const columnheaders = screen.getAllByRole('columnheader')

    expect(rowgroup).toBeInTheDocument()
    expect(rowgroup).toHaveClass('className')
    expect(rowgroup).toHaveClass('DataGridHeader')
    expect(rowgroup).toHaveTextContent('NameAgeStatusActiveJoin DateDepartment')
    expect(columnheaders).toHaveLength(6)
    expect(rowgroup).toHaveStyle({ gridTemplateRows: 'repeat(1, auto)' })
  })

  it('nested columns', () => {
    render(
      <JestDataGridProvider columns={gridMultiColsDef}>
        <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" />
      </JestDataGridProvider>,
    )
    const rowgroup = screen.getByRole('rowgroup')
    const columnheaders = screen.getAllByRole('columnheader')

    expect(rowgroup).toHaveStyle({ gridTemplateRows: 'repeat(3, auto)' })
    expect(columnheaders.length).toBeGreaterThan(6)
    expect(screen.getByText('Employee Information')).toBeInTheDocument()
    expect(screen.getByText('Work Information')).toBeInTheDocument()
    expect(screen.getByText('Personal Details')).toBeInTheDocument()
    expect(screen.getByText('Status Info')).toBeInTheDocument()
    expect(screen.getByText('Employment')).toBeInTheDocument()
  })

  it('multiselect with handleAll', () => {
    const spy = jest.fn()
    render(
      <JestDataGridProvider columns={gridColsDef}>
        <GridHeader
          gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
          handleAll={spy}
          allSelected={false}
        />
      </JestDataGridProvider>,
    )
    const rowgroup = screen.getByRole('rowgroup')
    const columnheaders = screen.getAllByRole('columnheader')
    const selectAllButton = screen.getByTestId('SelectAllButton')

    expect(columnheaders).toHaveLength(7)
    expect(rowgroup.style.gridTemplateColumns).toContain('max-content')
    expect(selectAllButton).toBeInTheDocument()

    fireEvent.click(selectAllButton)
    expect(spy).toHaveBeenCalled()
  })

  it('multiselect with nested columns', () => {
    const spy = jest.fn()
    render(
      <JestDataGridProvider columns={gridMultiColsDef}>
        <GridHeader
          gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
          handleAll={spy}
          allSelected={true}
        />
      </JestDataGridProvider>,
    )
    const rowgroup = screen.getByRole('rowgroup')
    const selectAllButton = screen.getByTestId('SelectAllButton')

    const emptySpaceDiv = rowgroup.querySelector('[aria-hidden="true"]')
    expect(emptySpaceDiv).toBeInTheDocument()
    expect(emptySpaceDiv).toHaveStyle({ gridColumn: '1', gridRow: '1 / span 2' })
    expect(selectAllButton).toHaveClass('selected')
  })

  it('sorting and filtering on last row only', () => {
    render(
      <JestDataGridProvider columns={gridMultiColsDef}>
        <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" />
      </JestDataGridProvider>,
    )
    const sortButtons = screen.getAllByTestId('ColumnHeadSortButton')
    const filterButtons = screen.getAllByTestId('MenuButton')

    expect(sortButtons.length).toBe(6)
    expect(filterButtons.length).toBe(6)
  })

  it('axe', async () => {
    const { container } = render(
      <JestDataGridProvider columns={gridColsDef}>
        <div role="table">
          <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" />
        </div>
      </JestDataGridProvider>,
    )

    const results = await axe(container, {
      rules: {
        'button-name': { enabled: false },
        'aria-required-children': { enabled: false },
        'aria-required-parent': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
