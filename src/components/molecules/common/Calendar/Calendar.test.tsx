import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Calendar } from '.'

describe('Calendar', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Calendar date={new Date()} className="className" onChange={() => {}} />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Calendar')).toBeTruthy()
    expect(screen.getByTestId('Calendar')).toHaveClass('className')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Calendar date={new Date()} className="className" onChange={spy} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(spy).toHaveBeenCalled()
  })
})
