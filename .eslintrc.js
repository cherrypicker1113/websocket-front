module.exports = {
  env: {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'project': './tsconfig.json',
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 13,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
