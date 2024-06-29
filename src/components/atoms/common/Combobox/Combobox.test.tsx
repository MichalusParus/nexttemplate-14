import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Combobox from '.'

describe('Combobox', () => {
  it('default', () => {
    render(<Combobox hasPopup="dialog" name="test" isOpen className="className" />)
    expect(screen.getByRole('combobox')).toBeTruthy()
    expect(screen.getByRole('combobox')).toHaveClass('className')
  })
})
