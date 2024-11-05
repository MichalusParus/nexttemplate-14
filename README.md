# NextTemplate 14

App Template build with Next14, TS, Tailwind, Mongoose, NextAuth with custom ParusUI

## Demo link:

Access my site at [futureProd.com](https://futureProd.com)

## Table of Content:

- [Technologies and Libraries](#technologiesandlibraries)
- [Setup](#setup)
- [Branches](#branches)
- [Components](#components)
- [Credits](#credits)
- [License](#license)

## Technologies and libraries

- Main: `Next14`, `Typescript`
- FrontEnd: `TailwindCSS`,`Zod`,`React Hook Form`,`NextIntl`
- BackEnd: `ServerActions`,`MongoDB`,`Mongoose`
- Auth: `Next Auth`,`bcrypt`
- dev: `Prettier`, `Lint`, `Jest`, `Storybook`

## Setup

- copy the repository

- merge branches that you interested in

- run `pnpm install` for installing dependencies

- create .env file with your MONGODB_URI and NEXTAUTH_SECRET

- run `pnpm run dev` for start dev

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Other scripts

- run `pnpm run start` for start prod

- run `pnpm run build` for building app

- run `pnpm run lint` for lint

- run `pnpm run test` for unit tests

- run `pnpm run format` for prettier --watch

- run `pnpm run storybook` for starting storybook

## Branches

- `main` - main branch with merged others updated branches by topic

- `basic-setup` - basic setup with app router, eslint, prettier and tailwindCss

- `components` - custom ParusUI components

## Components

ParusUI Components are built with focus on minimal size, reusability and customization.

- `Complex` - ParusUI contains 60 components and 7 hooks.

- `LibraryFree` - ParusUI are lightweighted and fully custom builded with no additional libraries except React Hook Form, Zod and Popper.

- `Folder structure` - Components are modular and organized in atomic folder structure.

- `TailwindCSS` - Components are build with tailwindCSS for easy customization and fast performance.

- `SVG Icons` - Contains 20 common SVG icons.

- `Custom Hooks` - Contains 7 usefull custom hooks for easy develompent.

- `Localization` - I18N support with next-intl. Components have translations json files.

- `Theme` - Rich tailwind theme for easy customization.

- `DarkMode` - All components have dark mode support. Darkmode autodetect is disabled by default.

- `Props` - HTML and Next props support. ClassName for easy customization by tailwind classes. Components have style, color and size variants.

- `Refs` - All components support forwarding refs by default.

- `Storybook` - Components have rich presentation with usecases and documentation build by Storybook.

- `Tests` - Components have 178 jest unit tests.

- `WAI-ARIA` - Components have WAI-ARIA support. Components have role atributte and aria attributes if needed.

- `Keyboard support` - Components have keyboard control support with tab order and focus traps.

- `Screen readers support` - Currenctly only google SR supported.

- `Touchscreen support` - Components have swipe support with useSwipe Hook. Components have disabled hover on touchscreen devices by default.

Run Storybook for ParusUI documentation and presentation

## Credits

- [MichalusParus](github.com/MichalusParus)

## License

MIT license @[MichalusParus](github.com/MichalusParus)
