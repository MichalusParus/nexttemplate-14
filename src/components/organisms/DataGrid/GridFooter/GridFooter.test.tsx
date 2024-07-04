import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import GridFooter from '.'

describe('GridFooter', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <GridFooter
          filteredData={[]}
          selectedRowsPerPage={20}
          pages={[1, 2, 3]}
          selectedPage={1}
          setSelectedPage={() => {}}
          setSelectedRowsPerPage={() => {}}
        />
        ,
      </JestMockProvider>,
    )
    expect(screen.getByRole('rowgroup')).toBeTruthy()
    expect(screen.getByRole('rowgroup')).toHaveClass('GridFooter')
    expect(screen.getByTestId('MobilePagination')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument()
  })
})
