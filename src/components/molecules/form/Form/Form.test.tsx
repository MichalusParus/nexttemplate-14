import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { JestFormProvider } from '../../../../../.storybook/helpers'

describe('Form', () => {
  it('default', () => {
    render(
      <JestFormProvider className="className" fields={[]} onSubmit={() => {}}>
        Children
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Form')).toBeTruthy()
    expect(screen.getByTestId('Form')).toHaveClass('className')
  })
})
