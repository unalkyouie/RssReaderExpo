module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'prettier'
    ],
    plugins: ['@typescript-eslint', 'react', 'react-native'],
    env: {
      es6: true,
      browser: true,
      'react-native/react-native': true
    },
    settings: {
      react: { version: 'detect' }
    },
    rules: {
    }
  };