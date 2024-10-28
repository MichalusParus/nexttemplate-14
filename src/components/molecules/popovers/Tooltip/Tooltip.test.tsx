import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { Tooltip } from '.'

describe('Tooltip', () => {
  it('default', () => {
    render(
      <Tooltip title="tooltip" className="className">
        Children
      </Tooltip>,
    )
    fireEvent.mouseEnter(screen.getByTestId('TooltipWrap'))
    expect(screen.getByRole('tooltip')).toBeTruthy()
    expect(screen.getByTestId('TooltipWrap')).toHaveClass('className')
    expect(screen.getByTestId('TooltipWrap')).toHaveTextContent('Children')
    expect(screen.getByRole('tooltip')).toHaveTextContent('tooltip')
  })
})
