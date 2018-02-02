module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'ls', 'jsx'],
  testRegex: '(\\.|/)(spec)\\.(jsx?|ls)$',
  setupTestFrameworkScriptFile: '<rootDir>/test/jest.js',
  testPathIgnorePatterns: [
    'node_modules',
    'lib',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.ls$': '<rootDir>/test/livescriptProcessor.js',
  },
  unmockedModulePathPatterns: [
    'react',
    'enzyme',
    'chai-enzyme',
    'livescript',
  ],
};
