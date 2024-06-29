'use client'
import MobilePagination from './MobilePagination'
import { Props as MobilePaginationProps } from './MobilePagination/MobilePagination'
import ScreenPagination from './ScreenPagination'

export type Props = MobilePaginationProps & {
  /** maximal page spread, affect component width */
  maxSpread?: 7 | 9 | 11 | 13
  /** style variant of component */
  variant?: 'text' | 'outlined' | 'contained'
}

/** Responsive pagination component. For client side pagination is recommended to use with usePagination custom hook. */
export const Pagination = ({
  className = '',
  pages,
  selectedPage,
  variant = 'contained',
  color = 'primary',
  size = 'md',
  maxSpread,
  setSelectedPage,
}: Props) => {
  const getPageSpread = (value: number) => {
    if (maxSpread) {
      if (maxSpread < value) {
        return maxSpread
      } else {
        return value
      }
    } else {
      return value
    }
  }

  return (
    <div className={`PaginationWrap ${className}`} data-testid="Pagination">
      <div className="PaginationInnerWrap flex sm:hidden">
        <MobilePagination
          pages={pages}
          selectedPage={selectedPage}
          color={color}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className="PaginationInnerWrap hidden sm:flex md:hidden">
        <ScreenPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(7)}
          variant={variant}
          color={color}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className="PaginationInnerWrap hidden md:flex lg:hidden">
        <ScreenPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(9)}
          variant={variant}
          color={color}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className="PaginationInnerWrap hidden lg:flex xl:hidden">
        <ScreenPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(11)}
          variant={variant}
          color={color}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className="PaginationInnerWrap hidden xl:flex 2xl:hidden">
        <ScreenPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(13)}
          variant={variant}
          color={color}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
      <div className="PaginationInnerWrap hidden 2xl:flex">
        <ScreenPagination
          pages={pages}
          selectedPage={selectedPage}
          pageSpread={getPageSpread(15)}
          variant={variant}
          color={color}
          size={size}
          setSelectedPage={setSelectedPage}
        />
      </div>
    </div>
  )
}
