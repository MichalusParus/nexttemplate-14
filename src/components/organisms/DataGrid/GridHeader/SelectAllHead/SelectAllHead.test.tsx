import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { SelectAllHead } from '.'

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    query: {},
  }
  return {
    useRouter: jest.fn().mockReturnValue(router),
  }
})

describe('SelectAllHead', () => {
  it('default', () => {
    render(<SelectAllHead className="className" name="SelectAllHeadTest" handleAll={() => {}} />)
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
    expect(screen.getByRole('columnheader')).toHaveClass('className')
    expect(screen.getByTestId('Checkbox')).toBeInTheDocument()
  })

  it('handleAll', () => {
    const spy = jest.fn()
    render(<SelectAllHead className="className" name="SelectAllHeadTest" handleAll={spy} />)
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('columnheader'))
    expect(spy).toHaveBeenCalled()
  })
})
