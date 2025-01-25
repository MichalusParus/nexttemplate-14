import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Calendar } from '.'

describe('Calendar', () => {
  it('default', () => {
    render(<Calendar date={new Date()} className="className" onChange={() => {}} />)
    expect(screen.getByTestId('Calendar')).toBeInTheDocument()
    expect(screen.getByTestId('Calendar')).toHaveClass('className')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<Calendar date={new Date()} className="className" onChange={spy} />)
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(spy).toHaveBeenCalled()
  })
})
