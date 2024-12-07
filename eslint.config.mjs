import globals from 'globals';


/** @type {import('eslint').Linter.Config} */
const config = {
  // Target all relevant file types
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts}'],
      languageOptions: {
        globals: globals.browser,
      },
      rules: {
        'no-unused-vars': 'error',
        'no-unused-expressions': 'error',
        'prefer-const': 'error',
        'no-console': 'warn',
      },
      ignores: ['node_modules', 'dist'],
      globals: {
        process: 'readonly',
      },
    },
  ],
  // Include Prettier and ESLint configurations
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TS-specific rules
    'plugin:prettier/recommended', // Enables Prettier rules
    'eslint-config-prettier', // Disables conflicting rules
  ],
};

export default config;
