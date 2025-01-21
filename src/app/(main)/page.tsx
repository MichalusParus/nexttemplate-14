'use client'

import { addWeeks } from 'date-fns'

import { Button } from '@/components/atoms/common/Button'
import { useSearchParamsFilter } from '@/utils/hooks/useSearchParamsFilter'

type Test = {
  test1: string
  test2: number
  test3: boolean
  test4: Date
  test5: number[]
}

export default function Home() {
  const { filters, updateFilters } = useSearchParamsFilter<Test>([
    { key: 'test1', defaultValue: '' },
    { key: 'test2', defaultValue: 0 },
    { key: 'test3', defaultValue: false },
    { key: 'test4', defaultValue: new Date() },
    { key: 'test5', defaultValue: [] },
    { key: 'test6' },
  ])

  return (
    <div>
      <Button onClick={() => updateFilters({ test1: 'active' })}>test1</Button>
      <Button onClick={() => updateFilters({ test1: 'test1' })}>test1Off</Button>
      <Button onClick={() => updateFilters({ test2: 80 })}>test1</Button>
      <Button onClick={() => updateFilters({ test2: 0 })}>test1Off</Button>
      <Button onClick={() => updateFilters({ test3: true })}>test1</Button>
      <Button onClick={() => updateFilters({ test3: false })}>test1Off</Button>
      <Button onClick={() => updateFilters({ test4: addWeeks(new Date(), 1) })}>test1</Button>
      <Button onClick={() => updateFilters({ test4: new Date() })}>test1Off</Button>
      <Button onClick={() => updateFilters({ test5: [1, 2] })}>test1</Button>
      <Button onClick={() => updateFilters({ test5: [] })}>test1Off</Button>
    </div>
  )
}
