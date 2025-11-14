import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { fireEvent, render, screen } from '../../../../../.jest/customRender'
import { tabsOptions } from '../../../../../.storybook/helpers'
import { Tabs } from '.'

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

describe('Tabs', () => {
  it('default', async () => {
    render(
      <Tabs
        className="className"
        name="tabsTest"
        selectedValue={tabsOptions[0].value}
        tabs={tabsOptions}
      />,
    )
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
    expect(tabRoles[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabPanelRoles).toHaveLength(1)
    expect(tabPanelRoles[0]).toHaveAttribute('id', tabRoles[0].getAttribute('aria-controls'))
    expect(tabPanelRoles[0]).toHaveAttribute('aria-labelledby', tabRoles[0].getAttribute('id'))
    expect(tabPanelRoles[0]).toHaveAttribute('tabIndex', '0')
    await act(async () => {
      tabRoles[0].focus()
    })
    expect(document.activeElement).toBe(tabRoles[0])
  })

  it('selectedValue', () => {
    render(<Tabs name="tabsTest" selectedValue={tabsOptions[2].value} tabs={tabsOptions} />)
    const tabRoles = screen.getAllByRole('tab')
    const tabPanelText = screen.getByText('Content 3')

    expect(tabRoles[2]).toHaveClass('selected')
    expect(tabRoles[2]).toHaveAttribute('aria-selected', 'true')
    expect(tabPanelText).toBeInTheDocument()
  })

  it('fullWidth', () => {
    render(
      <Tabs name="tabsTest" selectedValue={tabsOptions[0].value} tabs={tabsOptions} fullWidth />,
    )
    const liTestIds = screen.getAllByTestId('tabLi')
    const tabRoles = screen.getAllByRole('tab')

    expect(liTestIds[0]).toHaveClass('w-full')
    expect(tabRoles[0]).toHaveClass('w-full')
  })

  it('tabButtonProps/selectProps', async () => {
    render(
      <Tabs
        name="tabsTest"
        selectedValue={tabsOptions[0].value}
        tabs={tabsOptions}
        tabButtonProps={{ className: 'tabButtonClass' }}
        selectProps={{ className: 'selectProps' }}
      />,
    )
    const comboboxRole = screen.getByRole('combobox')
    await act(async () => {
      fireEvent.click(comboboxRole)
    })
    const tabRoles = screen.getAllByRole('tab')
    const selectTestId = screen.getByTestId('TabListSelect')

    expect(tabRoles[0]).toHaveClass('tabButtonClass')
    expect(selectTestId).toHaveClass('selectProps')
  })

  it('onTabChange', async () => {
    const spy = jest.fn()
    render(
      <Tabs
        name="tabsTest"
        selectedValue={tabsOptions[0].value}
        tabs={tabsOptions}
        onTabChange={spy}
      />,
    )
    const tabRoles = screen.getAllByRole('tab')

    await act(async () => {
      fireEvent.click(tabRoles[0])
    })
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(tabsOptions[0].value)
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Tabs ref={ref} name="tabsTest" selectedValue="label1" tabs={tabsOptions} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    const { container } = render(
      <Tabs
        name="tabsTest"
        selectedValue="label1"
        tabs={tabsOptions}
        selectProps={{ title: 'title' }}
      />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
