import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Tooltip from '.'

describe('Tooltip', () => {
  it('default', () => {
    render(
      <Tooltip title="tooltip" className="className">
        Children
      </Tooltip>,
    )
    expect(screen.getByRole('tooltip')).toBeTruthy()
    expect(screen.getByTestId('TooltipWrap')).toHaveClass('className')
    expect(screen.getByTestId('TooltipWrap')).toHaveTextContent('Children')
    expect(screen.getByRole('tooltip')).toHaveTextContent('tooltip')
  })
})
