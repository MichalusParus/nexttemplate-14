import '@testing-library/jest-dom'

import { render, screen } from '../../../../../.jest/customRender'
import { getGalleryItems } from '../../../../../.storybook/helpers'
import { Gallery } from '.'

describe('Gallery', () => {
  it('default', () => {
    render(
      <Gallery
        name="galleryTest"
        items={getGalleryItems(18)}
        ratio="aspect-w-16 aspect-h-9"
        className="className"
      />,
    )
    // expect(screen.getByTestId('Gallery')).toBeInTheDocument()
    // expect(screen.getByTestId('Gallery')).toHaveClass('className')
    // expect(screen.getAllByRole('img')).toHaveLength(3)
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument()
  })
})
