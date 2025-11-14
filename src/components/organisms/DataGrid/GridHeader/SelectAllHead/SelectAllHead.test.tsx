import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { JestDataGridProvider } from '../../../../../../.storybook/helpers'
import { SelectAllHead } from '.'

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

describe('SelectAllHead', () => {
  it('default', () => {
    render(
      <JestDataGridProvider>
        <SelectAllHead className="className" handleAll={() => {}} />
      </JestDataGridProvider>,
    )
    const columnHeader = screen.getByRole('columnheader')
    const checkbox = screen.getByTestId('CheckboxWrap')
    const button = columnHeader.querySelector('button')

    expect(columnHeader).toBeInTheDocument()
    expect(columnHeader).toHaveClass('className')
    expect(columnHeader).toHaveAttribute('role', 'columnheader')
    expect(columnHeader).toHaveAttribute('aria-label', 'select all')
    expect(checkbox).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'select all')
  })

  it('isChecked false', () => {
    render(
      <JestDataGridProvider>
        <SelectAllHead handleAll={() => {}} isChecked={false} />
      </JestDataGridProvider>,
    )
    const button = screen.getByRole('columnheader').querySelector('button')

    expect(button).not.toHaveClass('selected')
  })

  it('isChecked true', () => {
    render(
      <JestDataGridProvider>
        <SelectAllHead handleAll={() => {}} isChecked={true} />
      </JestDataGridProvider>,
    )
    const button = screen.getByRole('columnheader').querySelector('button')

    expect(button).toHaveClass('selected')
  })

  it('handleAll click', () => {
    const spy = jest.fn()
    render(
      <JestDataGridProvider>
        <SelectAllHead handleAll={spy} />
      </JestDataGridProvider>,
    )
    const buttonTestId = screen.getByTestId('SelectAllButton')

    fireEvent.click(buttonTestId)

    expect(spy).toHaveBeenCalled()
  })

  it('gridColumn and gridRow props', () => {
    render(
      <JestDataGridProvider>
        <SelectAllHead handleAll={() => {}} gridColumn="1" gridRow="2" />
      </JestDataGridProvider>,
    )
    const columnHeader = screen.getByRole('columnheader')

    expect(columnHeader).toHaveStyle({ gridColumn: '1', gridRow: '2' })
  })

  it('axe', async () => {
    const { container } = render(
      <JestDataGridProvider>
        <table>
          <thead>
            <tr>
              <th>
                <SelectAllHead handleAll={() => {}} />
              </th>
            </tr>
          </thead>
        </table>
      </JestDataGridProvider>,
    )

    const results = await axe(container, {
      rules: {
        'button-name': { enabled: false },
        'aria-required-parent': { enabled: false },
      },
    })
    expect(results).toHaveNoViolations()
  })
})
