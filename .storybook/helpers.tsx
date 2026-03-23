import { Divider } from '@/components/atoms/common/Divider'
import { Image } from '@/components/atoms/common/Image'
import { Label } from '@/components/atoms/common/Label'
import { PlusIcon, ProfileIcon } from '@/components/atoms/icons'
import { CarouselItemType } from '@/components/molecules/common/Carousel'
import { AutocompleteField } from '@/components/molecules/form/comboboxes/AutocompleteField'
import { DatePickerField } from '@/components/molecules/form/comboboxes/DatePickerField'
import { MultiAutocompleteField } from '@/components/molecules/form/comboboxes/MultiAutocompleteField'
import { MultiDatePickerField } from '@/components/molecules/form/comboboxes/MultiDatePickerField'
import { MultiSelectField } from '@/components/molecules/form/comboboxes/MultiSelectField'
import { RangeDatePickerField } from '@/components/molecules/form/comboboxes/RangeDatePickerField'
import { SelectField } from '@/components/molecules/form/comboboxes/SelectField'
import { CheckboxField } from '@/components/molecules/form/toggles/CheckboxField'
import { CheckboxGroupField } from '@/components/molecules/form/toggles/CheckboxGroupField'
import { FileField } from '@/components/molecules/form/inputs/FileField'
import { MultiToggleGroupField } from '@/components/molecules/form/toggles/MultiToggleGroupField'
import { NumberField } from '@/components/molecules/form/inputs/NumberField'
import { PasswordField } from '@/components/molecules/form/inputs/PasswordField'
import { RadioGroupField } from '@/components/molecules/form/toggles/RadioGroupField'
import { RangeField } from '@/components/molecules/form/inputs/RangeField'
import { SearchField } from '@/components/molecules/form/inputs/SearchField'
import { TextAreaField } from '@/components/molecules/form/inputs/TextAreaField'
import { TextField } from '@/components/molecules/form/inputs/TextField'
import { ToggleGroupField } from '@/components/molecules/form/toggles/ToggleGroupField'
import { MenuOptionGroupType, MenuOptionType } from '@/components/molecules/popovers/Menu/types'
import { TabOption } from '@/components/organisms/common/Tabs/TabList'
import { ColumnDef } from '@/components/organisms/DataGrid/utils/types'
import { DataGridProvider } from '@/components/organisms/DataGrid/utils/DataGridContext'
import { OptionGroupType, OptionType, StyleProps } from '@/components/utils/types'
import { FilterDef, FilterOperator } from '@/utils/hooks/useFilterData'
import { PropsWithChildren } from 'react'
import z from 'zod'

type ColorSwatchProps = {
  colors: { name: string; variable: string }[]
  title: string
  subtitle?: string
}

export const ColorSwatch = ({ colors, title, subtitle }: ColorSwatchProps) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>{title}</h3>
      {subtitle && (
        <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.875rem' }}>{subtitle}</p>
      )}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
        }}
      >
        {colors.map(({ name, variable }) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.125rem',
              flex: '1 1 0',
              minWidth: '0',
            }}
          >
            <div
              style={{
                height: '80px',
                backgroundColor: `var(${variable})`,
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
            <p
              style={{
                fontWeight: 700,
                fontSize: '0.75rem',
                textAlign: 'center',
              }}
            >
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

type ComponentCardProps = {
  name: string
  path: string
  description?: string
  badge?: string
}

export const ComponentCard = ({ name, path, description, badge }: ComponentCardProps) => {
  return (
    <a
      href={`?path=/story/${path}--docs`}
      style={{
        display: 'block',
        padding: '1.25rem',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s ease',
        backgroundColor: 'var(--color-bg, #fff)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="component-card"
    >
      <style>{`
        .component-card:hover {
          border-color: var(--color-primary-500, #3b82f6);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
      {badge && (
        <span
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            fontSize: '0.625rem',
            fontWeight: 600,
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            backgroundColor: 'var(--color-primary-100, #dbeafe)',
            color: 'var(--color-primary-700, #1d4ed8)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {badge}
        </span>
      )}
      <h4
        style={{
          margin: '0 0 0.5rem 0',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-text-primary, #1f2937)',
        }}
      >
        {name}
      </h4>
      {description && (
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary, #6b7280)',
            lineHeight: '1.5',
          }}
        >
          {description}
        </p>
      )}
    </a>
  )
}

type ComponentGridProps = {
  children: React.ReactNode
  columns?: number
}

export const ComponentGrid = ({ children, columns = 3 }: ComponentGridProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${columns === 2 ? '320px' : '280px'}, 1fr))`,
        gap: '1rem',
        marginBottom: '2rem',
      }}
    >
      {children}
    </div>
  )
}

type ComponentSectionProps = {
  title: string
  subtitle?: string
  count?: number
  children: React.ReactNode
}

export const ComponentSection = ({ title, subtitle, count, children }: ComponentSectionProps) => {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '0 0 0.25rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {title}
          {count !== undefined && (
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary, #6b7280)',
              }}
            >
              ({count})
            </span>
          )}
        </h3>
        {subtitle && (
          <p style={{ margin: 0, color: 'var(--color-text-secondary, #6b7280)', fontSize: '0.875rem' }}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

export const textContent =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti ex totam blanditiis maiores itaque earum eius, delectus perferendis commodi at cupiditate quos veritatis dolore, quas optio provident ipsam debitis dignissimos eos, modi perspiciatis aspernatur aperiam nemo magnam. Quasi ex at ad eaque distinctio porro natus vitae praesentium. Libero quidem vel deleniti possimus repellendus. In optio sint accusantium quidem aspernatur qui ut necessitatibus cum quam ratione veritatis beatae eos rerum vero natus atque, ea repellat! Nemo assumenda eos accusantium voluptatum itaque alias architecto quo magni repudiandae rem libero dignissimos, tempore adipisci et officia dolor voluptate odit iusto, repellat dolore, vitae sequi? Vitae eveniet totam doloremque necessitatibus, quo cumque quam harum pariatur rem praesentium possimus natus voluptate distinctio cupiditate ut officiis. Quibusdam cumque illo iusto dolorum harum tempora voluptate consequuntur ab? Accusantium officiis molestias, at non qui alias fugiat tempore mollitia assumenda quia ipsam quae! Reprehenderit, labore quas adipisci architecto, commodi laborum iusto odio obcaecati mollitia fugit qui debitis. Fuga quasi iusto id fugiat, alias officiis reprehenderit impedit soluta culpa ipsam, tenetur voluptas dolorum perferendis est, libero eaque qui ipsum. Neque aliquam esse explicabo commodi beatae, velit accusamus, magni modi quia suscipit odit nobis nemo aut iusto rerum ex delectus architecto exercitationem atque illum. Facere saepe quidem eaque dolores et expedita pariatur, unde eum dicta soluta! Quod mollitia enim, consectetur reprehenderit vitae asperiores quo. In eum quo neque nesciunt at voluptas, labore, blanditiis hic pariatur corporis tenetur voluptatum maxime doloribus, expedita beatae nulla temporibus alias suscipit obcaecati nostrum ex cupiditate. Sint repudiandae quod asperiores? Cupiditate ipsam pariatur, eos consectetur doloremque similique, dicta nobis veritatis explicabo officiis quos, deleniti sed asperiores repudiandae vero! Rem nihil impedit ducimus dolore molestiae, ex doloribus saepe aspernatur autem atque alias, sit quaerat quasi totam repudiandae delectus cumque! Esse nihil eligendi saepe repudiandae nulla cum id ea. Dolore recusandae veritatis quidem, accusantium optio dignissimos, vero facere architecto reprehenderit eius provident sapiente soluta expedita amet omnis quibusdam dolorem sint itaque. Dolorum laboriosam reprehenderit placeat iste repudiandae quod non esse? Quae repellat assumenda iste. Nulla odit quos deleniti voluptate nemo delectus accusantium porro, ducimus vel dolore ipsam velit minima maiores dolor! Consequatur necessitatibus vitae unde vel, aut aliquam repudiandae ad ullam minus dolores magni distinctio nemo expedita odit, quisquam voluptas reprehenderit, doloremque asperiores? Modi doloremque quidem voluptates perspiciatis dolore perferendis officiis, voluptas reprehenderit laboriosam ex dignissimos! Quam dolore exercitationem consequuntur eveniet atque recusandae dignissimos autem laboriosam aperiam. Ratione, aspernatur rerum, recusandae laboriosam magni numquam delectus distinctio saepe quo autem, unde quibusdam sed optio at consequuntur fugit. Minima, aliquam autem corporis nostrum nemo eius dolore alias placeat eum ratione expedita quas, perspiciatis reprehenderit in quisquam! Repudiandae illo qui voluptas quos quo iste, eaque, amet suscipit alias omnis quam minus reprehenderit, eum ea ullam voluptatum labore dignissimos eveniet nesciunt! Vel enim asperiores eum illo ullam! Quis animi recusandae laudantium ad excepturi, culpa velit. Molestias corporis quaerat blanditiis illo veritatis, dolore eius natus eveniet unde fugiat cupiditate, quos deserunt odio, cum culpa omnis odit voluptatum. Voluptatum eius iusto, quis distinctio voluptatibus fugiat non.'

export const titleSizeVariants: ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl')[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
]

export const getOptions = (name?: string, length?: number) =>
  Array.from({ length: length || 20 }, (_, i) => ({
    label: i % 3 === 0 ? 'Very long label' + (i + 1) : 'Label' + (i + 1),
    value: 'value' + (i + 1) + (name ? name : ''),
  }))

export const getGroupedOptions = (
  name?: string,
  color?: StyleProps['color'],
): OptionGroupType[] => {
  return [
    {
      label: 'Group 1',
      groupedOptions: getOptions(`${name} Group 1`, 3),
    },
    {
      label: 'Group 2',
      groupedOptions: getOptions(`${name} Group 2`, 3),
    },
    {
      label: 'Group 3',
      groupedOptions: getOptions(`${name} Group 3`, 3),
    },
  ]
}

export const optionsWithContent = Array.from({ length: 20 }, (_, i) => ({
  label: i % 3 === 0 ? 'very long label' + (i + 1) : 'label' + (i + 1),
  value: 'value' + (i + 1),
  content: (
    <div className="flex w-full items-center justify-between">
      <div className="text-start">
        <p>{i % 3 === 0 ? 'very long label' + (i + 1) : 'label' + (i + 1)}</p>
        <p className="text-sm">{textContent.slice(0, 21)}</p>
      </div>
      <PlusIcon />
    </div>
  ),
}))

export const getGalleryItems = (length: number) => {
  const srcs = [
    'https://picsum.photos/1600/900',
    'https://picsum.photos/1600/800',
    'https://picsum.photos/900/800',
    'https://picsum.photos/1200/900',
  ]
  return Array.from({ length: length }, (_, i) => ({
    src: srcs[i % 4],
    label: 'img' + (i + 1),
  }))
}

export const getCarouselItems = (count: number): CarouselItemType[] => {
  return getGalleryItems(count).map(img => ({
    label: img.label,
    content: <Image src={img.src} alt={img.label} width="w-full" />,
  }))
}

export const tabsOptions: TabOption<string>[] = [
  { length: 100 },
  { length: 800 },
  { length: 800 },
].map(({ length }, i) => ({
  label: `Label ${i + 1}`,
  value: `label${i + 1}`,
  component: (
    <div className="flex h-96 flex-col items-center justify-start">
      <h2 className="text-2xl" data-testid={`tab${i + 1}Title`}>
        Content {i + 1}
      </h2>
      <p className={i === 0 ? 'pt-20' : ''}>{textContent.slice(0, length)}</p>
    </div>
  ),
}))

export const breadcrumbOptions = [
  { label: 'Users', href: '/' },
  { label: 'Favourite', href: '/favourite' },
  { label: 'Bffs', href: '/bffs' },
]

export const accordionOptions = [
  {
    title: 'Disclosure Title 1',
    content: textContent.slice(0, 500),
    defaultExpanded: true,
  },
  {
    title: 'Disclosure Title 2',
    content: textContent.slice(0, 500),
  },
  {
    title: 'Disclosure Title 3',
    content: textContent.slice(0, 500),
  },
  {
    title: 'Disclosure Title 4',
    content: textContent.slice(0, 500),
  },
  {
    title: 'Disclosure Title 5',
    content: textContent.slice(0, 500),
  },
]

export type MenuValuesType = {
  checkbox1?: string | null
  checkbox2?: string | null
  checkbox3?: string | null
  switch1?: string | null
  switch2?: string | null
  switch3?: string | null
  radio?: string
}

export type ControlType = {
  checkbox1?: () => void
  checkbox2?: () => void
  checkbox3?: () => void
  switch1?: () => void
  switch2?: () => void
  switch3?: () => void
  radio?: (value: string) => void
}

export const menuButtonOptions: MenuOptionType[] = [
  {
    type: 'button',
    label: 'MenuButton1',
    onClick: () => console.log('MenuButton1'),
  },
  {
    type: 'button',
    label: 'MenuButton2',
    onClick: () => console.log('MenuButton2'),
  },
  {
    type: 'button',
    label: 'MenuButton3',
    onClick: () => console.log('MenuButton3'),
  },
]

export const getMenuOptions = (
  values?: MenuValuesType,
  control?: ControlType,
): MenuOptionGroupType[] => {
  return [
    {
      label: 'Buttons',
      content: <Divider color="none" label="Buttons" />,
      groupedOptions: [
        {
          type: 'button',
          label: 'MenuButton1',
          onClick: () => console.log('MenuButton1'),
          menuItemProps: {
            className: 'justify-start',
            startIcon: <ProfileIcon />,
          },
        },
        {
          type: 'button',
          label: 'MenuButton2',
          onClick: () => console.log('MenuButton2'),
          menuItemProps: {
            className: 'justify-start',
            startIcon: <ProfileIcon />,
          },
        },
        {
          type: 'button',
          label: 'MenuButton3',
          onClick: () => console.log('MenuButton3'),
          menuItemProps: {
            className: 'justify-start',
            startIcon: <ProfileIcon />,
          },
        },
      ],
    },
    {
      label: 'Links',
      content: <Divider color="none" label="Links" />,
      groupedOptions: [
        {
          type: 'link',
          label: 'MenuLink1',
          href: '/',
          menuItemProps: {
            className: 'justify-start',
            startIcon: <ProfileIcon />,
          },
        },
        {
          type: 'link',
          label: 'MenuLink2',
          href: '/',
          menuItemProps: {
            className: 'justify-start',
            startIcon: <ProfileIcon />,
          },
        },
        {
          type: 'link',
          label: 'MenuLink3',
          href: '/',
          menuItemProps: {
            className: 'justify-start',
            startIcon: <ProfileIcon />,
          },
        },
      ],
    },
    {
      label: 'Checkbox',
      content: <Divider color="none" label="Checkbox" />,
      groupedOptions: [
        {
          type: 'checkbox',
          label: 'MenuCheckbox1',
          isChecked: values?.checkbox1 === 'checkbox1',
          onClick: control?.checkbox1,
          menuItemProps: {
            className: 'justify-start',
          },
        },
        {
          type: 'checkbox',
          label: 'MenuCheckbox2',
          isChecked: values?.checkbox2 === 'checkbox2',
          onClick: control?.checkbox2,
          menuItemProps: {
            className: 'justify-start',
          },
        },
        {
          type: 'checkbox',
          label: 'MenuCheckbox3',
          isChecked: values?.checkbox3 === 'checkbox3',
          onClick: control?.checkbox3,
          menuItemProps: {
            className: 'justify-start',
          },
        },
      ],
    },
    {
      label: 'Switch',
      content: <Divider color="none" label="Switch" />,
      groupedOptions: [
        {
          type: 'switch',
          label: 'MenuSwitch1',
          isChecked: values?.switch1 === 'switch1',
          onClick: control?.switch1,
          menuItemProps: {
            className: 'justify-start',
          },
        },
        {
          type: 'switch',
          label: 'MenuSwitch2',
          isChecked: values?.switch2 === 'switch2',
          onClick: control?.switch2,
          menuItemProps: {
            className: 'justify-start',
          },
        },
        {
          type: 'switch',
          label: 'MenuSwitch3',
          isChecked: values?.switch3 === 'switch3',
          onClick: control?.switch3,
          menuItemProps: {
            className: 'justify-start',
          },
        },
      ],
    },
    {
      label: 'Radio',
      content: <Divider color="none" label="Radio" />,
      groupedOptions: [
        {
          type: 'radio',
          label: 'MenuRadioGroup',
          value: values?.radio || 'radio1',
          options: [
            { label: 'MenuRadio1', value: 'radio1' },
            { label: 'MenuRadio2', value: 'radio2' },
            { label: 'MenuRadio3', value: 'radio3' },
          ],
          onChange: control?.radio || console.log,
        },
      ],
    },
    {
      label: 'Submenu',
      content: <Divider color="none" label="Submenu" />,
      groupedOptions: [
        {
          type: 'submenu',
          label: 'MenuSubmenu1',
          options: [
            {
              type: 'button',
              label: 'SubmenuButton1',
              onClick: () => console.log('SubmenuButton1'),
              menuItemProps: {
                startIcon: <ProfileIcon />,
              },
            },
            {
              type: 'button',
              label: 'SubmenuButton2',
              onClick: () => console.log('SubmenuButton2'),
              menuItemProps: {
                startIcon: <ProfileIcon />,
              },
            },
            {
              type: 'button',
              label: 'SubmenuButton3',
              onClick: () => console.log('SubmenuButton3'),
              menuItemProps: {
                startIcon: <ProfileIcon />,
              },
            },
          ],
        },
        {
          type: 'submenu',
          label: 'HoverSubmenu2',
          menuItemProps: {
            onHoverOpen: true,
          },
          options: [
            {
              type: 'submenu',
              label: 'NestedHoverSubmenu1',
              menuItemProps: {
                onHoverOpen: true,
              },
              options: [
                {
                  type: 'button',
                  label: 'NestedCloseOnClick1',
                  onClick: () => console.log('NestedButton1'),
                  menuItemProps: {
                    startIcon: <ProfileIcon />,
                  },
                  closeOnClick: true,
                },
                {
                  type: 'button',
                  label: 'NestedButton2',
                  onClick: () => console.log('NestedButton2'),
                  menuItemProps: {
                    startIcon: <ProfileIcon />,
                  },
                },
                {
                  type: 'button',
                  label: 'NestedButton3',
                  onClick: () => console.log('NestedButton3'),
                  menuItemProps: {
                    startIcon: <ProfileIcon />,
                  },
                },
              ],
            },
            {
              type: 'button',
              label: 'SubmenuButton4',
              onClick: () => console.log('SubmenuButton4'),
              menuItemProps: {
                startIcon: <ProfileIcon />,
              },
            },
            {
              type: 'button',
              label: 'SubmenuButton5',
              onClick: () => console.log('SubmenuButton5'),
              menuItemProps: {
                startIcon: <ProfileIcon />,
              },
            },
          ],
        },
      ],
    },
  ]
}

// FORM HELPERS
export const InputFields = ({
  handleMockUpload,
}: {
  handleMockUpload: (file: File) => Promise<File>
}) => {
  return (
    <>
      <TextField name="inputStory" label="TextInput:" placeholder="input" />
      <NumberField name="numberStory" label="NumberInput:" placeholder="number" />
      <PasswordField name="passwordStory" label="PasswordInput:" placeholder="password" />
      <SearchField
        name="searchStory"
        label="SearchInput:"
        placeholder="search"
        labelProps={{ description: 'Some description' }}
      />
      <TextAreaField name="textareaStory" label="Textarea:" placeholder="textarea" />
      <FileField
        name="fileStory"
        label="FileInput:"
        onDrop={handleMockUpload}
        onDelete={async file => console.log('delete', file)}
      />
      <RangeField
        name="rangeStory"
        label="Range:"
        min={100}
        max={200}
        onChange={v => console.log(v)}
      />
    </>
  )
}

export const RadioFields = () => {
  return (
    <>
      <Label name="checkboxStory" label="Fake label:" variant='div'>
        <CheckboxField name="checkboxStory" label="checkbox" />
      </Label>
      <CheckboxGroupField
        name="checkboxGroupStory"
        label="Checkbox Group:"
        options={getOptions('checkboxGroupStory', 6)}
      />
      <CheckboxGroupField
        name="switchGroupStory"
        label="Switch Group:"
        switchType
        options={getOptions('switchGroupStory', 6)}
      />
      <RadioGroupField
        name="radioGroupStory"
        label="Radio Group:"
        options={getOptions('radioGroupStory', 6)}
      />
      <ToggleGroupField
        className="w-full"
        name="toggleGroupStory"
        label="ToggleGroup:"
        options={getOptions('toggleGroupStory', 3)}
      />
      <MultiToggleGroupField
        className="w-full"
        name="multiToggleGroupStory"
        label="MultiToggleGroup:"
        options={getOptions('toggleGroupStory', 3)}
      />
    </>
  )
}

export const ComboboxFields = ({
  autocompleteOptions,
  multiAutocompleteOptions,
  setAutocompleteFilter,
  setMultiAutocompleteFilter,
}: {
  autocompleteOptions: OptionType<string>[]
  multiAutocompleteOptions: OptionType<string>[]
  setAutocompleteFilter: (value: FilterDef) => void
  setMultiAutocompleteFilter: (value: FilterDef) => void
}) => {
  return (
    <>
      <DatePickerField name="dateStory" label="DatePicker:" placeholder="date" />
      <RangeDatePickerField name="dateRangeStory" label="RangeDatePicker:" placeholder="range" />
      <MultiDatePickerField
        name="dateMultiStory"
        label="MultiDatePicker:"
        placeholder="multi"
        onChange={v => console.log(v)}
      />
      <SelectField
        name="selectStory"
        label="Select:"
        placeholder="select"
        options={getOptions('selectStory', 20)}
      />
      <MultiSelectField
        name="multiSelectStory"
        label="MultiSelect:"
        placeholder="multiSelect"
        options={getOptions('multiSelectStory', 20)}
      />
      <AutocompleteField
        name="autocompleteStory"
        label="Autocomplete:"
        placeholder="autocomplete"
        options={autocompleteOptions}
        onInputChange={(value: string) =>
          setAutocompleteFilter({ label: { value, operator: FilterOperator.CONTAINS } })
        }
      />
      <MultiAutocompleteField
        name="multiAutocompleteStory"
        label="MultiAutocomplete:"
        placeholder="multiAutocomplete"
        options={multiAutocompleteOptions}
        onInputChange={(value: string) =>
          setMultiAutocompleteFilter({ label: { value, operator: FilterOperator.CONTAINS } })
        }
      />
    </>
  )
}

export const inputFormDefaultValues = {
  inputStory: '',
  numberStory: undefined,
  searchStory: '',
  passwordStory: '',
  fileStory: [],
  textareaStory: '',
  rangeStory: 0,
}

export const radioFormDefaultValues = {
  checkboxStory: '',
  checkboxGroupStory: [],
  switchGroupStory: [],
  radioGroupStory: '',
  toggleGroupStory: '',
  multiToggleGroupStory: [],
}

export const comboboxFormDefaultValues = {
  dateStory: undefined,
  dateRangeStory: { start: undefined, end: undefined },
  dateMultiStory: [],
  selectStory: '',
  multiSelectStory: [],
  autocompleteStory: '',
  multiAutocompleteStory: [],
}

export const inputSchema = z.object({
  inputStory: z.string().min(1),
  numberStory: z.number().min(1),
  searchStory: z.string().min(1),
  passwordStory: z.string().min(1),
  fileStory: z.array(z.instanceof(File)).min(1),
  textareaStory: z.string().min(1),
  rangeStory: z.number().min(20),
})

export const radioSchema = z.object({
  checkboxStory: z.string().min(1),
  checkboxGroupStory: z.array(z.string()).min(1),
  switchGroupStory: z.array(z.string()).min(1),
  radioGroupStory: z.string().min(1),
  toggleGroupStory: z.string().min(1),
  multiToggleGroupStory: z.array(z.string()).min(1),
})

export const comboboxSchema = z.object({
  dateStory: z
    .date({
      required_error: 'Date is required',
      invalid_type_error: 'Please select a date',
    })
    .or(z.undefined())
    .refine(val => val !== undefined, { message: 'Date is required' }),
  dateRangeStory: z
    .object({
      start: z.date().optional().nullable(),
      end: z.date().optional().nullable(),
    })
    .refine(data => data.start && data.end, {
      message: 'Both start and end dates are required',
    }),
  dateMultiStory: z.array(z.date()).min(1, { message: 'Select at least one date' }),
  selectStory: z.string().min(1),
  multiSelectStory: z.array(z.string()).min(1),
  autocompleteStory: z.string().min(1),
  multiAutocompleteStory: z.array(z.string()).min(1),
})

export const formSchema = inputSchema.merge(radioSchema).merge(comboboxSchema)

export const initialValues = {
  ...inputFormDefaultValues,
  ...radioFormDefaultValues,
  ...comboboxFormDefaultValues,
}

// GRID HELPERS
export const JestDataGridProvider = ({
  name = 'testGrid',
  variant = 'outlined',
  color = 'primary',
  size = 'md',
  columns = gridCleanColsDef,
  columnsInRow,
  hideExport = false,
  filter = {},
  setFilter = () => {},
  sorting = { key: null, value: 'none' as const },
  handleSorting = () => {},
  selectedRowsCount = 0,
  filteredDataCount = 0,
  children,
}: PropsWithChildren<{
  name?: string
  variant?: StyleProps['variant']
  color?: StyleProps['color']
  size?: StyleProps['size']
  columns?: ColumnDef[]
  columnsInRow?: ColumnDef[]
  hideExport?: boolean
  filter?: FilterDef
  setFilter?: (filter: FilterDef) => void
  sorting?: { key: string | null; value: 'asc' | 'desc' | 'none' }
  handleSorting?: (key: string) => void
  selectedRowsCount?: number
  filteredDataCount?: number
}>) => {
  const contextValue = {
    name,
    variant,
    color,
    size,
    columns,
    columnsInRow:
      columnsInRow ||
      columns.flatMap(col =>
        col.columns && col.columns.length > 0
          ? col.columns.flatMap(c => (c.columns ? c.columns : [c]))
          : [col],
      ),
    hideExport,
    filter,
    setFilter,
    sorting,
    handleSorting,
    selectedRowsCount,
    filteredDataCount,
  }

  return <DataGridProvider value={contextValue}>{children}</DataGridProvider>
}

export const gridColsDef: ColumnDef[] = [
  {
    label: 'Name',
    name: 'name',
    width: '200px',
    grow: 1,
    filter: {
      type: 'text',
    },
  },
  {
    label: 'Age',
    name: 'age',
    width: '120px',
    align: 'right',
    filter: {
      type: 'number',
      operator: FilterOperator.EQUALS,
    },
  },
  {
    label: 'Status',
    name: 'status',
    width: '150px',
    filter: {
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
    },
  },
  {
    label: 'Active',
    name: 'isActive',
    width: '140px',
    filter: {
      type: 'toggle',
      options: [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
    },
  },
  {
    label: 'Join Date',
    name: 'joinDate',
    width: '150px',
    filter: {
      type: 'date',
      operator: FilterOperator.EQUALS,
    },
  },
  {
    label: 'Department',
    name: 'department',
    width: '180px',
    filter: {
      type: 'select',
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Sales', value: 'sales' },
        { label: 'HR', value: 'hr' },
      ],
    },
  },
]

export const gridCleanColsDef: ColumnDef[] = [
  {
    label: 'Name',
    name: 'name',
    width: '200px',
    grow: true,
    hideSort: true,
  },
  {
    label: 'Age',
    name: 'age',
    width: '120px',
    hideSort: true,
  },
  {
    label: 'Status',
    name: 'status',
    width: '150px',
    hideSort: true,
  },
  {
    label: 'Active',
    name: 'isActive',
    width: '120px',
    hideSort: true,
  },
  {
    label: 'Join Date',
    name: 'joinDate',
    width: '150px',
    hideSort: true,
  },
  {
    label: 'Department',
    name: 'department',
    width: '180px',
    hideSort: true,
  },
]

export const gridMultiColsDef: ColumnDef[] = [
  {
    label: 'Employee Information',
    name: 'col1',
    columns: [
      {
        label: 'Personal Details',
        name: 'personal',
        columns: [
          {
            label: 'Name',
            name: 'name',
            grow: 1,
            filter: {
              type: 'text',
            },
          },
          {
            label: 'Age',
            name: 'age',
            width: '120px',
            filter: {
              type: 'number',
              operator: FilterOperator.EQUALS,
            },
          },
        ],
      },
      {
        label: 'Status Info',
        name: 'statusInfo',
        columns: [
          {
            label: 'Status',
            name: 'status',
            filter: {
              type: 'select',
              options: [
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Pending', value: 'pending' },
              ],
            },
          },
          {
            label: 'Active',
            name: 'isActive',
            filter: {
              type: 'toggle',
              options: [
                { label: 'Yes', value: 'true' },
                { label: 'No', value: 'false' },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    label: 'Work Information',
    name: 'col2',
    columns: [
      {
        label: 'Employment',
        name: 'employment',
        columns: [
          {
            label: 'Department',
            name: 'department',
            filter: {
              type: 'select',
              options: [
                { label: 'Engineering', value: 'engineering' },
                { label: 'Marketing', value: 'marketing' },
                { label: 'Sales', value: 'sales' },
                { label: 'HR', value: 'hr' },
              ],
            },
          },
          {
            label: 'Join Date',
            name: 'joinDate',
            filter: {
              type: 'date',
              operator: FilterOperator.EQUALS,
            },
          },
        ],
      },
    ],
  },
]

const statuses = ['active', 'inactive', 'pending']
const departments = ['engineering', 'marketing', 'sales', 'hr']
const names = [
  'John Doe',
  'Jane Smith',
  'Bob Johnson',
  'Alice Williams',
  'Charlie Brown',
  'Diana Davis',
  'Eve Wilson',
  'Frank Miller',
]

export const gridData = Array.from({ length: 110 }, (_, i) => {
  const date = new Date(2020 + (i % 5), i % 12, (i % 28) + 1)
  return {
    id: 'id' + i,
    name: names[i % names.length] + ' ' + (Math.floor(i / names.length) + 1),
    age: 20 + (i % 50),
    status: statuses[i % statuses.length],
    isActive: i % 3 !== 0 ? 'true' : 'false',
    joinDate: date.toISOString().split('T')[0],
    department: departments[i % departments.length],
  }
})
