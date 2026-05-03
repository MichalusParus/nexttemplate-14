import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import {
  gridMultiColsDef,
  gridTestColsDef,
  JestDataGridProvider,
} from '../../../../../../.storybook/helpers'
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
  describe('Semantics', () => {
    it('renders rowgroup with columnheaders', () => {
      render(
        <JestDataGridProvider columns={gridTestColsDef}>
          <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" />
        </JestDataGridProvider>,
      )
      const rowgroup = screen.getByRole('rowgroup')
      const columnheaders = screen.getAllByRole('columnheader')

      expect(rowgroup).toBeInTheDocument()
      expect(rowgroup).toHaveClass('DataGridHeader')
      expect(rowgroup).toHaveTextContent('NameAgeStatusActiveJoin DateDepartment')
      expect(columnheaders).toHaveLength(6)
      expect(rowgroup).toHaveStyle({ gridTemplateRows: 'repeat(1, auto)' })
    })

    it('className lands on rowgroup', () => {
      render(
        <JestDataGridProvider columns={gridTestColsDef}>
          <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" className="className" />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('rowgroup')).toHaveClass('className')
    })

    it('nested columns render multi-level headers', () => {
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

    it('multiselect adds select-all columnheader', () => {
      render(
        <JestDataGridProvider columns={gridTestColsDef}>
          <GridHeader
            gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
            handleAll={jest.fn()}
            allSelected={false}
          />
        </JestDataGridProvider>,
      )
      const rowgroup = screen.getByRole('rowgroup')
      const columnheaders = screen.getAllByRole('columnheader')

      expect(columnheaders).toHaveLength(7)
      expect(rowgroup.style.gridTemplateColumns).toContain('max-content')
      expect(screen.getByTestId('SelectAllButton')).toBeInTheDocument()
    })

    it('multiselect with nested columns renders aria-hidden spacer', () => {
      render(
        <JestDataGridProvider columns={gridMultiColsDef}>
          <GridHeader
            gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
            handleAll={jest.fn()}
            allSelected={true}
          />
        </JestDataGridProvider>,
      )
      const rowgroup = screen.getByRole('rowgroup')
      const spacer = rowgroup.querySelector('[aria-hidden="true"]')

      expect(spacer).toBeInTheDocument()
      expect(spacer).toHaveStyle({ gridColumn: '1', gridRow: '1 / span 2' })
      expect(screen.getByTestId('SelectAllButton')).toHaveAttribute('data-selected')
    })

    it('sort and filter buttons only on leaf columns', () => {
      render(
        <JestDataGridProvider columns={gridMultiColsDef}>
          <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" />
        </JestDataGridProvider>,
      )
      const sortButtons = screen.getAllByTestId('ColumnHeadSortButton')
      const filterButtons = screen.getAllByTestId('FilterButton')

      expect(sortButtons.length).toBe(6)
      expect(filterButtons.length).toBe(6)
    })
  })

  describe('Interaction', () => {
    it('handleAll fires on select-all click', () => {
      const handleAll = jest.fn()
      render(
        <JestDataGridProvider columns={gridTestColsDef}>
          <GridHeader
            gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
            handleAll={handleAll}
            allSelected={false}
          />
        </JestDataGridProvider>,
      )

      fireEvent.click(screen.getByTestId('SelectAllButton'))
      expect(handleAll).toHaveBeenCalled()
    })
  })

  describe('Ref', () => {
    it('rowgroup is accessible in DOM', () => {
      render(
        <JestDataGridProvider columns={gridTestColsDef}>
          <GridHeader gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr" />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('rowgroup')).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <JestDataGridProvider columns={gridTestColsDef}>
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
})
