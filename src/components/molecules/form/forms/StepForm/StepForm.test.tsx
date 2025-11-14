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
  it('default', async () => {
    render(<StepForm className="className" currentStep={0} steps={steps} onStepChange={() => {}} />)
    const tabsTestId = screen.getByTestId('Tabs')
    const tablistRole = screen.getByRole('tablist')
    const tabRoles = screen.getAllByRole('tab')
    const tabPanelRoles = screen.getAllByRole('tabpanel')

    expect(tabsTestId).toBeInTheDocument()
    expect(tabsTestId).toHaveClass('className')
    expect(tablistRole).toBeInTheDocument()
    expect(tabRoles).toHaveLength(tabsOptions.length)
    expect(tabRoles[0]).toHaveTextContent(tabsOptions[0].label)
    expect(tabRoles[1]).toHaveTextContent(tabsOptions[1].label)
    expect(tabRoles[2]).toHaveTextContent(tabsOptions[2].label)
    expect(tabRoles[0]).toHaveAttribute('aria-controls', tabPanelRoles[0].getAttribute('id'))
    expect(tabRoles[0]).toHaveClass('selected')
    expect(tabRoles[1]).toHaveAttribute('disabled')
    expect(tabRoles[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabPanelRoles).toHaveLength(1)
    expect(tabPanelRoles[0]).toHaveAttribute('id', tabRoles[0].getAttribute('aria-controls'))
    expect(tabPanelRoles[0]).toHaveAttribute('aria-labelledby', tabRoles[0].getAttribute('id'))
    await act(async () => {
      tabRoles[0].focus()
    })
    expect(document.activeElement).toBe(tabRoles[0])
  })

  it('tabButtonProps/selectProps', async () => {
    render(
      <StepForm
        currentStep={1}
        steps={steps}
        onStepChange={() => {}}
        tabButtonProps={{ className: 'tabButtonClass' }}
        selectProps={{ className: 'selectProps' }}
      />,
    )
    const tabRoles = screen.getAllByRole('tab')
    const selectTestId = screen.getByTestId('TabListSelect')

    expect(tabRoles[0]).toHaveClass('tabButtonClass')
    expect(selectTestId).toHaveClass('selectProps')
  })

  it('onStepChange', async () => {
    const spy = jest.fn()
    render(<StepForm currentStep={1} steps={steps} onStepChange={spy} />)
    const tabRoles = screen.getAllByRole('tab')

    await act(async () => {
      fireEvent.click(tabRoles[0])
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(steps[0].value)
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<StepForm currentStep={1} steps={steps} onStepChange={() => {}} ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
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
