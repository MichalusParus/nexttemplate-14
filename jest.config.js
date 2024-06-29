const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@atoms/(.*)$': '<rootDir>/src/components/atoms/$1',
    '^@molecules/(.*)$': '<rootDir>/src/components/molecules/$1',
    '^@organisms/(.*)$': '<rootDir>/src/components/organisms/$1',
    '^@templates/(.*)$': '<rootDir>/src/components/templates/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
