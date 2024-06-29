import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Tooltip from '.'

describe('Tooltip', () => {
  it('default', () => {
    render(<Tooltip title="tooltip" className="className" />)
    expect(screen.getByRole('tooltip')).toBeTruthy()
    expect(screen.getByTestId('TooltipWrap')).toHaveClass('className')
  })
})
