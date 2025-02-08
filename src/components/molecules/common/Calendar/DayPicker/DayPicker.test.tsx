import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen, within } from '../../../../../../.jest/customRender'
import { getDaysInMonth } from '../../../../../../.storybook/helpers'
import { DayPicker } from '.'

expect.extend(toHaveNoViolations)

describe('DayPicker', () => {
  it('default', () => {
    render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />)
    const gridRole = screen.getByRole('grid')
    const rowRoles = screen.getAllByRole('row')
    const headerRoles = screen.getAllByRole('columnheader')
    const cellRoles = screen.getAllByRole('gridcell')

    expect(gridRole).toBeInTheDocument()
    expect(gridRole).toHaveClass('grid grid-cols-7')
    expect(rowRoles).toHaveLength(7)
    expect(rowRoles[0]).toHaveClass('contents')
    rowRoles.forEach((row, i) => {
      if (i === 0) {
        expect(within(row).getAllByRole('columnheader')).toHaveLength(7)
      } else {
        expect(within(row).getAllByRole('gridcell')).toHaveLength(7)
      }
    })
    expect(cellRoles).toHaveLength(42)
    expect(headerRoles[0]).toHaveTextContent('Mon')
    expect(cellRoles[0]).toHaveTextContent('26')
    // expect(cellRoles[0]).toHaveAttribute('aria-label', '26')
    expect(cellRoles[0]).toHaveClass('selected')
    expect(cellRoles[0]).toHaveAttribute('aria-selected')
    expect(cellRoles[1]).toHaveAttribute('aria-selected', 'false')
    expect(cellRoles[5]).toHaveAttribute('disabled')
  })

  it('weekStart', () => {
    render(<DayPicker daysInMonth={getDaysInMonth(0)} weekStart={0} onChange={() => {}} />)
    const headerRoles = screen.getAllByRole('columnheader')
    const cellRoles = screen.getAllByRole('gridcell')

    expect(headerRoles[0]).toHaveTextContent('Sun')
    expect(cellRoles[0]).toHaveTextContent('1')
  })

  it('buttonProps', () => {
    render(
      <DayPicker
        daysInMonth={getDaysInMonth(0)}
        weekStart={0}
        buttonProps={{ className: 'className' }}
        onChange={() => {}}
      />,
    )
    const cellRoles = screen.getAllByRole('gridcell')

    expect(cellRoles[0]).toHaveClass('className')
    expect(cellRoles[20]).toHaveClass('className')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={spy} />)
    const cellRoles = screen.getAllByRole('gridcell')

    fireEvent.click(cellRoles[0])
    expect(spy).toHaveBeenCalledWith(getDaysInMonth(1)[0][0].day)
  })

  it('axe', async () => {
    const { container } = render(
      <DayPicker daysInMonth={getDaysInMonth(1)} weekStart={1} onChange={() => {}} />,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
