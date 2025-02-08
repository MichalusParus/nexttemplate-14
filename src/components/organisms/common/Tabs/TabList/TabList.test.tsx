import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { tabs } from '../../../../../../.storybook/helpers'
import { TabList } from '.'

expect.extend(toHaveNoViolations)

describe('TabList', () => {
  it('default', () => {
    render(
      <TabList className="className" selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}} />,
    )
    const paperWrapTestId = screen.getByTestId('Paper')
    const tablistRole = screen.getByRole('tablist')
    const tabRoles = screen.getAllByRole('tab')

    expect(paperWrapTestId).toBeInTheDocument()
    expect(paperWrapTestId).toHaveClass('className')
    expect(tablistRole).toBeInTheDocument()
    expect(tabRoles).toHaveLength(tabs.length)
    expect(tabRoles[0]).toHaveTextContent(tabs[0].label)
    expect(tabRoles[1]).toHaveTextContent(tabs[1].label)
    expect(tabRoles[2]).toHaveTextContent(tabs[2].label)
    expect(tabRoles[0]).toHaveAttribute('aria-controls', 'tab-tabpanel')
    expect(tabRoles[0]).toHaveClass('selected')
    expect(tabRoles[0]).toHaveAttribute('aria-selected', 'true')
    tabRoles[0].focus()
    expect(document.activeElement).toBe(tabRoles[0])
  })

  it('hidden', () => {
    render(
      <TabList
        selectedTab={tabs[0]}
        tabs={tabs.map((tab, i) => ({ ...tab, isHidden: i === 0 })).filter(tab => !tab.isHidden)}
        onTabChange={() => {}}
      />,
    )
    const tabsQuery = screen.queryAllByRole('tab')
    const firstTabText = screen.queryByText(tabs[0].label)

    expect(tabsQuery).toHaveLength(tabs.length - 1)
    expect(firstTabText).toBeNull()
    expect(tabsQuery[0]).toHaveTextContent(tabs[1].label)
    expect(tabsQuery[1]).toHaveTextContent(tabs[2].label)
  })

  it('fullWidth', () => {
    render(<TabList selectedTab={tabs[0]} tabs={tabs} fullWidth onTabChange={() => {}} />)
    const liTestIds = screen.getAllByTestId('tabLi')
    const tabRoles = screen.getAllByRole('tab')

    expect(liTestIds[0]).toHaveClass('w-full')
    expect(tabRoles[0]).toHaveClass('w-full')
  })

  it('children', () => {
    render(
      <TabList selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}}>
        <li>
          <button>button</button>
        </li>
      </TabList>,
    )
    const buttonRole = screen.getByRole('button')

    expect(buttonRole).toBeInTheDocument()
  })

  it('onTabChange', () => {
    const spy = jest.fn()
    render(<TabList selectedTab={tabs[0]} tabs={tabs} onTabChange={spy} />)
    const tabRoles = screen.getAllByRole('tab')

    fireEvent.click(tabRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(tabs[0].value)
  })

  it('tabButtonProps', () => {
    render(
      <TabList
        selectedTab={tabs[0]}
        tabs={tabs}
        tabButtonProps={{ className: 'className' }}
        onTabChange={() => {}}
      />,
    )
    const tabRoles = screen.getAllByRole('tab')

    expect(tabRoles[0]).toHaveClass('className')
  })

  it('axe', async () => {
    const { container } = render(
      <>
        <TabList selectedTab={tabs[0]} tabs={tabs} onTabChange={() => {}} />,
        <div id="tab-tabpanel">TabPanel</div>
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
