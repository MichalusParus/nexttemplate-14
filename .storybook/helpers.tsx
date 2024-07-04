import MenuItem from '@/components/atoms/common/MenuItem'
import PlusIcon from '@/components/atoms/icons/PlusIcon'
import { NextIntlClientProvider } from 'next-intl'
import { PropsWithChildren } from 'react'
import { array, date, number, object, string } from 'yup'

export const textContent =
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti ex totam blanditiis maiores itaque earum eius, delectus perferendis commodi at cupiditate quos veritatis dolore, quas optio provident ipsam debitis dignissimos eos, modi perspiciatis aspernatur aperiam nemo magnam. Quasi ex at ad eaque distinctio porro natus vitae praesentium. Libero quidem vel deleniti possimus repellendus. In optio sint accusantium quidem aspernatur qui ut necessitatibus cum quam ratione veritatis beatae eos rerum vero natus atque, ea repellat! Nemo assumenda eos accusantium voluptatum itaque alias architecto quo magni repudiandae rem libero dignissimos, tempore adipisci et officia dolor voluptate odit iusto, repellat dolore, vitae sequi? Vitae eveniet totam doloremque necessitatibus, quo cumque quam harum pariatur rem praesentium possimus natus voluptate distinctio cupiditate ut officiis. Quibusdam cumque illo iusto dolorum harum tempora voluptate consequuntur ab? Accusantium officiis molestias, at non qui alias fugiat tempore mollitia assumenda quia ipsam quae! Reprehenderit, labore quas adipisci architecto, commodi laborum iusto odio obcaecati mollitia fugit qui debitis. Fuga quasi iusto id fugiat, alias officiis reprehenderit impedit soluta culpa ipsam, tenetur voluptas dolorum perferendis est, libero eaque qui ipsum. Neque aliquam esse explicabo commodi beatae, velit accusamus, magni modi quia suscipit odit nobis nemo aut iusto rerum ex delectus architecto exercitationem atque illum. Facere saepe quidem eaque dolores et expedita pariatur, unde eum dicta soluta! Quod mollitia enim, consectetur reprehenderit vitae asperiores quo. In eum quo neque nesciunt at voluptas, labore, blanditiis hic pariatur corporis tenetur voluptatum maxime doloribus, expedita beatae nulla temporibus alias suscipit obcaecati nostrum ex cupiditate. Sint repudiandae quod asperiores? Cupiditate ipsam pariatur, eos consectetur doloremque similique, dicta nobis veritatis explicabo officiis quos, deleniti sed asperiores repudiandae vero! Rem nihil impedit ducimus dolore molestiae, ex doloribus saepe aspernatur autem atque alias, sit quaerat quasi totam repudiandae delectus cumque! Esse nihil eligendi saepe repudiandae nulla cum id ea. Dolore recusandae veritatis quidem, accusantium optio dignissimos, vero facere architecto reprehenderit eius provident sapiente soluta expedita amet omnis quibusdam dolorem sint itaque. Dolorum laboriosam reprehenderit placeat iste repudiandae quod non esse? Quae repellat assumenda iste. Nulla odit quos deleniti voluptate nemo delectus accusantium porro, ducimus vel dolore ipsam velit minima maiores dolor! Consequatur necessitatibus vitae unde vel, aut aliquam repudiandae ad ullam minus dolores magni distinctio nemo expedita odit, quisquam voluptas reprehenderit, doloremque asperiores? Modi doloremque quidem voluptates perspiciatis dolore perferendis officiis, voluptas reprehenderit laboriosam ex dignissimos! Quam dolore exercitationem consequuntur eveniet atque recusandae dignissimos autem laboriosam aperiam. Ratione, aspernatur rerum, recusandae laboriosam magni numquam delectus distinctio saepe quo autem, unde quibusdam sed optio at consequuntur fugit. Minima, aliquam autem corporis nostrum nemo eius dolore alias placeat eum ratione expedita quas, perspiciatis reprehenderit in quisquam! Repudiandae illo qui voluptas quos quo iste, eaque, amet suscipit alias omnis quam minus reprehenderit, eum ea ullam voluptatum labore dignissimos eveniet nesciunt! Vel enim asperiores eum illo ullam! Quis animi recusandae laudantium ad excepturi, culpa velit. Molestias corporis quaerat blanditiis illo veritatis, dolore eius natus eveniet unde fugiat cupiditate, quos deserunt odio, cum culpa omnis odit voluptatum. Voluptatum eius iusto, quis distinctio voluptatibus fugiat non.'

export const options = new Array(20).fill(null).map((opt, index) => ({
  label: index % 3 === 0 ? 'very long label' + (index + 1) : 'label' + (index + 1),
  value: 'value' + (index + 1),
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
}: {
  length?: number
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary' | 'terciary' | 'none'
}) => {
  return (
    <>
      {new Array(length).fill(null).map((item, index) => (
        <MenuItem
          key={index}
          linkProps={{ href: '#', variant: variant, color: color, hideShadow: true }}
        >
          {'MenuItemLink' + index}
        </MenuItem>
      ))}
    </>
  )
}

export const getPages = (length: number) => {
  return new Array(length).fill(null).map((n, index) => index + 1)
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

export const initialValues = {
  inputStory: '',
  numberStory: '',
  searchStory: '',
  dateStory: '',
  textareaStory: '',
  rangeStory: '',
  checkboxStory: '',
  checkboxGroupStory: [],
  switchGroupStory: [],
  radioGroupStory: '',
  selectStory: '',
  multiSelectStory: [],
  autocompleteStory: '',
  multiAutocompleteStory: [],
}

export const formScheme = object().shape({
  inputStory: string().required(),
  numberStory: number().required(),
  searchStory: string().required(),
  dateStory: date().required(),
  textareaStory: string().required(),
  rangeStory: number().min(20, 'min 20').required(),
  checkboxStory: string().required(),
  checkboxGroupStory: array().of(string()).min(1).min(1).required(),
  switchGroupStory: array().of(string()).min(1).required(),
  radioGroupStory: string().required(),
  selectStory: string().required(),
  multiSelectStory: array().of(string()).min(1).required(),
  autocompleteStory: string().required(),
  multiAutocompleteStory: array().of(string()).min(1).required(),
})

export const tabs = [
  {
    label: 'Label 1',
    slug: 'label1',
    component: (
      <div className="flex h-96 flex-col items-center justify-center">
        <h2 className="text-2xl" data-testid="tab1Title">
          Content 1
        </h2>
        <p className="pt-20">{textContent.slice(0, 800)}</p>
      </div>
    ),
  },
  {
    label: 'Label 2',
    slug: 'label2',
    component: (
      <div className="flex h-96 flex-col items-center justify-center">
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
      <div className="flex h-96 flex-col items-center justify-center">
        <h2 className="text-2xl" data-testid="tab3Title">
          Content 3
        </h2>
        <p>{textContent.slice(0, 800)}</p>
      </div>
    ),
  },
]

export const JestMockProvider = ({ children }: PropsWithChildren<object>) => {
  const messages = require(`../messages/en.json`)
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      {children}
    </NextIntlClientProvider>
  )
}
