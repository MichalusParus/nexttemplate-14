import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Dropdown } from '.'

describe('Dropdown', () => {
  it('default', () => {
    render(
      <Dropdown
        className="className"
        parentRef={{ current: null }}
        placement="bottom-start"
        isOpen={true}
        onClose={() => {}}
      >
        Children
      </Dropdown>,
    )
    expect(screen.getByTestId('Dropdown')).toBeTruthy()
    expect(screen.getByTestId('Dropdown')).toHaveClass('className')
    expect(screen.getByTestId('Dropdown')).toHaveTextContent('Children')
  })
})
