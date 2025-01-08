/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '600px',
      sm: '760px',
      md: '960px',
      lg: '1280px',
      xl: '1440px',
    },
    extend: {
      colors: {
        grey: {
          50: 'var(--background-paper)',
          100: 'var(--secondary-main)',
        },
        black: {
          50: 'var(--text-primary)',
          100: 'var(--very-contrast)',
          150: 'var(--background-default)',
          200: 'var(--background-primary)',
          250: 'var(--background-secondary)',
          300: 'var(--very-contrast)',
        },
        blue: {
          50: 'var(--primary-main)',
          100: 'var(--primary-light)',
        },
        green: {
          50: 'var(--success)',
        },
        yellow: {
          50: 'var(--warning)',
        },
        red: {
          50: 'var(--error)',
        },
      },
    },
  },
  plugins: [],
};
