import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Label } from '.'

expect.extend(toHaveNoViolations)

describe('Label', () => {
  it('default', () => {
    render(<Label name="labelTest" label="label" className="className" width="w-96" />)
    const labelWrapTestId = screen.getByTestId('LabelWrap')
    const labelTestId = screen.getByTestId('Label')
    const alertTestId = screen.getByTestId('Alert')

    expect(labelWrapTestId).toBeInTheDocument()
    expect(labelWrapTestId).toHaveClass('className')
    expect(labelWrapTestId).toHaveClass('w-96')
    expect(labelTestId).toBeInTheDocument()
    expect(labelTestId).toHaveTextContent('label')
    expect(labelTestId).toHaveAttribute('for', 'labelTest')
    expect(labelTestId).toHaveAttribute('id', 'labelTest-label')
    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveAttribute('aria-hidden', 'true')
    expect(alertTestId).toHaveClass('opacity-0')
  })

  it('error', () => {
    render(
      <Label
        name="labelTest"
        label="label"
        className="className"
        error="error"
        description="description"
      />,
    )
    const alertRole = screen.getByRole('alert')

    expect(alertRole).toBeInTheDocument()
    expect(alertRole).toHaveTextContent('error')
    expect(alertRole).toHaveAttribute('id', 'labelTest-description')
  })

  it('description', () => {
    render(<Label name="labelTest" label="label" className="className" description="description" />)
    const alertTestId = screen.getByTestId('Alert')

    expect(alertTestId).toBeInTheDocument()
    expect(alertTestId).toHaveTextContent('description')
    expect(alertTestId).toHaveAttribute('id', 'labelTest-description')
  })

  it('fake', () => {
    render(<Label name="labelTest" label="label" fakeLabel />)
    const labelQuery = screen.queryByTestId('Label')
    const fakeLabelTestId = screen.getByTestId('FakeLabel')

    expect(labelQuery).toBeNull()
    expect(fakeLabelTestId).toBeInTheDocument()
    expect(fakeLabelTestId).toHaveTextContent('label')
    expect(fakeLabelTestId).toHaveAttribute('id', 'labelTest-label')
  })

  it('hideLabel', () => {
    render(<Label name="labelTest" label="label" hideLabel />)
    const labelTestId = screen.getByTestId('Label')

    expect(labelTestId).toBeInTheDocument()
    expect(labelTestId).toHaveTextContent('label')
    expect(labelTestId).toHaveClass('hidden')
  })

  it('hideError', () => {
    render(<Label name="labelTest" label="label" error="error" hideError />)
    const alertRole = screen.getByRole('alert')

    expect(alertRole).toBeInTheDocument()
    expect(alertRole).toHaveTextContent('error')
    expect(alertRole).toHaveClass('hidden')
  })

  it('ref', () => {
    const ref = createRef<HTMLLabelElement>()
    render(<Label ref={ref} name="labelTest" label="label" />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Label name="labelTest" label="label" />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
