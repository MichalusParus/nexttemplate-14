export const tooltipClass =
  'rounded-md bg-dark-500 text-dark-50 shadow-button px-smPX py-smPY text-sm '

export const tooltipPosition = {
  top: 'absolute bottom-full left-[50%] translate-x-[-50%] ',
  right: 'absolute left-full top-[50%] translate-y-[-50%] ',
  bottom: 'absolute top-full left-[50%] translate-x-[-50%] ',
  left: 'absolute right-full top-[50%] translate-y-[-50%] ',
}

export const tooltipVisibility =
  'invisible opacity-0 scale-75 transition-dropdown ' +
  'hover:visible hover:opacity-100 hover:scale-100 ' +
  'group-hover/tooltip:visible group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 ' +
  'group-focus-within/tooltip:visible group-focus-within/tooltip:opacity-100 group-focus-within/tooltip:scale-100 '
