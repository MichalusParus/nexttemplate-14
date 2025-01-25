import { Divider } from '@/components/atoms/common/Divider'
import { PlusIcon } from '@/components/atoms/icons'
import { Form } from '@/components/molecules/form/Form'
import {
  MenuItemButton,
  MenuItemCheckbox,
  MenuItemRadioGroup,
} from '@/components/molecules/popovers/Menu/items'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const textContent =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti ex totam blanditiis maiores itaque earum eius, delectus perferendis commodi at cupiditate quos veritatis dolore, quas optio provident ipsam debitis dignissimos eos, modi perspiciatis aspernatur aperiam nemo magnam. Quasi ex at ad eaque distinctio porro natus vitae praesentium. Libero quidem vel deleniti possimus repellendus. In optio sint accusantium quidem aspernatur qui ut necessitatibus cum quam ratione veritatis beatae eos rerum vero natus atque, ea repellat! Nemo assumenda eos accusantium voluptatum itaque alias architecto quo magni repudiandae rem libero dignissimos, tempore adipisci et officia dolor voluptate odit iusto, repellat dolore, vitae sequi? Vitae eveniet totam doloremque necessitatibus, quo cumque quam harum pariatur rem praesentium possimus natus voluptate distinctio cupiditate ut officiis. Quibusdam cumque illo iusto dolorum harum tempora voluptate consequuntur ab? Accusantium officiis molestias, at non qui alias fugiat tempore mollitia assumenda quia ipsam quae! Reprehenderit, labore quas adipisci architecto, commodi laborum iusto odio obcaecati mollitia fugit qui debitis. Fuga quasi iusto id fugiat, alias officiis reprehenderit impedit soluta culpa ipsam, tenetur voluptas dolorum perferendis est, libero eaque qui ipsum. Neque aliquam esse explicabo commodi beatae, velit accusamus, magni modi quia suscipit odit nobis nemo aut iusto rerum ex delectus architecto exercitationem atque illum. Facere saepe quidem eaque dolores et expedita pariatur, unde eum dicta soluta! Quod mollitia enim, consectetur reprehenderit vitae asperiores quo. In eum quo neque nesciunt at voluptas, labore, blanditiis hic pariatur corporis tenetur voluptatum maxime doloribus, expedita beatae nulla temporibus alias suscipit obcaecati nostrum ex cupiditate. Sint repudiandae quod asperiores? Cupiditate ipsam pariatur, eos consectetur doloremque similique, dicta nobis veritatis explicabo officiis quos, deleniti sed asperiores repudiandae vero! Rem nihil impedit ducimus dolore molestiae, ex doloribus saepe aspernatur autem atque alias, sit quaerat quasi totam repudiandae delectus cumque! Esse nihil eligendi saepe repudiandae nulla cum id ea. Dolore recusandae veritatis quidem, accusantium optio dignissimos, vero facere architecto reprehenderit eius provident sapiente soluta expedita amet omnis quibusdam dolorem sint itaque. Dolorum laboriosam reprehenderit placeat iste repudiandae quod non esse? Quae repellat assumenda iste. Nulla odit quos deleniti voluptate nemo delectus accusantium porro, ducimus vel dolore ipsam velit minima maiores dolor! Consequatur necessitatibus vitae unde vel, aut aliquam repudiandae ad ullam minus dolores magni distinctio nemo expedita odit, quisquam voluptas reprehenderit, doloremque asperiores? Modi doloremque quidem voluptates perspiciatis dolore perferendis officiis, voluptas reprehenderit laboriosam ex dignissimos! Quam dolore exercitationem consequuntur eveniet atque recusandae dignissimos autem laboriosam aperiam. Ratione, aspernatur rerum, recusandae laboriosam magni numquam delectus distinctio saepe quo autem, unde quibusdam sed optio at consequuntur fugit. Minima, aliquam autem corporis nostrum nemo eius dolore alias placeat eum ratione expedita quas, perspiciatis reprehenderit in quisquam! Repudiandae illo qui voluptas quos quo iste, eaque, amet suscipit alias omnis quam minus reprehenderit, eum ea ullam voluptatum labore dignissimos eveniet nesciunt! Vel enim asperiores eum illo ullam! Quis animi recusandae laudantium ad excepturi, culpa velit. Molestias corporis quaerat blanditiis illo veritatis, dolore eius natus eveniet unde fugiat cupiditate, quos deserunt odio, cum culpa omnis odit voluptatum. Voluptatum eius iusto, quis distinctio voluptatibus fugiat non.'

export const getOptions = (name?: string, length?: number) =>
  new Array(length || 20).fill(null).map((opt, index) => ({
    label: index % 3 === 0 ? 'Very long label' + (index + 1) : 'Label' + (index + 1),
    value: 'value' + (index + 1) + (name ? name : ''),
  }))

export const optionsWithContent = new Array(20).fill(null).map((opt, index) => ({
  label: index % 3 === 0 ? 'very long label' + (index + 1) : 'label' + (index + 1),
  value: 'value' + (index + 1),
  content: (
    <div className="flex w-full items-center">
      <div>
        <p>label {index + 1}</p>
        <p className="text-sm">{textContent.slice(0, 21)}</p>
      </div>
      <PlusIcon />
    </div>
  ),
}))

export const tileData = new Array(200).fill(0).map((_, i) => ({
  id: i,
  title: `Title ${i}`,
}))

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
        <Divider />
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
        <Divider />
      </li>
      {new Array(length).fill(null).map((item, i) => (
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
    content: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
  {
    title: 'Disclosure Title 2',
    content: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
  {
    title: 'Disclosure Title 3',
    content: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
  {
    title: 'Disclosure Title 4',
    content: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
  {
    title: 'Disclosure Title 5',
    content: <div className="p-4">{textContent.slice(0, 500)}</div>,
  },
]

export const getGalleryItems = (length: number) => {
  return new Array(length).fill(null).map((_, index) => ({
    src: 'https://picsum.photos/1600/900',
    alt: 'img' + (index + 1),
  }))
}

export const galleryItems = new Array(10).fill(null).map((_, index) => ({
  src: 'https://picsum.photos/1600/900',
  alt: 'img' + (index + 1),
}))

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

export const gridData = new Array(110).fill(null).map((data, index) => ({
  id: 'id' + index,
  name1: 'col1 data ' + (index + 1),
  name2: index + 1,
  name3: 'col2 data ' + (110 - index),
  name4: 'col4 data ' + (110 - index),
}))

export const titleSizeVariants: ('none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl')[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
]

export const formSchema = z.object({
  inputStory: z.string().min(1),
  numberStory: z.number().min(1),
  searchStory: z.string().min(1),
  passwordStory: z.string().min(1),
  dateStory: z.date(),
  dateRangeStory: z.object({ start: z.date(), end: z.date() }),
  dateMultiStory: z.array(z.date()).min(1),
  textareaStory: z.string().min(1),
  rangeStory: z.number().min(20),
  checkboxStory: z.string().min(1),
  checkboxGroupStory: z.array(z.string()).min(1),
  switchGroupStory: z.array(z.string()).min(1),
  radioGroupStory: z.string().min(1),
  selectStory: z.string().min(1),
  multiSelectStory: z.array(z.string()).min(1),
  autocompleteStory: z.string().min(1),
  multiAutocompleteStory: z.array(z.string()).min(1),
})

export const initialValues = {
  inputStory: '',
  numberStory: undefined,
  searchStory: '',
  dateStory: undefined,
  dateRangeStory: { start: undefined, end: undefined },
  dateMultiStory: [],
  textareaStory: '',
  rangeStory: 0,
  checkboxStory: '',
  checkboxGroupStory: [],
  switchGroupStory: [],
  radioGroupStory: '',
  selectStory: '',
  multiSelectStory: [],
  autocompleteStory: '',
  multiAutocompleteStory: [],
}

export const tabs = [
  {
    label: 'Label 1',
    slug: 'label1',
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
    slug: 'label2',
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
    slug: 'label3',
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
