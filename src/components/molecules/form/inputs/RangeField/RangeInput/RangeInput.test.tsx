import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { RangeInput } from './RangeInput'

describe('RangeInput', () => {
  it('default', () => {
    render(
      <RangeInput className="className" name="rangeTest" min={30} max={60} onChange={() => {}} />,
    )
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByRole('slider')).toHaveClass('className')
    expect(screen.getByRole('slider')).toHaveAttribute('id', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('name', 'rangeTest')
    expect(screen.getByRole('slider')).toHaveAttribute('type', 'range')
    expect(screen.getByRole('slider')).toHaveAttribute('min', '30')
    expect(screen.getByRole('slider')).toHaveAttribute('max', '60')
  })

  it('value', () => {
    render(<RangeInput className="className" name="rangeTest" value="50" onChange={() => {}} />)
    expect(screen.getByRole('slider')).toHaveAttribute('value', '50')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<RangeInput className="className" name="rangeTest" onChange={spy} />)
    fireEvent.change(screen.getByRole('slider'), {
      target: {
        value: 50,
      },
    })
    expect(spy).toHaveBeenCalledWith('50')
  })

  it('disabled', () => {
    render(<RangeInput className="className" name="rangeTest" disabled onChange={() => {}} />)
    expect(screen.getByRole('slider')).toHaveAttribute('disabled', '')
  })
})
