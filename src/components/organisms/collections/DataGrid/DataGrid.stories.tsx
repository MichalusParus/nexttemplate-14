import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

import { Button } from '@/components/atoms/common/Button'
import { Form } from '@/components/molecules/form/forms/Form'
import { NumberField } from '@/components/molecules/form/inputs/NumberField'
import { TextField } from '@/components/molecules/form/inputs/TextField'
import { ColumnDef } from '@/components/organisms/collections/DataGrid/utils/types'
import { FilterDef, SortingState } from '@/utils/hooks/useFilterData'

import {
  gridData,
  gridMultiColsDef,
  gridShowcaseColsDef,
  gridTestCleanColsDef,
} from '../../../../../.storybook/helpers'
import { DataGrid, DataGridProps } from '.'

const routerMock = {
  nextjs: {
    appDirectory: true,
    router: {
      navigation: {
        basePath: '/',
      },
    },
  },
}

const serverColumns: ColumnDef[] = [
  { label: 'First Name', name: 'firstName', width: '150px', grow: 1, filter: { type: 'text' } },
  { label: 'Last Name', name: 'lastName', width: '150px', grow: 1, filter: { type: 'text' } },
  { label: 'Age', name: 'age', width: '200px', align: 'right', filter: { type: 'number' } },
  { label: 'Email', name: 'email', width: '250px', grow: 1, hideSort: true },
  { label: 'Phone', name: 'phone', width: '180px', hideSort: true },
]

const DataGridWithFetch = (args: DataGridProps) => {
  const [data, setData] = useState<Record<string, unknown>[]>([])
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState<FilterDef>({})
  const [sorting, setSorting] = useState<SortingState>({ key: null, value: 'none' })
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(args.rowsPerPage ?? 20)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const skip = (currentPage - 1) * rowsPerPage
    const params = new URLSearchParams({ limit: String(rowsPerPage), skip: String(skip) })

    if (sorting.key && sorting.value !== 'none') {
      params.set('sortBy', sorting.key)
      params.set('order', sorting.value)
    }

    const searchValue = Object.values(filter).find(
      c => c.value != null && c.value !== '' && typeof c.value === 'string',
    )?.value
    if (searchValue) {
      params.set('q', String(searchValue))
    }
    const base = searchValue
      ? 'https://dummyjson.com/users/search'
      : 'https://dummyjson.com/users'

    const fetchData = async () => {
      try {
        const response = await fetch(`${base}?${params}`)
        const json = await response.json()
        startTransition(() => {
          setData(json.users)
          setTotal(json.total)
        })
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }

    fetchData()
  }, [currentPage, rowsPerPage, sorting, filter])

  return (
    <DataGrid
      {...args}
      rows={data}
      isLoading={isPending}
      count={Math.ceil(total / rowsPerPage)}
      page={currentPage}
      rowsPerPage={rowsPerPage}
      onFilterChange={newFilter => {
        setFilter(newFilter)
        setCurrentPage(1)
      }}
      onSortingChange={newSorting => {
        setSorting(newSorting)
        setCurrentPage(1)
      }}
      onPageChange={(newPage, newRowsPerPage) => {
        setCurrentPage(newPage)
        setRowsPerPage(newRowsPerPage)
      }}
    />
  )
}

const editableSchema = z.object(
  Object.fromEntries(
    gridData.slice(0, 10).flatMap(row => [
      [`name-${row.id}`, z.string().min(1, 'Required')],
      [`age-${row.id}`, z.number().min(0, 'Must be positive')],
    ]),
  ),
)

const EditableFormGrid = (args: DataGridProps) => {
  const rows = gridData.slice(0, 10)

  const defaultValues = Object.fromEntries(
    rows.flatMap(row => [
      [`name-${row.id}`, row.name],
      [`age-${row.id}`, row.age],
    ]),
  )

  const form = useForm<z.infer<typeof editableSchema>>({
    resolver: zodResolver(editableSchema),
    defaultValues,
  })

  const editableColumns: ColumnDef[] = [
    {
      label: 'Name',
      name: 'name',
      width: '200px',
      grow: 1,
      hideSort: true,
      renderCell: (row: Record<string, unknown>) => (
        <TextField
          name={`name-${row.id}`}
          label="Name"
          placeholder="Name"
          className="border-transparent dark:border-transparent"
          labelProps={{ hideLabel: true, hideError: true }}
        />
      ),
    },
    {
      label: 'Age',
      name: 'age',
      width: '120px',
      align: 'right',
      hideSort: true,
      renderCell: (row: Record<string, unknown>) => (
        <NumberField
          name={`age-${row.id}`}
          label="Age"
          placeholder="Age"
          className="border-transparent dark:border-transparent"
          labelProps={{ hideLabel: true, hideError: true }}
        />
      ),
    },
    { label: 'Status', name: 'status', width: '150px', hideSort: true },
    { label: 'Department', name: 'department', width: '180px', hideSort: true },
  ]

  return (
    <Form
      name="editableGridForm"
      form={form}
      variant={args.variant}
      color={args.color}
      size={args.size}
      onSubmit={values => console.log('Form submitted:', values)}
    >
      <DataGrid {...args} columns={editableColumns} rows={rows} />
      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </div>
    </Form>
  )
}

const meta: Meta<typeof DataGrid> = {
  title: 'Organisms/Collections/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    ...routerMock,
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof DataGrid>

export const PrimaryDefault: Story = {
  args: {
    className: '',
    name: 'dataGridDefaultStory',
    columns: gridShowcaseColsDef,
    rows: gridData,
    maxHeight: 'max-h-[80vh]',
    variant: 'outlined',
    color: 'primary',
    size: 'md',
    isLoading: false,
    rowsPerPage: 20,
    hideShadow: false,
    hideExport: false,
    defaultSelectedRows: undefined,
    getRowId: undefined,
    onSelectionChange: undefined,
    onRowClick: undefined,
  },
}

export const CleanTable: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridTestCleanColsDef,
    hideExport: true,
  },
}

export const Pages: Story = {
  args: {
    ...PrimaryDefault.args,
    rows: gridData,
  },
}

export const MultiHeader: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridMultiColsDef,
    rows: gridData,
  },
}

export const OnRowClick: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridMultiColsDef,
    rows: gridData,
    onRowClick: (row: Record<string, unknown>) => console.log(row),
  },
}

export const MultiSelect: Story = {
  args: {
    ...PrimaryDefault.args,
    columns: gridMultiColsDef,
    rows: gridData,
    onSelectionChange: (rows: Record<string, unknown>[]) => console.log('Selected:', rows),
  },
}

export const ServerSide: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'dataGridServerSideStory',
    columns: serverColumns,
    rows: [],
    hideExport: true,
  },
  render: args => <DataGridWithFetch {...args} />,
}

export const EditableForm: Story = {
  args: {
    ...PrimaryDefault.args,
    name: 'dataGridEditableStory',
    hideExport: true,
  },
  render: args => <EditableFormGrid {...args} />,
}
