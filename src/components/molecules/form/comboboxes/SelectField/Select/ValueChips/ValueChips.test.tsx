import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../../../.jest/customRender'
import { getOptions } from '../../../../../../../../.storybook/helpers'
import { ValueChips } from '.'

expect.extend(toHaveNoViolations)

const options = getOptions('valueChips', 5)

describe('ValueChips', () => {
  it('default', () => {
    render(<ValueChips selectedOptions={options} handleOnChange={() => {}} />)
    const valueChipsTestId = screen.getByTestId('ValueChips')
    const chipTestIds = screen.getAllByTestId('Chip')
    const clearTestIds = screen.getAllByTestId('ClearButton')

    expect(valueChipsTestId).toBeInTheDocument()
    expect(chipTestIds).toHaveLength(5)
    expect(chipTestIds[0]).toHaveTextContent(options[0].label)
    expect(clearTestIds).toHaveLength(5)
    expect(clearTestIds[0]).toHaveAttribute('aria-label', `delete ${options[0].label}`)
  })

  it('chipProps', () => {
    render(
      <ValueChips
        selectedOptions={options}
        chipProps={{ className: 'className' }}
        handleOnChange={() => {}}
      />,
    )
    const chipTestIds = screen.getAllByTestId('Chip')

    expect(chipTestIds[0]).toHaveClass('className')
  })

  it('handleOnChange', () => {
    const spy = jest.fn()
    render(<ValueChips selectedOptions={options} handleOnChange={spy} />)
    const clearTestIds = screen.getAllByTestId('ClearButton')

    fireEvent.click(clearTestIds[0])
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(options[0].value)
  })

  it('axe', async () => {
    const { container } = render(<ValueChips selectedOptions={options} handleOnChange={() => {}} />)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
