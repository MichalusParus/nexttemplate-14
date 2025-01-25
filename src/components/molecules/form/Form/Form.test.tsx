import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { JestFormProvider } from '../../../../../.storybook/helpers'

describe('Form', () => {
  it('default', () => {
    render(
      <JestFormProvider className="className" fields={[]} onSubmit={() => {}}>
        Children
      </JestFormProvider>,
    )
    expect(screen.getByTestId('Form')).toBeInTheDocument()
    expect(screen.getByTestId('Form')).toHaveClass('className')
  })
})
