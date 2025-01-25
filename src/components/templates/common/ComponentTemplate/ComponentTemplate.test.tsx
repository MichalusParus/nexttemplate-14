import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { ComponentTemplate } from '.'

expect.extend(toHaveNoViolations)

describe('ComponentTemplate', () => {
  it('default', () => {
    render(<ComponentTemplate className="className">Children</ComponentTemplate>)
    const componentTemplateTestId = screen.getByTestId('ComponentTemplate')

    expect(componentTemplateTestId).toBeInTheDocument()
    expect(componentTemplateTestId).toHaveClass('className')
    expect(componentTemplateTestId).toHaveTextContent('Children')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<ComponentTemplate ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<ComponentTemplate />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
