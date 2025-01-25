import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { GridFooter } from '.'

describe('GridFooter', () => {
  it('default', () => {
    render(
      <GridFooter
        filteredData={[]}
        selectedRowsPerPage={20}
        pages={[1, 2, 3]}
        selectedPage={1}
        setSelectedPage={() => {}}
        setSelectedRowsPerPage={() => {}}
      />,
    )
    expect(screen.getByRole('rowgroup')).toBeInTheDocument()
    expect(screen.getByRole('rowgroup')).toHaveClass('GridFooter')
    expect(screen.getByTestId('MobilePagination')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument()
  })
})
