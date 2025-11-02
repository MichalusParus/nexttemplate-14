import { Divider } from '@/components/atoms/common/Divider'
import { Label } from '@/components/atoms/common/Label'
import { PlusIcon, ProfileIcon } from '@/components/atoms/icons'
import { DateButtonType } from '@/components/molecules/common/Calendar/DayPicker'
import { AutocompleteField } from '@/components/molecules/form/comboboxes/AutocompleteField'
import { DatePickerField } from '@/components/molecules/form/comboboxes/DatePickerField'
import { MultiAutocompleteField } from '@/components/molecules/form/comboboxes/MultiAutocompleteField'
import { MultiDatePickerField } from '@/components/molecules/form/comboboxes/MultiDatePickerField'
import { MultiSelectField } from '@/components/molecules/form/comboboxes/MultiSelectField'
import { RangeDatePickerField } from '@/components/molecules/form/comboboxes/RangeDatePickerField'
import { SelectField } from '@/components/molecules/form/comboboxes/SelectField'
import { Form } from '@/components/molecules/form/forms/Form'
import { CheckboxField } from '@/components/molecules/form/inputs/CheckboxField'
import { CheckboxGroupField } from '@/components/molecules/form/inputs/CheckboxGroupField'
import { FileField } from '@/components/molecules/form/inputs/FileField'
import { MultiToggleGroupField } from '@/components/molecules/form/inputs/MultiToggleGroupField'
import { NumberField } from '@/components/molecules/form/inputs/NumberField'
import { PasswordField } from '@/components/molecules/form/inputs/PasswordField'
import { RadioGroupField } from '@/components/molecules/form/inputs/RadioGroupField'
import { RangeField } from '@/components/molecules/form/inputs/RangeField'
import { SearchField } from '@/components/molecules/form/inputs/SearchField'
import { TextAreaField } from '@/components/molecules/form/inputs/TextAreaField'
import { TextField } from '@/components/molecules/form/inputs/TextField'
import { ToggleGroupField } from '@/components/molecules/form/inputs/ToggleGroupField'
import {
  MenuItemButton,
  MenuItemCheckbox,
  MenuItemRadioGroup,
} from '@/components/molecules/popovers/Menu/items'
import { MenuOptionGroupType, MenuOptionType } from '@/components/molecules/popovers/Menu/types'
import { TabOption } from '@/components/organisms/common/Tabs/TabList'
import { OptionGroupType, OptionType, StyleProps } from '@/components/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const getDaysInMonth = (weekStart: 0 | 1) => {
  const daysToDisplay = eachDayOfInterval({
    start: startOfWeek(startOfMonth(new Date('2023-01-15')), { weekStartsOn: weekStart }),
    end: endOfWeek(endOfMonth(new Date('2023-01-15')), { weekStartsOn: weekStart }),
  })
    .map((day, index) => ({
      day,
      isSelected: index === 0,
      isCurrent: isSameMonth(day, new Date('2023-01-15')),
      isDisabled: index === 5,
    }))
    .reduce((weeks: DateButtonType[][], day, index: number) => {
      if (index % 7 === 0) {
        weeks.push([day])
      } else {
        weeks[weeks.length - 1].push(day)
      }
      return weeks
    }, [])
  return daysToDisplay
}

export const textContent =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti ex totam blanditiis maiores itaque earum eius, delectus perferendis commodi at cupiditate quos veritatis dolore, quas optio provident ipsam debitis dignissimos eos, modi perspiciatis aspernatur aperiam nemo magnam. Quasi ex at ad eaque distinctio porro natus vitae praesentium. Libero quidem vel deleniti possimus repellendus. In optio sint accusantium quidem aspernatur qui ut necessitatibus cum quam ratione veritatis beatae eos rerum vero natus atque, ea repellat! Nemo assumenda eos accusantium voluptatum itaque alias architecto quo magni repudiandae rem libero dignissimos, tempore adipisci et officia dolor voluptate odit iusto, repellat dolore, vitae sequi? Vitae eveniet totam doloremque necessitatibus, quo cumque quam harum pariatur rem praesentium possimus natus voluptate distinctio cupiditate ut officiis. Quibusdam cumque illo iusto dolorum harum tempora voluptate consequuntur ab? Accusantium officiis molestias, at non qui alias fugiat tempore mollitia assumenda quia ipsam quae! Reprehenderit, labore quas adipisci architecto, commodi laborum iusto odio obcaecati mollitia fugit qui debitis. Fuga quasi iusto id fugiat, alias officiis reprehenderit impedit soluta culpa ipsam, tenetur voluptas dolorum perferendis est, libero eaque qui ipsum. Neque aliquam esse explicabo commodi beatae, velit accusamus, magni modi quia suscipit odit nobis nemo aut iusto rerum ex delectus architecto exercitationem atque illum. Facere saepe quidem eaque dolores et expedita pariatur, unde eum dicta soluta! Quod mollitia enim, consectetur reprehenderit vitae asperiores quo. In eum quo neque nesciunt at voluptas, labore, blanditiis hic pariatur corporis tenetur voluptatum maxime doloribus, expedita beatae nulla temporibus alias suscipit obcaecati nostrum ex cupiditate. Sint repudiandae quod asperiores? Cupiditate ipsam pariatur, eos consectetur doloremque similique, dicta nobis veritatis explicabo officiis quos, deleniti sed asperiores repudiandae vero! Rem nihil impedit ducimus dolore molestiae, ex doloribus saepe aspernatur autem atque alias, sit quaerat quasi totam repudiandae delectus cumque! Esse nihil eligendi saepe repudiandae nulla cum id ea. Dolore recusandae veritatis quidem, accusantium optio dignissimos, vero facere architecto reprehenderit eius provident sapiente soluta expedita amet omnis quibusdam dolorem sint itaque. Dolorum laboriosam reprehenderit placeat iste repudiandae quod non esse? Quae repellat assumenda iste. Nulla odit quos deleniti voluptate nemo delectus accusantium porro, ducimus vel dolore ipsam velit minima maiores dolor! Consequatur necessitatibus vitae unde vel, aut aliquam repudiandae ad ullam minus dolores magni distinctio nemo expedita odit, quisquam voluptas reprehenderit, doloremque asperiores? Modi doloremque quidem voluptates perspiciatis dolore perferendis officiis, voluptas reprehenderit laboriosam ex dignissimos! Quam dolore exercitationem consequuntur eveniet atque recusandae dignissimos autem laboriosam aperiam. Ratione, aspernatur rerum, recusandae laboriosam magni numquam delectus distinctio saepe quo autem, unde quibusdam sed optio at consequuntur fugit. Minima, aliquam autem corporis nostrum nemo eius dolore alias placeat eum ratione expedita quas, perspiciatis reprehenderit in quisquam! Repudiandae illo qui voluptas quos quo iste, eaque, amet suscipit alias omnis quam minus reprehenderit, eum ea ullam voluptatum labore dignissimos eveniet nesciunt! Vel enim asperiores eum illo ullam! Quis animi recusandae laudantium ad excepturi, culpa velit. Molestias corporis quaerat blanditiis illo veritatis, dolore eius natus eveniet unde fugiat cupiditate, quos deserunt odio, cum culpa omnis odit voluptatum. Voluptatum eius iusto, quis distinctio voluptatibus fugiat non.'

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

export const tileData = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  title: `Title ${i}`,
}))

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

export const MenuLinks = ({
  length = 5,
  variant,
  color,
  index,
}: {
  index?: number
  length?: number
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'inline' | 'none'
}) => {
  const [value, setValue] = useState<string[]>([])
  const [radioValue, setRadioValue] = useState<string>('label2')

  return (
    <>
      <MenuItemRadioGroup
        name={'menuRadioStory' + index}
        options={getOptions(`menuRadioStory${index}`, 5)}
        value={radioValue}
        variant={variant}
        color={color}
        onChange={v => setRadioValue(v)}
      />
      <li className="py-4" role="presentation">
        <Divider className="px-8" />
      </li>
      <MenuItemCheckbox
        name={'menuCheckboxStory1' + index}
        variant={variant}
        color={color}
        isChecked={value.includes('1')}
        onClick={() =>
          setValue(value.includes('1') ? value.filter(v => v !== '1') : [...value, '1'])
        }
      >
        MenuCheckbox1
      </MenuItemCheckbox>
      <MenuItemCheckbox
        name={'menuCheckboxStory2' + index}
        variant={variant}
        color={color}
        isChecked={value.includes('2')}
        onClick={() =>
          setValue(value.includes('2') ? value.filter(v => v !== '2') : [...value, '2'])
        }
      >
        MenuCheckbox2
      </MenuItemCheckbox>
      <MenuItemCheckbox
        name={'menuCheckboxStory3' + index}
        variant={variant}
        color={color}
        isChecked={value.includes('3')}
        onClick={() =>
          setValue(value.includes('3') ? value.filter(v => v !== '3') : [...value, '3'])
        }
      >
        MenuCheckbox3
      </MenuItemCheckbox>
      <li className="py-4" role="presentation">
        <Divider className="px-8" />
      </li>
      {Array.from({ length: length }, (_, i) => (
        <MenuItemButton key={i + 'btn' + index} variant={variant} color={color} hideShadow>
          {'MenuItemButton' + i}
        </MenuItemButton>
      ))}
    </>
  )
}

export const routerMock = {
  nextjs: {
    appDirectory: true,
    router: {
      navigation: {
        basePath: '/',
      },
    },
  },
}

export const accordionOptions = [
  {
    title: 'Disclosure Title 1',
    content: textContent.slice(0, 500),
    expanded: true,
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

export const getGalleryItems = (length: number) => {
  const srcs = [
    'https://picsum.photos/1600/900',
    'https://picsum.photos/1600/800',
    'https://picsum.photos/900/800',
    'https://picsum.photos/1200/900',
  ]
  return Array.from({ length: length }, (_, i) => ({
    src: srcs[i % 4],
    alt: 'img' + (i + 1),
  }))
}

export const gridDoubleColsDef = [
  {
    label: 'Column Head 1',
    name: 'col1',
    width: '400px',
    grow: true,
    columns: [
      {
        label: 'Subcol Head 1',
        name: 'name1',
        width: '250px',
        grow: true,
      },
      {
        label: 'Num 2',
        name: 'name2',
        width: '150px',
        shrink: true,
      },
    ],
  },
  {
    label: 'Column Head 2',
    name: 'col2',
    width: '500px',
    columns: [
      {
        label: 'Subcol Head 3',
        name: 'name3',
        width: '250px',
        shrink: true,
      },
      {
        label: 'Subcol Head 4',
        name: 'name4',
        width: '250px',
        shrink: true,
      },
    ],
  },
]
export const gridColsDef = [
  {
    label: 'Column Head 1',
    name: 'name1',
    width: '250px',
    grow: true,
  },
  {
    label: 'Num 2',
    name: 'name2',
    width: '150px',
  },
  {
    label: 'Column Head 3',
    name: 'name3',
    width: '250px',
  },
  {
    label: 'Column Head 4',
    name: 'name4',
    width: '250px',
  },
]

export const gridCleanColsDef = [
  {
    label: 'Column Head 1',
    name: 'name1',
    width: '250px',
    grow: true,
    hideFilter: true,
    hideSort: true,
  },
  {
    label: 'Num 2',
    name: 'name2',
    width: '150px',
    hideFilter: true,
    hideSort: true,
  },
  {
    label: 'Column Head 3',
    name: 'name3',
    width: '250px',
    hideFilter: true,
    hideSort: true,
  },
  {
    label: 'Column Head 4',
    name: 'name4',
    width: '250px',
    hideFilter: true,
    hideSort: true,
  },
]

export const gridData = Array.from({ length: 110 }, (_, i) => ({
  id: 'id' + i,
  name1: 'col1 data ' + (i + 1),
  name2: i + 1,
  name3: 'col2 data ' + (110 - i),
  name4: 'col4 data ' + (110 - i),
}))

export const titleSizeVariants: ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl')[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
]

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
      <Label name="checkboxStory" label="Fake label:" fakeLabel>
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
  setAutocompleteFilter: (value: any) => void
  setMultiAutocompleteFilter: (value: any) => void
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
        onInputChange={(value: string) => setAutocompleteFilter({ label: value })}
      />
      <MultiAutocompleteField
        name="multiAutocompleteStory"
        label="MultiAutocomplete:"
        placeholder="multiAutocomplete"
        options={multiAutocompleteOptions}
        onInputChange={(value: string) => setMultiAutocompleteFilter({ label: value })}
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

export const initialValues = {
  ...inputFormDefaultValues,
  ...radioFormDefaultValues,
  ...comboboxFormDefaultValues,
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
  dateStory: z.date(),
  dateRangeStory: z.object({ start: z.date(), end: z.date() }),
  dateMultiStory: z.array(z.date()).min(1),
  selectStory: z.string().min(1),
  multiSelectStory: z.array(z.string()).min(1),
  autocompleteStory: z.string().min(1),
  multiAutocompleteStory: z.array(z.string()).min(1),
})

export const formSchema = inputSchema.merge(radioSchema).merge(comboboxSchema)

export const tabs: TabOption<string>[] = [
  {
    label: 'Label 1',
    value: 'label1',
    component: (
      <div className="flex h-96 flex-col items-center justify-start">
        <h2 className="text-2xl" data-testid="tab1Title">
          Content 1
        </h2>
        <p className="pt-20">{textContent.slice(0, 100)}</p>
      </div>
    ),
  },
  {
    label: 'Label 2',
    value: 'label2',
    component: (
      <div className="flex h-96 flex-col items-center justify-start">
        <h2 className="text-2xl" data-testid="tab2Title">
          Content 2
        </h2>
        <p>{textContent.slice(0, 800)}</p>
      </div>
    ),
  },
  {
    label: 'Label 3',
    value: 'label3',
    component: (
      <div className="flex h-96 flex-col items-center justify-start">
        <h2 className="text-2xl" data-testid="tab3Title">
          Content 3
        </h2>
        <p>{textContent.slice(0, 800)}</p>
      </div>
    ),
  },
]

export const breadcrumbOptions = [
  { label: 'Users', href: '/' },
  { label: 'Favourite', href: '/favourite' },
  { label: 'Bffs', href: '/bffs' },
]

export const JestFormProvider = ({
  className,
  fields,
  values,
  required,
  onSubmit = () => {},
  children,
}: PropsWithChildren<{
  className?: string
  fields: string[]
  values?: any[]
  required?: boolean
  onSubmit?: (v: any) => void
}>) => {
  const zodFields = Object.fromEntries(fields.map(field => [field, z.unknown()]))
  const schema = z.object(zodFields)
  const formValues = Object.fromEntries(fields.map((field, i) => [field, values?.[i]]))
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formValues,
  })

  return (
    <Form className={className} name="jestForm" form={form} onSubmit={onSubmit}>
      {children}
    </Form>
  )
}
