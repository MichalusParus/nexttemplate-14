import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { NumberInput } from '.'

expect.extend(toHaveNoViolations)

describe('NumberInput', () => {
  it('default', () => {
    render(
      <NumberInput
        className="className"
        name="inputTest"
        placeholder="placeholder"
        onChange={() => {}}
      />,
    )
    const inputWrapTestId = screen.getByTestId('InputWrap')
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(inputWrapTestId).toBeInTheDocument()
    expect(inputWrapTestId).toHaveClass('className')
    expect(numberInputTestId).toHaveAttribute('type', 'text')
    expect(numberInputTestId).toHaveAttribute('id', 'inputTest')
    expect(numberInputTestId).toHaveAttribute('name', 'inputTest')
    expect(numberInputTestId).toHaveAttribute('placeholder', 'placeholder')
    numberInputTestId.focus()
    expect(document.activeElement).toBe(numberInputTestId)
  })

  it('formatingValue', () => {
    render(<NumberInput name="name" value={6666.67} onChange={() => {}} />)
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(numberInputTestId).toHaveValue('6,666.67')
  })

  it('integral', () => {
    render(<NumberInput name="name" value={66.67} allowDecimal={0} onChange={() => {}} />)
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(numberInputTestId).toHaveValue('67')
  })

  it('negative', () => {
    render(<NumberInput name="name" value={-66} allowNegative={true} onChange={() => {}} />)
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(numberInputTestId).toHaveValue('-66')

    fireEvent.blur(numberInputTestId)

    expect(numberInputTestId).toHaveValue('-66')
  })

  it('noGrouping', () => {
    render(
      <NumberInput
        name="name"
        value={6666.67}
        formatOptions={{ useGrouping: false }}
        onChange={() => {}}
      />,
    )
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(numberInputTestId).toHaveValue('6666.67')

    fireEvent.blur(numberInputTestId)

    expect(numberInputTestId).toHaveValue('6666.67')
  })

  it('localized', () => {
    render(<NumberInput name="name" value={6666.67} locale={'cs-CZ'} onChange={() => {}} />)
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(numberInputTestId).toHaveValue('6\u00A0666,67')
  })

  it('minMax', () => {
    const spy = jest.fn()
    render(<NumberInput name="name" value={66} min={5} max={70} onChange={spy} />)
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(numberInputTestId).toHaveValue('66')

    fireEvent.change(numberInputTestId, {
      target: {
        value: 3,
      },
    })
    expect(spy).toHaveBeenCalledWith(5)

    fireEvent.change(numberInputTestId, {
      target: {
        value: 100,
      },
    })
    expect(spy).toHaveBeenCalledWith(70)
  })

  it('startIcon', () => {
    render(
      <NumberInput
        name="inputTest"
        startIcon={<svg data-testid="testSvg" />}
        onChange={() => {}}
      />,
    )
    const svgTestId = screen.getByTestId('testSvg')

    expect(svgTestId).toBeInTheDocument()
  })

  it('endIcon', () => {
    render(
      <NumberInput name="inputTest" endIcon={<svg data-testid="testSvg" />} onChange={() => {}} />,
    )
    const svgTestId = screen.getByTestId('testSvg')

    expect(svgTestId).toBeInTheDocument()
  })

  it('error', () => {
    render(<NumberInput name="inputTest" error="error" onChange={() => {}} />)
    const inputWrapTestId = screen.getByTestId('InputWrap')

    expect(inputWrapTestId).toHaveClass('error')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<NumberInput name="name" value={33} onChange={spy} />)
    const numberInputTestId = screen.getByTestId('NumberInput')

    fireEvent.change(numberInputTestId, {
      target: {
        value: 22,
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(22)
  })

  it('disabled', () => {
    render(<NumberInput name="name" disabled onChange={() => {}} />)
    const numberInputTestId = screen.getByTestId('NumberInput')

    expect(numberInputTestId).toHaveAttribute('disabled')
  })

  it('ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<NumberInput ref={ref} name="inputTest" placeholder="placeholder" onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <NumberInput name="inputTest" placeholder="placeholder" onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
