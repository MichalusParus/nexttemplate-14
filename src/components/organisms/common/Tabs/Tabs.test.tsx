import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { tabs } from '../../../../../.storybook/helpers'
import { Tabs } from '.'

expect.extend(toHaveNoViolations)

jest.mock('next/navigation', () => ({
  usePathname: () => ({ get: () => 'label1' }),
  useRouter: () => ({
    push: () => {},
  }),
}))

describe('Tabs', () => {
  it('default', () => {
    render(<Tabs className="className" name="tabsTest" selectedValue={tabs[0].value} tabs={tabs} />)
    const tabsTestId = screen.getByTestId('Tabs')
    const tablistRole = screen.getByRole('tablist')
    const tabRoles = screen.getAllByRole('tab')
    const tabPanelRole = screen.getByRole('tabpanel')

    expect(tabsTestId).toBeInTheDocument()
    expect(tabsTestId).toHaveClass('className')
    expect(tablistRole).toBeInTheDocument()
    expect(tabRoles).toHaveLength(tabs.length)
    expect(tabRoles[0]).toHaveTextContent(tabs[0].label)
    expect(tabRoles[1]).toHaveTextContent(tabs[1].label)
    expect(tabRoles[2]).toHaveTextContent(tabs[2].label)
    expect(tabRoles[0]).toHaveAttribute('aria-controls', tabPanelRole.getAttribute('id'))
    expect(tabRoles[0]).toHaveClass('selected')
    expect(tabRoles[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabPanelRole).toBeInTheDocument()
    expect(tabPanelRole).toHaveAttribute('id', tabRoles[0].getAttribute('aria-controls'))
    expect(tabPanelRole).toHaveAttribute('aria-labelledby', tabRoles[0].getAttribute('id'))
    tabRoles[0].focus()
    expect(document.activeElement).toBe(tabRoles[0])
  })

  it('selectedValue', () => {
    render(<Tabs name="tabsTest" selectedValue={tabs[2].value} tabs={tabs} />)
    const tabRoles = screen.getAllByRole('tab')
    const tabPanelText = screen.getByText('Content 3')

    expect(tabRoles[2]).toHaveClass('selected')
    expect(tabRoles[2]).toHaveAttribute('aria-selected', 'true')
    expect(tabPanelText).toBeInTheDocument()
  })

  it('fullWidth', () => {
    render(<Tabs name="tabsTest" selectedValue={tabs[0].value} tabs={tabs} fullWidth />)
    const liTestIds = screen.getAllByTestId('tabLi')
    const tabRoles = screen.getAllByRole('tab')

    expect(liTestIds[0]).toHaveClass('w-full')
    expect(tabRoles[0]).toHaveClass('w-full')
  })

  it('tabButtonProps/buttonProps/dropdownProps', () => {
    render(
      <Tabs
        name="tabsTest"
        selectedValue={tabs[0].value}
        tabs={tabs}
        tabButtonProps={{ className: 'tabButtonClass' }}
        buttonProps={{ className: 'buttonClass' }}
        dropdownProps={{ className: 'dropdownClass' }}
      />,
    )
    const tabRoles = screen.getAllByRole('tab')
    const buttonRoles = screen.getAllByRole('button')
    const dropdownTestId = screen.getByTestId('Dropdown')

    expect(tabRoles[0]).toHaveClass('tabButtonClass')
    expect(buttonRoles[0]).toHaveClass('buttonClass')
    expect(dropdownTestId).toHaveClass('dropdownClass')
  })

  it('onTabChange', () => {
    const spy = jest.fn()
    render(<Tabs name="tabsTest" selectedValue={tabs[0].value} tabs={tabs} onTabChange={spy} />)
    const tabRoles = screen.getAllByRole('tab')

    fireEvent.click(tabRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(tabs[0].value)
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Tabs ref={ref} name="tabsTest" selectedValue="label1" tabs={tabs} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(<Tabs name="tabsTest" selectedValue="label1" tabs={tabs} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
