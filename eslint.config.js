/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
  },
};

export default config;
