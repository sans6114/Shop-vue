/** @type {import('tailwindcss').Config} */
export default {
  content: ['./node_modules/flowbite/**/*.js', './index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [require('flowbite/plugin'), require('daisyui')],
  daisyui: {
    themes: ['cupcake']
  }
}
