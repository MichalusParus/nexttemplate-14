import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { SideBar } from '.'

describe('SideBar', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <SideBar className="className" />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('SideBar')).toBeTruthy()
    expect(screen.getByTestId('SideBar')).toHaveClass('className')
  })
})
