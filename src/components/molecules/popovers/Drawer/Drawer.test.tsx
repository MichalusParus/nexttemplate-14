import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestMockProvider } from '../../../../../.storybook/helpers'
import { Drawer } from '.'

describe('Drawer', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Drawer className="className" name="drawerTest" isOpen={true} onClose={() => {}}>
          <a href="/" tabIndex={0}>
            Children
          </a>
        </Drawer>
      </JestMockProvider>,
    )
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menu')).toHaveClass('className')
    expect(screen.getByRole('menu')).toHaveAttribute('id', 'drawerTest')
    expect(screen.getByRole('menu')).toHaveAttribute('aria-label', 'drawerTest')
  })
})
