import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { tabsOptions } from '../../../../../../.storybook/helpers'
import { StepForm } from './StepForm'

expect.extend(toHaveNoViolations)

jest.mock('next/navigation', () => ({
  usePathname: () => ({ get: () => 'label1' }),
  useRouter: () => ({
    push: () => {},
  }),
  useSearchParams: () => ({
    get: () => null,
    toString: () => '',
  }),
}))

const steps = tabsOptions.map((tab, i) => ({ ...tab, value: i }))

describe('StepForm', () => {
  describe('Semantics', () => {
    it('renders Tabs wrapper', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)

      expect(screen.getByTestId('Tabs')).toBeInTheDocument()
    })

    it('forwards className', () => {
      render(<StepForm className="className" currentStep={0} steps={steps} onStepChange={() => {}} />)

      expect(screen.getByTestId('Tabs')).toHaveClass('className')
    })

    it('renders tablist', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)

      expect(screen.getByRole('tablist')).toBeInTheDocument()
    })

    it('renders correct number of tabs', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)

      expect(screen.getAllByRole('tab')).toHaveLength(steps.length)
    })

    it('tabs display step labels', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveTextContent(tabsOptions[0].label)
      expect(tabs[1]).toHaveTextContent(tabsOptions[1].label)
      expect(tabs[2]).toHaveTextContent(tabsOptions[2].label)
    })

    it('tab aria-controls links to panel', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')
      const panel = screen.getByRole('tabpanel')

      expect(tabs[0]).toHaveAttribute('aria-controls', panel.getAttribute('id'))
    })

    it('selected tab has selected class', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveAttribute('data-selected')
    })

    it('selected tab has aria-selected true', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    })

    it('future steps are disabled', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      expect(tabs[1]).toHaveAttribute('aria-disabled', 'true')
      expect(tabs[2]).toHaveAttribute('aria-disabled', 'true')
    })

    it('past steps remain enabled', () => {
      render(<StepForm currentStep={1} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).not.toHaveAttribute('aria-disabled', 'true')
      expect(tabs[1]).not.toHaveAttribute('aria-disabled', 'true')
      expect(tabs[2]).toHaveAttribute('aria-disabled', 'true')
    })

    it('renders only active panel', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)

      expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
    })

    it('panel aria-labelledby matches tab id', () => {
      render(<StepForm currentStep={0} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')
      const panel = screen.getByRole('tabpanel')

      expect(panel).toHaveAttribute('id', tabs[0].getAttribute('aria-controls'))
      expect(panel).toHaveAttribute('aria-labelledby', tabs[0].getAttribute('id'))
    })

    it('tabButtonProps forwards className', () => {
      render(
        <StepForm
          currentStep={1}
          steps={steps}
          onStepChange={() => {}}
          tabButtonProps={{ className: 'tabButtonClass' }}
        />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveClass('tabButtonClass')
    })

    it('selectProps forwards className', () => {
      render(
        <StepForm
          currentStep={1}
          steps={steps}
          onStepChange={() => {}}
          selectProps={{ className: 'selectProps' }}
        />,
      )

      expect(screen.getByTestId('TabListSelect')).toHaveClass('selectProps')
    })

    it('returns null for invalid currentStep', () => {
      const { container } = render(<StepForm currentStep={99} steps={steps} onStepChange={() => {}} />)

      expect(container.innerHTML).toBe('')
    })

    it('returns null for empty steps', () => {
      const { container } = render(<StepForm currentStep={0} steps={[]} onStepChange={() => {}} />)

      expect(container.innerHTML).toBe('')
    })
  })

  describe('Keyboard', () => {
    it('tab focuses step tab', async () => {
      render(<StepForm currentStep={2} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        tabs[0].focus()
      })
      expect(document.activeElement).toBe(tabs[0])
    })

    it('ArrowRight moves focus to next enabled tab', async () => {
      render(<StepForm currentStep={2} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        tabs[0].focus()
      })
      await act(async () => {
        fireEvent.keyDown(tabs[0], { key: 'ArrowRight', code: 'ArrowRight' })
      })
      expect(document.activeElement).toBe(tabs[1])
    })

    it('ArrowRight wraps to first tab', async () => {
      render(<StepForm currentStep={2} steps={steps} onStepChange={() => {}} />)
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        tabs[2].focus()
      })
      await act(async () => {
        fireEvent.keyDown(tabs[2], { key: 'ArrowRight', code: 'ArrowRight' })
      })
      expect(document.activeElement).toBe(tabs[0])
    })
  })

  describe('Interaction', () => {
    it('click fires onStepChange with step value', async () => {
      const onStepChange = jest.fn()
      render(<StepForm currentStep={1} steps={steps} onStepChange={onStepChange} />)
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        fireEvent.click(tabs[0])
      })
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenCalledWith(steps[0].value)
    })

    it('click on disabled tab does not fire onStepChange', async () => {
      const onStepChange = jest.fn()
      render(<StepForm currentStep={0} steps={steps} onStepChange={onStepChange} />)
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        fireEvent.click(tabs[1])
      })
      expect(onStepChange).not.toHaveBeenCalled()
    })
  })

  describe('Ref', () => {
    it('exposes HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(<StepForm currentStep={1} steps={steps} onStepChange={() => {}} ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
      const { container } = render(
        <StepForm
          currentStep={0}
          steps={steps}
          onStepChange={() => {}}
          selectProps={{ title: 'title' }}
        />,
      )

      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
