const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/.jest/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// For pnpm compatibility, we need to export as async function
module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)()
  return {
    ...jestConfig,
    // Override transformIgnorePatterns to transform next-intl and use-intl
    // This pattern works with pnpm's .pnpm directory structure
    transformIgnorePatterns: [
      'node_modules/(?!(.pnpm/)?next-intl|(.pnpm/)?use-intl)',
    ],
  }
}
