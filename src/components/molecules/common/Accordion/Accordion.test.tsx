import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { accordionOptions } from '../../../../../.storybook/helpers'
import Accordion from '.'

describe('Accordion', () => {
  it('default', () => {
    render(<Accordion className="className" options={accordionOptions} />)
    expect(screen.getByTestId('Accordion')).toBeTruthy()
    expect(screen.getByTestId('Accordion')).toHaveClass('className')
  })
})
