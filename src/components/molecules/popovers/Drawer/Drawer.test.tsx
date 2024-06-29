import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Drawer from '.'

describe('Drawer', () => {
  it('default', () => {
    render(
      <Drawer className="className" name="drawerTest" isOpen={true} onClose={() => {}}>
        <a href="/" tabIndex={0}>
          Children
        </a>
      </Drawer>,
    )
    expect(screen.getByRole('menu')).toBeTruthy()
    expect(screen.getByRole('menu')).toHaveClass('className')
  })
})
