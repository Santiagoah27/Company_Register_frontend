module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime)'],
};