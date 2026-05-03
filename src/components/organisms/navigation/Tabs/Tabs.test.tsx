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
  describe('Semantics', () => {
    it('renders tablist, tabs, and tabpanel', () => {
      render(
        <Tabs name="tabsTest" selectedValue={tabsOptions[0].value} tabs={tabsOptions} />,
      )
      const tablist = screen.getByRole('tablist')
      const tabs = screen.getAllByRole('tab')
      const tabpanels = screen.getAllByRole('tabpanel')

      expect(tablist).toBeInTheDocument()
      expect(tabs).toHaveLength(tabsOptions.length)
      expect(tabs[0]).toHaveTextContent(tabsOptions[0].label)
      expect(tabs[1]).toHaveTextContent(tabsOptions[1].label)
      expect(tabs[2]).toHaveTextContent(tabsOptions[2].label)
      expect(tabpanels).toHaveLength(1)
    })

    it('className forwarded to wrapper', () => {
      render(
        <Tabs
          className="className"
          name="tabsTest"
          selectedValue={tabsOptions[0].value}
          tabs={tabsOptions}
        />,
      )
      const wrapper = screen.getByTestId('Tabs')

      expect(wrapper).toHaveClass('className')
    })

    it('selectedValue selects correct tab', () => {
      render(
        <Tabs name="tabsTest" selectedValue={tabsOptions[2].value} tabs={tabsOptions} />,
      )
      const tabs = screen.getAllByRole('tab')
      const content = screen.getByText('Content 3')

      expect(tabs[2]).toHaveAttribute('data-selected')
      expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
      expect(content).toBeInTheDocument()
    })

    it('tabpanel links to tab via aria-labelledby', () => {
      render(
        <Tabs name="tabsTest" selectedValue={tabsOptions[0].value} tabs={tabsOptions} />,
      )
      const tabs = screen.getAllByRole('tab')
      const tabpanel = screen.getByRole('tabpanel')

      expect(tabs[0]).toHaveAttribute('aria-controls', tabpanel.getAttribute('id'))
      expect(tabpanel).toHaveAttribute('aria-labelledby', tabs[0].getAttribute('id'))
    })

    it('selected tabpanel has tabIndex 0', () => {
      render(
        <Tabs name="tabsTest" selectedValue={tabsOptions[0].value} tabs={tabsOptions} />,
      )
      const tabpanel = screen.getByRole('tabpanel')

      expect(tabpanel).toHaveAttribute('tabIndex', '0')
    })

    it('fullWidth classes on li and tab', () => {
      render(
        <Tabs
          name="tabsTest"
          selectedValue={tabsOptions[0].value}
          tabs={tabsOptions}
          fullWidth
        />,
      )
      const lis = screen.getAllByTestId('tabLi')
      const tabs = screen.getAllByRole('tab')

      expect(lis[0]).toHaveClass('w-full')
      expect(tabs[0]).toHaveClass('w-full')
    })

    it('tabButtonProps forwarded to tabs', async () => {
      render(
        <Tabs
          name="tabsTest"
          selectedValue={tabsOptions[0].value}
          tabs={tabsOptions}
          tabButtonProps={{ className: 'tabButtonClass' }}
        />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveClass('tabButtonClass')
    })

    it('selectProps forwarded to TabListSelect', async () => {
      render(
        <Tabs
          name="tabsTest"
          selectedValue={tabsOptions[0].value}
          tabs={tabsOptions}
          selectProps={{ className: 'selectProps' }}
        />,
      )
      const select = screen.getByTestId('TabListSelect')

      expect(select).toHaveClass('selectProps')
    })

    it('returns null for empty tabs', () => {
      const { container } = render(
        <Tabs name="tabsTest" selectedValue="label1" tabs={[]} />,
      )

      expect(container.innerHTML).toBe('')
    })

    it('returns null for undefined selectedValue', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const { container } = render(
        <Tabs name="tabsTest" selectedValue={undefined as never} tabs={tabsOptions} />,
      )

      expect(container.innerHTML).toBe('')
      warnSpy.mockRestore()
    })
  })

  describe('Keyboard', () => {
    it('selected tab focusable', async () => {
      render(
        <Tabs name="tabsTest" selectedValue={tabsOptions[0].value} tabs={tabsOptions} />,
      )
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        tabs[0].focus()
      })
      expect(document.activeElement).toBe(tabs[0])
    })

    it('unselected tabs not in tab order', () => {
      render(
        <Tabs name="tabsTest" selectedValue={tabsOptions[0].value} tabs={tabsOptions} />,
      )
      const tabs = screen.getAllByRole('tab')

      expect(tabs[0]).toHaveAttribute('tabIndex', '0')
      expect(tabs[1]).toHaveAttribute('tabIndex', '-1')
      expect(tabs[2]).toHaveAttribute('tabIndex', '-1')
    })
  })

  describe('Interaction', () => {
    it('onTabChange fires on tab click', async () => {
      const onTabChange = jest.fn()
      render(
        <Tabs
          name="tabsTest"
          selectedValue={tabsOptions[0].value}
          tabs={tabsOptions}
          onTabChange={onTabChange}
        />,
      )
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        fireEvent.click(tabs[0])
      })
      expect(onTabChange).toHaveBeenCalledTimes(1)
      expect(onTabChange).toHaveBeenCalledWith(tabsOptions[0].value)
    })

    it('disabled tab does not fire onTabChange', async () => {
      const onTabChange = jest.fn()
      const disabledTabs = tabsOptions.map((tab, i) => ({
        ...tab,
        isDisabled: i === 1,
      }))
      render(
        <Tabs
          name="tabsTest"
          selectedValue={disabledTabs[0].value}
          tabs={disabledTabs}
          onTabChange={onTabChange}
        />,
      )
      const tabs = screen.getAllByRole('tab')

      await act(async () => {
        fireEvent.click(tabs[1])
      })
      expect(onTabChange).not.toHaveBeenCalled()
    })

    it('warns when selectedValue not found in tabs', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      render(
        <Tabs
          name="tabsTest"
          selectedValue={'nonexistent'}
          tabs={tabsOptions}
          onTabChange={() => {}}
        />,
      )

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining("selectedValue 'nonexistent' not found"),
      )
      warnSpy.mockRestore()
    })
  })

  describe('Ref', () => {
    it('forwards ref to HTMLDivElement', () => {
      const ref = createRef<HTMLDivElement>()
      render(
        <Tabs ref={ref} name="tabsTest" selectedValue="label1" tabs={tabsOptions} />,
      )

      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Accessibility', () => {
    it('no axe violations', async () => {
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
})
