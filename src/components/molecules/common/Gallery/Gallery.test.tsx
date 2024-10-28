import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { getGalleryItems, JestMockProvider } from '../../../../../.storybook/helpers'
import Gallery from '.'

describe('Gallery', () => {
  it('default', () => {
    render(
      <JestMockProvider>
        <Gallery
          name="galleryTest"
          items={getGalleryItems(18)}
          ratio="aspect-w-16 aspect-h-9"
          className="className"
        />
      </JestMockProvider>,
    )
    expect(screen.getByTestId('Gallery')).toBeTruthy()
    expect(screen.getByTestId('Gallery')).toHaveClass('className')
    expect(screen.getAllByTestId('panel')).toHaveLength(3)
    expect(screen.getAllByRole('button')).toHaveLength(5)
  })
})
