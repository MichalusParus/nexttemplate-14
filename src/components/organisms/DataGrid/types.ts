export type ColDef = {
  name: string
  label: string
  width?: string | number
  grow?: boolean | number
  shrink?: boolean | number
  hideFilter?: boolean
  hideSort?: boolean
}

export type ColumnDef = ColDef & {
  columns?: ColDef[]
}

export type RowDef = {
  [key: string]: string | number
}
