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
    const menuWrapTestId = screen.getByTestId('MenuWrap')
    const menuButtonTestId = screen.getByTestId('MenuButton')

    expect(menuWrapTestId).toBeInTheDocument()
    expect(menuWrapTestId).toHaveClass('className')
    expect(menuButtonTestId).toBeInTheDocument()
    expect(menuButtonTestId).toHaveAttribute('aria-haspopup', 'menu')
    expect(menuButtonTestId).toHaveAttribute('aria-expanded', 'false')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
    })

    const menuRole = screen.getByRole('menu')
    const filterTitle = screen.getByText(`Filter in ${gridColsDef[0].label}`)

    expect(menuButtonTestId).toHaveAttribute('aria-expanded', 'true')
    expect(menuButtonTestId).toHaveClass('selected')
    expect(menuRole).toBeInTheDocument()
    expect(filterTitle).toBeInTheDocument()
  })

  it('open and close', async () => {
    render(
      <JestDataGridProvider>
        <GridFilter column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const menuButtonTestId = screen.getByTestId('MenuButton')

    expect(menuButtonTestId).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(menuButtonTestId)
    })

    expect(menuButtonTestId).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await act(async () => {
      const overlay = screen.getByTestId('Overlay')
      fireEvent.click(overlay)
    })

    await waitFor(
      () => {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
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
    const menuButtonTestId = screen.getByTestId('MenuButton')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
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
    const menuButtonTestId = screen.getByTestId('MenuButton')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
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
    const menuButtonTestId = screen.getByTestId('MenuButton')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
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
    const menuButtonTestId = screen.getByTestId('MenuButton')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
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
    const menuButtonTestId = screen.getByTestId('MenuButton')

    await act(async () => {
      fireEvent.click(menuButtonTestId)
    })

    const toggleButtons = screen
      .getAllByRole('button')
      .filter(btn => btn.getAttribute('aria-pressed'))
    expect(toggleButtons.length).toBeGreaterThan(0)
  })

  it('visibility', async () => {
    const setFilterMock = jest.fn()

    const { rerender } = render(
      <JestDataGridProvider>
        <GridFilter column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    expect(screen.getByTestId('MenuButton')).toHaveClass('opacity-0')

    rerender(
      <JestDataGridProvider
        filter={{ [gridColsDef[0].name]: { operator: FilterOperator.EQUALS, value: 'test' } }}
        setFilter={setFilterMock}
      >
        <GridFilter column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    expect(screen.getByTestId('MenuButton')).toHaveClass('opacity-100')

    rerender(
      <JestDataGridProvider>
        <GridFilter column={gridColsDef[0]} />
      </JestDataGridProvider>,
    )
    const menuButton = screen.getByTestId('MenuButton')

    await act(async () => {
      fireEvent.click(menuButton)
    })

    expect(menuButton).toHaveClass('selected')
    expect(menuButton.className).toContain('[&.selected]:opacity-100')
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
