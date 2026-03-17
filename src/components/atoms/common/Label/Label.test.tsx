import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { Label } from '.'

expect.extend(toHaveNoViolations)

describe('Label', () => {
  describe('Semantics', () => {
    it('renders as label with htmlFor', () => {
      render(<Label name="labelTest" label="label" />)
      const label = screen.getByTestId('Label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('label')
      expect(label).toHaveAttribute('for', 'labelTest')
      expect(label).toHaveAttribute('id', 'labelTest-label')
    })

    it('forwards className to wrapper', () => {
      render(<Label name="labelTest" label="label" className="className" />)
      const wrapper = screen.getByTestId('LabelWrap')

      expect(wrapper).toHaveClass('className')
    })

    it('forwards width to wrapper', () => {
      render(<Label name="labelTest" label="label" width="w-96" />)
      const wrapper = screen.getByTestId('LabelWrap')

      expect(wrapper).toHaveClass('w-96')
    })

    it('default width is w-full', () => {
      render(<Label name="labelTest" label="label" />)
      const wrapper = screen.getByTestId('LabelWrap')

      expect(wrapper).toHaveClass('w-full')
    })

    it('Alert hidden when no error or description', () => {
      render(<Label name="labelTest" label="label" />)
      const alert = screen.getByTestId('Alert')

      expect(alert).toBeInTheDocument()
      expect(alert).toHaveAttribute('aria-hidden', 'true')
      expect(alert).toHaveClass('opacity-0')
    })

    it('error shown with role alert', () => {
      render(<Label name="labelTest" label="label" error="error" />)
      const alert = screen.getByRole('alert')

      expect(alert).toBeInTheDocument()
      expect(alert).toHaveTextContent('error')
      expect(alert).toHaveAttribute('id', 'labelTest-description')
    })

    it('error takes priority over description', () => {
      render(
        <Label
          name="labelTest"
          label="label"
          error="error"
          description="description"
        />,
      )
      const alert = screen.getByRole('alert')

      expect(alert).toHaveTextContent('error')
    })

    it('description shown in Alert', () => {
      render(<Label name="labelTest" label="label" description="description" />)
      const alert = screen.getByTestId('Alert')

      expect(alert).toBeInTheDocument()
      expect(alert).toHaveTextContent('description')
      expect(alert).toHaveAttribute('id', 'labelTest-description')
    })

    it('variant div renders div', () => {
      render(<Label name="labelTest" label="label" variant="div" />)
      const label = screen.queryByTestId('Label')
      const fakeLabel = screen.getByTestId('FakeLabel')

      expect(label).toBeNull()
      expect(fakeLabel).toBeInTheDocument()
      expect(fakeLabel).toHaveTextContent('label')
      expect(fakeLabel).toHaveAttribute('id', 'labelTest-label')
      expect(fakeLabel.tagName).toBe('DIV')
    })

    it('variant legend renders legend', () => {
      render(<Label name="labelTest" label="label" variant="legend" />)
      const label = screen.queryByTestId('Label')
      const legendElement = screen.getByTestId('FakeLabel')

      expect(label).toBeNull()
      expect(legendElement).toBeInTheDocument()
      expect(legendElement).toHaveTextContent('label')
      expect(legendElement).toHaveAttribute('id', 'labelTest-label')
      expect(legendElement.tagName).toBe('LEGEND')
    })

    it('hideLabel adds sr-only class', () => {
      render(<Label name="labelTest" label="label" hideLabel />)
      const label = screen.getByTestId('Label')

      expect(label).toBeInTheDocument()
      expect(label).toHaveTextContent('label')
      expect(label).toHaveClass('sr-only')
    })

    it('hideError adds hidden class', () => {
      render(<Label name="labelTest" label="label" error="error" hideError />)
      const alert = screen.getByRole('alert')

      expect(alert).toBeInTheDocument()
      expect(alert).toHaveTextContent('error')
      expect(alert).toHaveClass('hidden')
    })

    it('renders children', () => {
      render(
        <Label name="labelTest" label="label">
          <input id="labelTest" data-testid="child-input" />
        </Label>,
      )
      const child = screen.getByTestId('child-input')

      expect(child).toBeInTheDocument()
    })
  })

  describe('Ref', () => {
    it('forwards ref', () => {
      const ref = createRef<HTMLLabelElement>()
      render(<Label ref={ref} name="labelTest" label="label" />)

      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(<Label name="labelTest" label="label" />)

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
