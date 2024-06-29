import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { gridColsDef } from '../../../../../../.storybook/helpers'
import ColumnHead from '.'

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
})

describe('ColumnHead', () => {
  it('default', () => {
    render(
      <ColumnHead
        className="className"
        name="ColumnHeadTest"
        column={gridColsDef[0]}
        sorting={{
          key: 'none',
        }}
        filter={{
          key: '',
        }}
      />,
    )
    expect(screen.getByTestId('ColumnHeader')).toBeTruthy()
    expect(screen.getByTestId('ColumnHeader')).toHaveClass('className')
  })
})
