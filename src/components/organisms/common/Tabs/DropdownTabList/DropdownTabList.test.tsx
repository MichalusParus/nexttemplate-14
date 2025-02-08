import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { tabs } from '../../../../../../.storybook/helpers'
import { DropdownTabList } from '.'

expect.extend(toHaveNoViolations)

describe('DropdownTabList', () => {
  it('default', () => {
    render(
      <DropdownTabList
        className="className"
        selectedTab={tabs[0]}
        tabs={tabs}
        onTabChange={() => {}}
      />,
    )
    const dropdownTabListWrapTestId = screen.getByTestId('DropdownTabListWrap')
    const buttonRoles = screen.getAllByRole('button')
    const tablistQuery = screen.queryByRole('tablist')
    const tabsQuery = screen.queryAllByRole('tab')

    expect(dropdownTabListWrapTestId).toBeInTheDocument()
    expect(dropdownTabListWrapTestId).toHaveClass('className')
    expect(buttonRoles[0]).toBeInTheDocument()
    expect(buttonRoles[0]).toHaveTextContent(tabs[0].label)
    expect(buttonRoles[0]).toHaveAttribute('aria-expanded', 'false')
    expect(buttonRoles[0]).toHaveAttribute('aria-controls', 'tab-tablist')
    expect(buttonRoles[0]).toHaveAttribute('aria-owns', 'tab-tablist')
    expect(buttonRoles[0]).toHaveAttribute('aria-haspopup', 'listbox')
    expect(tablistQuery).toBeNull()
    expect(tabsQuery).toHaveLength(0)
    buttonRoles[0].focus()
    expect(document.activeElement).toBe(buttonRoles[0])
  })

  it('open/close', () => {
    render(<DropdownTabList selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}} />)
    const buttonRoles = screen.getAllByRole('button')
    fireEvent.click(buttonRoles[0])
    const dropdownTestId = screen.getByTestId('Dropdown')
    const tablistQuery = screen.queryByRole('tablist')
    const tabsQuery = screen.queryAllByRole('tab')

    expect(tablistQuery).toBeInTheDocument()
    expect(tablistQuery).toHaveAttribute('aria-hidden', 'false')
    expect(tabsQuery).toHaveLength(tabs.length)
    expect(buttonRoles[0]).toBeInTheDocument()
    expect(buttonRoles[0]).toHaveTextContent(tabs[0].label)
    expect(buttonRoles[0]).toHaveAttribute('aria-expanded', 'true')
    expect(dropdownTestId).toBeInTheDocument()
    expect(tabsQuery[0]).toHaveTextContent(tabs[0].label)
    expect(tabsQuery[1]).toHaveTextContent(tabs[1].label)
    expect(tabsQuery[2]).toHaveTextContent(tabs[2].label)
    expect(tabsQuery[0]).toHaveAttribute('aria-controls', 'tab-tabpanel')
    expect(tabsQuery[0]).toHaveClass('selected')
    expect(tabsQuery[0]).toHaveAttribute('aria-selected', 'true')
    tabsQuery[0].focus()
    expect(document.activeElement).toBe(tabsQuery[0])
    fireEvent.click(buttonRoles[0])
    expect(tablistQuery).toHaveAttribute('aria-hidden', 'true')
  })

  it('hidden', () => {
    render(
      <DropdownTabList
        selectedTab={tabs[1]}
        tabs={tabs.map((tab, i) => ({ ...tab, isHidden: i === 0 })).filter(tab => !tab.isHidden)}
        onTabChange={() => {}}
      />,
    )
    const buttonRoles = screen.getAllByRole('button')
    fireEvent.click(buttonRoles[0])
    const tabsQuery = screen.queryAllByRole('tab')
    const firstTabText = screen.queryByText(tabs[0].label)

    expect(tabsQuery).toHaveLength(tabs.length - 1)
    expect(firstTabText).toBeNull()
    expect(tabsQuery[0]).toHaveTextContent(tabs[1].label)
    expect(tabsQuery[1]).toHaveTextContent(tabs[2].label)
  })

  it('children', () => {
    render(
      <DropdownTabList selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}}>
        <li>
          <button data-testid="button">button</button>
        </li>
      </DropdownTabList>,
    )
    const buttonRoles = screen.getAllByRole('button')
    fireEvent.click(buttonRoles[0])
    const buttonTestId = screen.getByTestId('button')

    expect(buttonTestId).toBeInTheDocument()
  })

  it('onTabChange', () => {
    const spy = jest.fn()
    render(<DropdownTabList selectedTab={tabs[0]} tabs={tabs} onTabChange={spy} />)
    const buttonRoles = screen.getAllByRole('button')
    fireEvent.click(buttonRoles[0])
    const tabRoles = screen.getAllByRole('tab')

    fireEvent.click(tabRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(tabs[0].value)
  })

  it('tabButtonProps/buttonProps/dropdownProps', () => {
    render(
      <DropdownTabList
        selectedTab={tabs[0]}
        tabs={tabs}
        tabButtonProps={{ className: 'tabButtonClass' }}
        buttonProps={{ className: 'buttonClass' }}
        dropdownProps={{ className: 'dropdownClass' }}
        onTabChange={() => {}}
      />,
    )
    const buttonRoles = screen.getAllByRole('button')
    fireEvent.click(buttonRoles[0])
    const tabRoles = screen.getAllByRole('tab')
    const dropdownTestId = screen.getByTestId('Dropdown')

    expect(tabRoles[0]).toHaveClass('tabButtonClass')
    expect(buttonRoles[0]).toHaveClass('buttonClass')
    expect(dropdownTestId).toHaveClass('dropdownClass')
  })

  it('axe', async () => {
    const { container } = render(
      <>
        <DropdownTabList selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}} />,
        <div id="tab-tabpanel">TabPanel</div>
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
