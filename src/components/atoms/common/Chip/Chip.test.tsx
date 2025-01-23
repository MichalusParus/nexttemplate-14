import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Chip } from '.'

expect.extend(toHaveNoViolations)

describe('Chip', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Chip className="className">Chip</Chip>
      </JestMockProvider>,
    )
    const chipTestId = screen.getByTestId('Chip')

    expect(chipTestId).toBeInTheDocument()
    expect(chipTestId).toHaveClass('className')
    expect(chipTestId).toHaveTextContent('Chip')
  })

  it('title', () => {
    render(
      <JestMockProvider>
        <Chip title="Chip title">Chip info</Chip>
      </JestMockProvider>,
    )
    const titleText = screen.getByText('Chip title')
    const infoText = screen.getByText('Chip info')

    expect(titleText).toBeInTheDocument()
    expect(infoText).toBeInTheDocument()
  })

  it('startIcon', () => {
    render(
      <JestMockProvider>
        <Chip startIcon={<svg role="img" />}>Chip</Chip>
      </JestMockProvider>,
    )
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
  })

  it('buttonIcon', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Chip onClick={spy} buttonProps={{ startIcon: <svg role="img" /> }} />
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalled()
    expect(imgRole).toBeInTheDocument()
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(
      <JestMockProvider>
        <Chip onClick={spy} />
      </JestMockProvider>,
    )
    const buttonRole = screen.getByRole('button')

    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalled()
  })

  it('axe', async () => {
    const { container } = render(
      <JestMockProvider>
        <Chip>Chip</Chip>
      </JestMockProvider>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
