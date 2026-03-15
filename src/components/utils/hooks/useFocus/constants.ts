export const FOCUS_SELECTORS = {
  common: ['button:not([tabindex="-1"])', 'a[href]:not([tabindex="-1"])', 'input:not([tabindex="-1"])', 'select:not([tabindex="-1"])', 'textarea:not([tabindex="-1"])', '[tabindex]:not([tabindex="-1"])'],
  select: ['.Option', '.ClearButton', '.ChipClearButton', '.Button', '.Link'],
  autocomplete: ['.Option', '.ClearButton', '.ChipClearButton', '.Button', '.Link'],
  menu: ['[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]'],
  grid: ['[role="gridcell"][tabindex]', '[role="columnheader"][tabindex]', '[role="rowheader"][tabindex]'],
  datepicker: ['.ClearButton', '.ChipClearButton', '.PreviousMonthButton', '.MonthSelect', '.NextMonthButton'],
} as const

export const TYPE_AHEAD_TIMEOUT = 500
