import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { Chip } from '.'

expect.extend(toHaveNoViolations)

describe('Chip', () => {
  it('default', () => {
    render(<Chip className="className">Chip</Chip>)
    const chipTestId = screen.getByTestId('Chip')

    expect(chipTestId).toBeInTheDocument()
    expect(chipTestId).toHaveClass('className')
    expect(chipTestId).toHaveTextContent('Chip')
  })

  it('title', () => {
    render(<Chip title="Chip title">Chip info</Chip>)
    const titleText = screen.getByText('Chip title')
    const infoText = screen.getByText('Chip info')

    expect(titleText).toBeInTheDocument()
    expect(infoText).toBeInTheDocument()
  })

  it('startIcon', () => {
    render(<Chip startIcon={<svg role="img" />}>Chip</Chip>)
    const imgRole = screen.getByRole('img')

    expect(imgRole).toBeInTheDocument()
  })

  it('buttonIcon', () => {
    const spy = jest.fn()
    render(<Chip onClick={spy} buttonProps={{ startIcon: <svg role="img" /> }} />)
    const buttonRole = screen.getByRole('button')
    const imgRole = screen.getByRole('img')

    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalled()
    expect(imgRole).toBeInTheDocument()
  })

  it('onClick', () => {
    const spy = jest.fn()
    render(<Chip onClick={spy} />)
    const buttonRole = screen.getByRole('button')

    buttonRole.focus()
    expect(document.activeElement).toBe(buttonRole)
    fireEvent.click(buttonRole)
    expect(spy).toHaveBeenCalled()
  })

  it('buttonProps', () => {
    const spy = jest.fn()
    render(<Chip onClick={spy} buttonProps={{ className: 'className' }} />)
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toHaveClass('className')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Chip ref={ref}>Chip</Chip>)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Chip>Chip</Chip>)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
