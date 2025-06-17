import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../../.jest/customRender'
import { TextArea } from '.'

expect.extend(toHaveNoViolations)

describe('TextArea', () => {
  it('default', () => {
    render(
      <TextArea
        className="className"
        name="textAreaTest"
        placeholder="placeholder"
        onChange={() => {}}
      />,
    )
    const textAreaWrapTestId = screen.getByTestId('TextAreaWrap')
    const textAreaRole = screen.getByRole('textbox')

    expect(textAreaWrapTestId).toBeInTheDocument()
    expect(textAreaWrapTestId).toHaveClass('className')
    expect(textAreaRole).toHaveAttribute('id', 'textAreaTest')
    expect(textAreaRole).toHaveAttribute('name', 'textAreaTest')
    expect(textAreaRole).toHaveAttribute('placeholder', 'placeholder')
    textAreaRole.focus()
    expect(document.activeElement).toBe(textAreaRole)
  })

  it('value', () => {
    render(<TextArea name="name" value="value" onChange={() => {}} />)
    const textAreaRole = screen.getByRole('textbox')

    expect(textAreaRole).toHaveValue('value')
  })

  it('error', () => {
    render(<TextArea name="name" error="error" onChange={() => {}} />)
    const textAreaWrapTestId = screen.getByTestId('TextAreaWrap')

    expect(textAreaWrapTestId).toHaveClass('error')
  })

  it('onChange', () => {
    const spy = jest.fn()
    render(<TextArea name="name" value="value" onChange={spy} />)
    const textAreaRole = screen.getByRole('textbox')

    fireEvent.change(textAreaRole, {
      target: {
        value: 'newvalue',
      },
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('newvalue')
  })

  it('disabled', () => {
    render(<TextArea name="name" value="" disabled onChange={() => {}} />)
    const textAreaRole = screen.getByRole('textbox')

    expect(textAreaRole).toHaveAttribute('disabled', '')
  })

  it('ref', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<TextArea ref={ref} name="textAreaTest" placeholder="placeholder" onChange={() => {}} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <TextArea name="textAreaTest" placeholder="placeholder" onChange={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
