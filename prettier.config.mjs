/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
  bracketSameLine: false,
  arrowParens: 'always',
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
