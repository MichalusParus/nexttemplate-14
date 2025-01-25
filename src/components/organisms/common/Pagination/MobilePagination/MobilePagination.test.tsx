import '@testing-library/jest-dom'

import { render, screen } from '../../../../../../.jest/customRender'
import { MobilePagination } from '.'

describe('MobilePagination', () => {
  it('default', () => {
    render(
      <MobilePagination
        count={3}
        selectedPage={1}
        setSelectedPage={() => {}}
        className="className"
      />,
    )
    expect(screen.getByTestId('MobilePagination')).toBeInTheDocument()
    expect(screen.getByTestId('MobilePagination')).toHaveClass('className')
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getByTestId('SelectedOutOff')).toHaveTextContent('1 / 3')
  })

  it('selectedPage', () => {
    render(
      <MobilePagination
        count={3}
        selectedPage={3}
        setSelectedPage={() => {}}
        className="className"
      />,
    )
    expect(screen.getByTestId('SelectedOutOff')).toHaveTextContent('3 / 3')
  })
})
