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
  it('default', async () => {
    render(
      <JestDataGridProvider>
        <GridFilter className="className" column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const gridFilter = screen.getByText('', { selector: '.GridFilter' })
    const filterButton = screen.getByTestId('FilterButton')

    expect(gridFilter).toBeInTheDocument()
    expect(gridFilter).toHaveClass('className')
    expect(filterButton).toBeInTheDocument()
    expect(filterButton).toHaveAttribute('aria-haspopup', 'dialog')
    expect(filterButton).toHaveAttribute('aria-expanded', 'false')

    await act(async () => {
      fireEvent.click(filterButton)
    })

    const dropdown = screen.getByTestId('Dropdown')
    const filterTitle = screen.getByText(`Filter in ${gridColsDef[0].label}`)

    expect(filterButton).toHaveAttribute('aria-expanded', 'true')
    expect(filterButton).toHaveClass('selected')
    expect(dropdown).toBeInTheDocument()
    expect(filterTitle).toBeInTheDocument()
  })

  it('open and close', async () => {
    render(
      <JestDataGridProvider>
        <GridFilter column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const filterButton = screen.getByTestId('FilterButton')

    expect(filterButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(filterButton)
    })

    expect(filterButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByTestId('Dropdown')).toBeInTheDocument()

    await act(async () => {
      const overlay = screen.getByTestId('Overlay')
      fireEvent.click(overlay)
    })

    await waitFor(
      () => {
        expect(screen.queryByTestId('Dropdown')).not.toBeInTheDocument()
      },
      { timeout: 500 },
    )
  })

  it('renders text filter', async () => {
    const textColumn = { ...gridColsDef[0], filter: { type: 'text' as const } }
    render(
      <JestDataGridProvider>
        <GridFilter column={textColumn} />
      </JestDataGridProvider>,
    )
    const filterButton = screen.getByTestId('FilterButton')

    await act(async () => {
      fireEvent.click(filterButton)
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
    const filterButton = screen.getByTestId('FilterButton')

    await act(async () => {
      fireEvent.click(filterButton)
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
    const filterButton = screen.getByTestId('FilterButton')

    await act(async () => {
      fireEvent.click(filterButton)
    })

    const datePicker = screen.getByTestId('DatePicker')
    expect(datePicker).toBeInTheDocument()
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
    const filterButton = screen.getByTestId('FilterButton')

    await act(async () => {
      fireEvent.click(filterButton)
    })

    const selects = screen.getAllByTestId('Select')
    expect(selects.length).toBe(2)
    const selectButton = selects[0].querySelector('button')
    expect(selectButton).toHaveAttribute('id', selectColumn.name)
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
    const filterButton = screen.getByTestId('FilterButton')

    await act(async () => {
      fireEvent.click(filterButton)
    })

    const toggleButtons = screen
      .getAllByRole('button')
      .filter(btn => btn.getAttribute('aria-pressed'))
    expect(toggleButtons.length).toBeGreaterThan(0)
  })

  it('visibility', async () => {
    render(
      <JestDataGridProvider>
        <GridFilter column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const filterButton = screen.getByTestId('FilterButton')
    const filterIcon = filterButton.querySelector('svg')
    expect(filterIcon).toHaveClass('opacity-0')

    render(
      <JestDataGridProvider
        filter={{ [gridColsDef[0].name]: { operator: FilterOperator.EQUALS, value: 'test' } }}
      >
        <GridFilter column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const activeIcon = screen.getAllByTestId('FilterButton')[1].querySelector('svg')
    expect(activeIcon).toHaveClass('opacity-100')
  })

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
