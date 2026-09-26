module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    // Allow leading-underscore names for intentionally unused params (e.g. _req)
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // console.log is fine in a backend
    'no-console': 'off',
  },
};
