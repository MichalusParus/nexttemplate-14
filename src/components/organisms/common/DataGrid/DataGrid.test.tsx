import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { gridColsDef, gridData } from '../../../../../.storybook/helpers'
import DataGrid from '.'

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
    useSearchParams: jest.fn().mockReturnValue(router),
  }
})

describe('DataGrid', () => {
  it('default', () => {
    render(
      <DataGrid className="className" name="dataGridTest" columns={gridColsDef} rows={gridData} />,
    )
    expect(screen.getByRole('grid')).toBeTruthy()
    expect(screen.getByRole('grid')).toHaveClass('className')
  })
})
