import Button from '@/components/atoms/common/Button'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'

import { arrowClass, chevronPositionClass, sizeClass, variantClass } from './MobilePagination.style'

export type Props = {
  /** for passing custom tailwind classes */
  className?: string
  /** array of available pages */
  pages: number[]
  /** current selected page */
  selectedPage: number
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
  /** theme color of component, none disable styles for custom styling via className */
  color?: 'primary' | 'secondary' | 'none'
  /** size of component, none disable sizes for custom styling via className */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** function for selecting page */
  setSelectedPage: (page: number) => void
}

/** Minimalistic mobile pagination. */
export const MobilePagination = ({
  className = '',
  pages,
  selectedPage,
  variant = 'contained',
  color = 'primary',
  size = 'md',
  setSelectedPage,
}: Props) => {
  return (
    <div
      className={`MobilePaginationWrap ${className} relative ${chevronPositionClass[size]} ${pages.length > 1 ? 'visible' : 'invisible'}`}
      data-testid="MobilePagination"
    >
      <Button
        className={`LeftChevronButton rotate-90 ${arrowClass} ${
          selectedPage === 1 ? 'hidden' : 'flex'
        }`}
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon />}
        onClick={() => setSelectedPage(selectedPage - 1)}
        aria-label={`previous page ${selectedPage - 1}`}
        hideShadow
      />
      <div
        className={`cursor-default font-semibold ${variantClass[variant][color]} ${sizeClass[size]}`}
      >
        {selectedPage} / {pages.length}
      </div>
      <Button
        className={`RightChevronButton -rotate-90 ${arrowClass} ${
          selectedPage === pages.length ? 'hidden' : 'flex'
        }`}
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon />}
        onClick={() => setSelectedPage(selectedPage + 1)}
        aria-label={`next page ${selectedPage + 1}`}
        hideShadow
      />
    </div>
  )
}
