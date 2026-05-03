import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { JestDataGridProvider } from '../../../../../../../.storybook/helpers'
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
  describe('Semantics', () => {
    it('renders columnheader with aria-label and checkbox', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={() => {}} />
        </JestDataGridProvider>,
      )
      const columnHeader = screen.getByRole('columnheader')

      expect(columnHeader).toBeInTheDocument()
      expect(columnHeader).toHaveAttribute('role', 'columnheader')
      expect(columnHeader).toHaveAttribute('aria-label', 'Select all')
      expect(screen.getByTestId('CheckboxWrap')).toBeInTheDocument()
    })

    it('className lands on columnheader', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead className="className" handleAll={() => {}} />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('columnheader')).toHaveClass('className')
    })

    it('button has aria-label select all', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={() => {}} />
        </JestDataGridProvider>,
      )
      const button = screen.getByRole('columnheader').querySelector('button')

      expect(button).toHaveAttribute('aria-label', 'Select all')
    })

    it('unchecked state — no selected class', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={() => {}} isChecked={false} />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('columnheader').querySelector('button')).not.toHaveAttribute('data-selected')
    })

    it('checked state — selected class', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={() => {}} isChecked={true} />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('columnheader').querySelector('button')).toHaveAttribute('data-selected')
    })

    it('indeterminate state — selected class on button', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={() => {}} isIndeterminate={true} />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('columnheader').querySelector('button')).toHaveAttribute('data-selected')
    })

    it('gridColumn and gridRow props set inline styles', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={() => {}} gridColumn="1" gridRow="2" />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('columnheader')).toHaveStyle({ gridColumn: '1', gridRow: '2' })
    })
  })

  describe('Interaction', () => {
    it('click fires handleAll', () => {
      const handleAll = jest.fn()
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={handleAll} />
        </JestDataGridProvider>,
      )

      fireEvent.click(screen.getByTestId('SelectAllButton'))
      expect(handleAll).toHaveBeenCalled()
    })
  })

  describe('Ref', () => {
    it('columnheader is accessible in DOM', () => {
      render(
        <JestDataGridProvider>
          <SelectAllHead handleAll={() => {}} />
        </JestDataGridProvider>,
      )

      expect(screen.getByRole('columnheader')).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
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
})
