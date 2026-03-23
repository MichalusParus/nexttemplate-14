import '@testing-library/jest-dom'

import { axe, toHaveNoViolations } from 'jest-axe'

import { fireEvent, render, screen } from '../../../../../../.jest/customRender'
import { getGalleryItems } from '../../../../../../.storybook/helpers'
import { GalleryControls } from '.'

expect.extend(toHaveNoViolations)


describe('GalleryControls', () => {
  const items = getGalleryItems(18)
  it('default', () => {
    render(<GalleryControls currentPage={1} items={items} setCurrentPage={() => {}} />)
    const controlsTestId = screen.getByTestId('GalleryControls')
    const buttonTestIds = screen.getAllByTestId('GalleryControlButton')
    const imgRoles = screen.getAllByRole('img')

    expect(controlsTestId).toBeInTheDocument()
    expect(buttonTestIds).toHaveLength(18)
    expect(imgRoles).toHaveLength(18)
    expect(imgRoles[0]).toHaveAttribute('alt', items[0].label)
  })

  it('setCurrentPage', () => {
    const spy = jest.fn()
    render(<GalleryControls currentPage={1} items={getGalleryItems(18)} setCurrentPage={spy} />)
    const buttonRoles = screen.getAllByRole('button')

    fireEvent.click(buttonRoles[1])
    expect(spy).toHaveBeenCalledWith(2)
  })

  it('axe', async () => {
    const { container } = render(
      <GalleryControls currentPage={1} items={getGalleryItems(18)} setCurrentPage={() => {}} />,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
