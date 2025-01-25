import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { SelectValue } from '.'

describe('SelectValue', () => {
  it('default', () => {
    render(
      <SelectValue
        selectedOptions={[]}
        multiValue={undefined}
        placeholder="placeholder"
        handleOnChange={() => {}}
      />,
    )
    expect(screen.getByTestId('SelectPlaceholder')).toBeInTheDocument()
    expect(screen.getByTestId('SelectPlaceholder')).toHaveTextContent('placeholder')
  })

  it('handleOnChange', () => {
    const spy = jest.fn()
    render(
      <SelectValue
        selectedOptions={[{ label: 'label1', value: 'value1' }]}
        multiValue={undefined}
        placeholder="placeholder"
        handleOnChange={spy}
      />,
    )
    expect(screen.getByTestId('SelectValue')).toHaveTextContent('label1')
    fireEvent.click(screen.getByRole('button'))
    expect(spy).toHaveBeenCalled()
  })
})
