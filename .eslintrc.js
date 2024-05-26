module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['**/*.js', '**/*.d.ts'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['**/*.ts'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
      },
    ],
    'linebreak-style': 0,
    quotes: ['error', 'single'],
    'no-extra-semi': 'off',
    semi: ['error', 'always'],
  },
};
