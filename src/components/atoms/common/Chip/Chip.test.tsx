import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Chip } from '.'

describe('Chip', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Chip className="className">Chip</Chip>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Chip')).toBeTruthy()
    expect(screen.getByTestId('Chip')).toHaveClass('className')
  })

  it('title', () => {
    render(
      <JestMockProvider>
        <Chip title="Chip title">Chip info</Chip>
      </JestMockProvider>,
    )
    expect(screen.getAllByTestId('Span')[0]).toHaveTextContent('Chip title')
    expect(screen.getAllByTestId('Span')[1]).toHaveTextContent('Chip info')
  })

  it('startIcon', () => {
    render(
      <JestMockProvider>
        <Chip startIcon={<svg data-testid="testSvg" />}>Chip</Chip>
      </JestMockProvider>,
    )
    expect(screen.getByTestId('testSvg')).toBeVisible()
    expect(screen.getByTestId('Chip')).toHaveTextContent('Chip')
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Chip onClick={spy} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })

  it('buttonIcon', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Chip onClick={spy} buttonIcon={<svg data-testid="testSvg" />} />
      </JestMockProvider>,
    )
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
    expect(screen.getByTestId('testSvg')).toBeVisible()
  })
})
