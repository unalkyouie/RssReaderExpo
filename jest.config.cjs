module.exports = {
    preset: 'react-native',               
    setupFiles: ['<rootDir>/jest/setup.js'], 
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-navigation|@tanstack/react-query)/)',
    ],
    moduleNameMapper: {
      '^jest/(.*)$': '<rootDir>/jest/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  };