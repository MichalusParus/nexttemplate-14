import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act } from 'react'

import { FilterOperator } from '@/utils/hooks/useFilterData'

import { fireEvent, render, screen, waitFor } from '../../../../../../../.jest/customRender'
import { gridColsDef, JestDataGridProvider } from '../../../../../../../.storybook/helpers'
import { GridFilter } from '.'

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

describe('GridFilter', () => {
  describe('Semantics', () => {
    it('renders filter button with aria attributes', () => {
      render(
        <JestDataGridProvider>
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )
      const filterButton = screen.getByTestId('FilterButton')

      expect(filterButton).toBeInTheDocument()
      expect(filterButton).toHaveAttribute('aria-haspopup', 'dialog')
      expect(filterButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('className lands on wrapper', () => {
      render(
        <JestDataGridProvider>
          <GridFilter className="className" column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.getByText('', { selector: '.GridFilter' })).toHaveClass('className')
    })

    it('aria-expanded true when open', async () => {
      render(
        <JestDataGridProvider>
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )
      const filterButton = screen.getByTestId('FilterButton')

      await act(async () => {
        fireEvent.click(filterButton)
      })

      expect(filterButton).toHaveAttribute('aria-expanded', 'true')
      expect(filterButton).toHaveClass('selected')
    })

    it('dropdown renders with filter title', async () => {
      render(
        <JestDataGridProvider>
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('FilterButton'))
      })

      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()
      expect(screen.getByText(`Filter in ${gridColsDef[0].label}`)).toBeInTheDocument()
    })

    it('filter icon opacity-0 when no filter applied', () => {
      render(
        <JestDataGridProvider>
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )
      const filterIcon = screen.getByTestId('FilterButton').querySelector('svg')

      expect(filterIcon).toHaveClass('opacity-0')
    })

    it('filter icon opacity-100 when filter is applied', () => {
      render(
        <JestDataGridProvider
          filter={{ [gridColsDef[0].name]: { operator: FilterOperator.EQUALS, value: 'test' } }}
        >
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )
      const filterIcon = screen.getByTestId('FilterButton').querySelector('svg')

      expect(filterIcon).toHaveClass('opacity-100')
    })

    it('renders text filter', async () => {
      const textColumn = { ...gridColsDef[0], filter: { type: 'text' as const } }
      render(
        <JestDataGridProvider>
          <GridFilter column={textColumn} />
        </JestDataGridProvider>,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('FilterButton'))
      })

      const textInput = screen.getByPlaceholderText(`search in ${textColumn.label}`)
      expect(textInput).toBeInTheDocument()
      expect(textInput).toHaveAttribute('type', 'search')
    })

    it('renders number filter', async () => {
      const numberColumn = { ...gridColsDef[0], filter: { type: 'number' as const } }
      render(
        <JestDataGridProvider>
          <GridFilter column={numberColumn} />
        </JestDataGridProvider>,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('FilterButton'))
      })

      const numberInput = screen.getByPlaceholderText(numberColumn.label)
      expect(numberInput).toBeInTheDocument()
      expect(numberInput).toHaveAttribute('type', 'text')
      expect(numberInput).toHaveAttribute('inputmode', 'decimal')
    })

    it('renders date filter', async () => {
      const dateColumn = { ...gridColsDef[0], filter: { type: 'date' as const } }
      render(
        <JestDataGridProvider>
          <GridFilter column={dateColumn} />
        </JestDataGridProvider>,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('FilterButton'))
      })

      expect(screen.getByTestId('DatePicker')).toBeInTheDocument()
    })

    it('renders select filter', async () => {
      const selectColumn = {
        ...gridColsDef[0],
        filter: { type: 'select' as const, options: [{ value: 'option1', label: 'Option 1' }] },
      }
      render(
        <JestDataGridProvider>
          <GridFilter column={selectColumn} />
        </JestDataGridProvider>,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('FilterButton'))
      })

      const selects = screen.getAllByTestId('Select')
      expect(selects.length).toBe(2)
      expect(selects[0].querySelector('button')).toHaveAttribute('id', selectColumn.name)
    })

    it('renders toggle filter', async () => {
      const toggleColumn = {
        ...gridColsDef[0],
        filter: {
          type: 'toggle' as const,
          options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
          ],
        },
      }
      render(
        <JestDataGridProvider>
          <GridFilter column={toggleColumn} />
        </JestDataGridProvider>,
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('FilterButton'))
      })

      const toggleButtons = screen
        .getAllByRole('button')
        .filter(btn => btn.getAttribute('aria-pressed'))
      expect(toggleButtons.length).toBeGreaterThan(0)
    })
  })

  describe('Interaction', () => {
    it('open and close via overlay click', async () => {
      render(
        <JestDataGridProvider>
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )
      const filterButton = screen.getByTestId('FilterButton')

      expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()

      await act(async () => {
        fireEvent.click(filterButton)
      })
      expect(screen.getByTestId('Dropdown')).toBeInTheDocument()

      await act(async () => {
        fireEvent.click(screen.getByTestId('Overlay'))
      })

      await waitFor(
        () => {
          expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()
        },
        { timeout: 500 },
      )
    })
  })

  describe('Ref', () => {
    it('filter wrapper is accessible in DOM', () => {
      render(
        <JestDataGridProvider>
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )

      expect(screen.getByText('', { selector: '.GridFilter' })).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('axe', async () => {
      const { container } = render(
        <JestDataGridProvider>
          <GridFilter column={gridColsDef[0]} />
        </JestDataGridProvider>,
      )

      const results = await axe(container, {
        rules: {
          'button-name': { enabled: false },
        },
      })
      expect(results).toHaveNoViolations()
    })
  })
})
