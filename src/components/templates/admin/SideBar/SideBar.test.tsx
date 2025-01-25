import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { SideBar } from '.'

describe('SideBar', () => {
  it('default', () => {
    render(<SideBar className="className" />)
    expect(screen.getByTestId('SideBar')).toBeInTheDocument()
    expect(screen.getByTestId('SideBar')).toHaveClass('className')
  })
})
