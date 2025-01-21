import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../../.storybook/helpers'
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
    render(
      <JestMockProvider>
        <SelectAllHead className="className" name="SelectAllHeadTest" handleAll={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
    expect(screen.getByRole('columnheader')).toHaveClass('className')
    expect(screen.getByTestId('Checkbox')).toBeInTheDocument()
  })

  it('handleAll', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <SelectAllHead className="className" name="SelectAllHeadTest" handleAll={spy} />
      </JestMockProvider>,
    )
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('columnheader'))
    expect(spy).toHaveBeenCalled()
  })
})
