import { useMemo } from 'react'

import { MenuOptionGroupType } from '@/components/molecules/popovers/Menu/types'

type GroupedOptionsType<T> = {
  label: string
  content?: React.ReactNode
  groupedOptions: T[]
}

const isMenuOptionGroup = <T>(option: T | MenuOptionGroupType<T>): boolean => {
  if (option && typeof option === 'object') {
    return 'groupedOptions' in option
  }
  return false
}

export const useGroupedOptions = <T>(options: T[] | GroupedOptionsType<T>[]) => {
  const isGrouped = useMemo(() => {
    if (!options?.length) return false
    return isMenuOptionGroup(options[0])
  }, [options])

  const flatOptions = useMemo(() => {
    if (!options?.length) return []
    if (isGrouped) {
      return (options as GroupedOptionsType<T>[]).flatMap(group => group.groupedOptions as T[])
    }
    return options as T[]
  }, [options, isGrouped])

  return {
    isGrouped,
    flatOptions,
  }
}
