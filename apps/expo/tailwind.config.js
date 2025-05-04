// @ts-check
const { theme } = require('app/design/tailwind/theme')
const gluestackPlugin = require("@gluestack-ui/nativewind-utils/tailwind-plugin");


/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./App.tsx', '../../packages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    ...theme,
  },
  plugins: [gluestackPlugin],
}
