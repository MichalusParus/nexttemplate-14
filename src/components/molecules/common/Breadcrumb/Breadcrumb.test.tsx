import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'
import { act, createRef } from 'react'

import { render, screen } from '../../../../../.jest/customRender'
import { breadcrumbOptions } from '../../../../../.storybook/helpers'
import { Breadcrumb } from './Breadcrumb'

expect.extend(toHaveNoViolations)

describe('Breadcrumb', () => {
  it('default', () => {
    render(<Breadcrumb className="className" options={breadcrumbOptions} />)
    const breadcrumbTestId = screen.getByRole('navigation')
    const linkRole = screen.getAllByRole('link')
    const currentPageTestId = screen.getByTestId('CurrentPageSpan')

    expect(breadcrumbTestId).toBeInTheDocument()
    expect(breadcrumbTestId).toHaveClass('className')
    expect(linkRole).toHaveLength(breadcrumbOptions.length - 1)
    expect(linkRole[0]).toHaveTextContent(breadcrumbOptions[0].label)
    expect(linkRole[1]).toHaveTextContent(breadcrumbOptions[1].label)
    expect(currentPageTestId).toBeInTheDocument()
    expect(currentPageTestId).toHaveTextContent(breadcrumbOptions[2].label)
    expect(currentPageTestId).toHaveAttribute('aria-current', 'page')
  })

  it('ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Breadcrumb ref={ref} options={breadcrumbOptions} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.focus).toBeDefined()

    const focusMock = jest.spyOn(ref.current!, 'focus').mockImplementation(() => {})
    ref.current?.focus()

    expect(focusMock).toHaveBeenCalled()
    focusMock.mockRestore()
  })

  it('axe', async () => {
    let container
    await act(async () => {
      const result = render(<Breadcrumb options={breadcrumbOptions} />)
      container = result.container
    })

    await act(async () => {
      const results = await axe(container!)
      expect(results).toHaveNoViolations()
    })
  })
})
