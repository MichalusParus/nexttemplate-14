import Button from '@/components/atoms/common/Button'
import ChevronIcon from '@/components/atoms/icons/ChevronIcon'

import { Props as MobilePaginationProps } from '../MobilePagination/MobilePagination'
import { chevronPositionClass } from '../MobilePagination/MobilePagination.style'
import { buttonSizeClass, dottColorClass } from './ScreenPagination.style'

export type Props = MobilePaginationProps & {
  /** number of visible pages */
  pageSpread: number
}

/** Static pagination component with fixed page spread. */
export const ScreenPagination = ({
  className = '',
  pages,
  selectedPage,
  pageSpread,
  variant = 'contained',
  color = 'primary',
  size = 'md',
  setSelectedPage,
}: Props) => {
  const sidePagesCount = (pageSpread - 5) / 2

  const aroundPages = () => {
    if (selectedPage < sidePagesCount + 4) {
      return pages.slice(0, sidePagesCount * 2 + 3)
    } else if (selectedPage > pages.length - (sidePagesCount + 3)) {
      return pages.slice(pages.length - (sidePagesCount * 2 + 3), pages.length)
    }
    return pages.filter(
      page => page >= selectedPage - sidePagesCount && page <= selectedPage + sidePagesCount,
    )
  }

  const displayablePages = pages.length > sidePagesCount * 2 + 6 ? aroundPages() : pages

  return (
    <div
      className={`ScreenPaginationWrap ${className} relative flex ${chevronPositionClass[size]} ${pages.length > 1 ? 'visible' : 'invisible'}`}
      data-testid="ScreenPagination"
    >
      <Button
        className={`LeftChevronButton absolute top-1/2 translate-y-[-50%] [&_svg]:rotate-90 ${
          selectedPage === 1 ? 'hidden' : 'flex'
        }`}
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon />}
        onClick={() => setSelectedPage(selectedPage - 1)}
        tabIndex={-1}
        aria-label={`previous page ${selectedPage - 1}`}
      />
      {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 ? (
        <Button
          className={`PageButton ${selectedPage === pages[0] ? 'selected' : ''} ${buttonSizeClass[size]}`}
          variant={variant}
          color={color}
          size={size}
          startIcon={String(pages[0])}
          onClick={() => setSelectedPage(pages[0])}
          tabIndex={-1}
          aria-label={`page ${pages[0]}`}
        />
      ) : null}
      {pages.length > sidePagesCount * 2 + 6 && selectedPage > sidePagesCount + 3 ? (
        <div className={`DottWrap flex items-center justify-around ${buttonSizeClass[size]}`}>
          <div className={dottColorClass[color]} />
          <div className={dottColorClass[color]} />
          <div className={dottColorClass[color]} />
        </div>
      ) : null}
      {displayablePages.map(page => (
        <Button
          key={page}
          className={`PageButton ${selectedPage === page ? 'selected' : ''} ${buttonSizeClass[size]}`}
          variant={variant}
          color={color}
          size={size}
          startIcon={String(page)}
          onClick={() => setSelectedPage(page)}
          tabIndex={-1}
          aria-label={`page ${page}`}
        />
      ))}
      {pages.length > sidePagesCount * 2 + 6 &&
      selectedPage < pages.length - (sidePagesCount + 2) ? (
        <div className={`DottWrap flex items-center justify-around ${buttonSizeClass[size]}`}>
          <div className={dottColorClass[color]} />
          <div className={dottColorClass[color]} />
          <div className={dottColorClass[color]} />
        </div>
      ) : null}
      {pages.length > sidePagesCount * 2 + 6 &&
      selectedPage < pages.length - (sidePagesCount + 2) ? (
        <Button
          className={`PageButton ${selectedPage === pages[pages.length - 1] ? 'selected' : ''} ${buttonSizeClass[size]}`}
          variant={variant}
          color={color}
          size={size}
          startIcon={String(pages[pages.length - 1])}
          onClick={() => setSelectedPage(pages[pages.length - 1])}
          tabIndex={-1}
          aria-label={`page ${pages[pages.length - 1]}`}
        />
      ) : null}
      <Button
        className={`RightChevronButton absolute top-1/2 translate-y-[-50%] [&_svg]:-rotate-90 ${selectedPage === pages.length ? 'hidden' : 'flex'}`}
        variant={variant}
        color={color}
        size={size}
        startIcon={<ChevronIcon />}
        onClick={() => setSelectedPage(selectedPage + 1)}
        tabIndex={-1}
        aria-label={`next page ${selectedPage + 1}`}
      />
    </div>
  )
}
