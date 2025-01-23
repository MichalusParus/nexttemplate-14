import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Overlay } from '.'

expect.extend(toHaveNoViolations)

describe('Overlay', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Overlay isOpen={false} onClose={() => {}} className="className" />
      </JestMockProvider>,
    )
    const overlayTestId = screen.getByTestId('Overlay')

    expect(overlayTestId).toBeInTheDocument()
    expect(overlayTestId).toHaveClass('className')
    expect(overlayTestId).toHaveAttribute('type', 'button')
  })

  it('onClose', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Overlay isOpen={false} onClose={spy} />
      </JestMockProvider>,
    )
    const overlayTestId = screen.getByTestId('Overlay')

    fireEvent.click(overlayTestId)
    expect(spy).toHaveBeenCalled()
  })

  it('axe', async () => {
    const { container } = render(
      <JestMockProvider>
        <Overlay isOpen={false} onClose={() => {}} />
      </JestMockProvider>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
