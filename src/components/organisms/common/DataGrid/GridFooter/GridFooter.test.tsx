import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import GridFooter from '.'

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
    expect(screen.getByRole('rowgroup')).toBeTruthy()
    expect(screen.getByRole('rowgroup')).toHaveClass('GridFooter')
  })
})
