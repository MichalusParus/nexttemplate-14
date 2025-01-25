import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { ProgressBar } from '.'

describe('ProgressBar', () => {
  it('default', () => {
    render(<ProgressBar className="className" />)
    expect(screen.getByTestId('ProgressBar')).toBeInTheDocument()
    expect(screen.getByTestId('ProgressBar')).toHaveClass('className')
  })
})
