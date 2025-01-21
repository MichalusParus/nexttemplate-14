import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { breadcrumbOptions } from '../../../../../.storybook/helpers'
import { Breadcrumb } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('default', () => {
    render(<Breadcrumb className="className" options={breadcrumbOptions} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toHaveClass('className')
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Users')
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('Favourite')
    expect(screen.getAllByRole('link')[2]).toHaveTextContent('Bffs')
    expect(screen.getAllByRole('link')[2]).toHaveAttribute('aria-current', 'page')
  })
})
