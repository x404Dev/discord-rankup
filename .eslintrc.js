module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ],
};
