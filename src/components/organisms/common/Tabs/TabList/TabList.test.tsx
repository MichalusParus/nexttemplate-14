import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { tabsOptions } from '../../../../../../.storybook/helpers'
import { TabList } from '.'

expect.extend(toHaveNoViolations)

describe('TabList', () => {
  it('default', () => {
    render(
      <TabList
        className="className"
        selectedTab={tabsOptions[0]}
        tabs={tabsOptions}
        onTabChange={() => {}}
      />,
    )
    const paperWrapTestId = screen.getByTestId('Paper')
    const tablistRole = screen.getByRole('tablist')
    const tabRoles = screen.getAllByRole('tab')

    expect(paperWrapTestId).toBeInTheDocument()
    expect(paperWrapTestId).toHaveClass('className')
    expect(tablistRole).toBeInTheDocument()
    expect(tablistRole).toHaveAttribute('aria-orientation', 'horizontal')
    expect(tabRoles).toHaveLength(tabsOptions.length)
    expect(tabRoles[0]).toHaveTextContent(tabsOptions[0].label)
    expect(tabRoles[1]).toHaveTextContent(tabsOptions[1].label)
    expect(tabRoles[2]).toHaveTextContent(tabsOptions[2].label)
    expect(tabRoles[0]).toHaveAttribute('aria-controls', `${tabsOptions[0].value}-tabpanel`)
    expect(tabRoles[0]).toHaveClass('selected')
    expect(tabRoles[0]).toHaveAttribute('aria-selected', 'true')
    tabRoles[0].focus()
    expect(document.activeElement).toBe(tabRoles[0])
  })

  it('hidden', () => {
    render(
      <TabList
        selectedTab={tabsOptions[0]}
        tabs={tabsOptions
          .map((tab, i) => ({ ...tab, isHidden: i === 0 }))
          .filter(tab => !tab.isHidden)}
        onTabChange={() => {}}
      />,
    )
    const tabsQuery = screen.queryAllByRole('tab')
    const firstTabText = screen.queryByText(tabsOptions[0].label)

    expect(tabsQuery).toHaveLength(tabsOptions.length - 1)
    expect(firstTabText).toBeNull()
    expect(tabsQuery[0]).toHaveTextContent(tabsOptions[1].label)
    expect(tabsQuery[1]).toHaveTextContent(tabsOptions[2].label)
  })

  it('fullWidth', () => {
    render(
      <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} fullWidth onTabChange={() => {}} />,
    )
    const liTestIds = screen.getAllByTestId('tabLi')
    const tabRoles = screen.getAllByRole('tab')

    expect(liTestIds[0]).toHaveClass('w-full')
    expect(tabRoles[0]).toHaveClass('w-full')
  })

  it('children', () => {
    render(
      <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}}>
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
    render(<TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={spy} />)
    const tabRoles = screen.getAllByRole('tab')

    fireEvent.click(tabRoles[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(tabsOptions[0].value)
  })

  it('tabButtonProps', () => {
    render(
      <TabList
        selectedTab={tabsOptions[0]}
        tabs={tabsOptions}
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
        <TabList selectedTab={tabsOptions[0]} tabs={tabsOptions} onTabChange={() => {}} />,
        <div id={`${tabsOptions[0].value}-tabpanel`}>TabPanel</div>
      </>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
