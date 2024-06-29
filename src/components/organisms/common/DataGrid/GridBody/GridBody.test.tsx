import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import GridBody from '.'

describe('GridBody', () => {
  it('default', () => {
    render(
      <GridBody
        columns={[]}
        pagedData={[]}
        selectedRows={[]}
        multiselect
        handleOnRowClick={() => {}}
      />,
    )
    expect(screen.getByRole('rowgroup')).toBeTruthy()
    expect(screen.getByRole('rowgroup')).toHaveClass('GridBody')
  })
})
