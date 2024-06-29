import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { gridColsDef } from '../../../../../../.storybook/helpers'
import GridHeader from '.'

describe('GridHeader', () => {
  it('default', () => {
    render(
      <GridHeader
        className="className"
        name="ColumnHeadTest"
        columns={gridColsDef}
        sorting={{
          key: 'none',
        }}
        filter={{
          key: '',
        }}
      />,
    )
    expect(screen.getByRole('rowgroup')).toBeTruthy()
    expect(screen.getByRole('rowgroup')).toHaveClass('className')
  })
})
