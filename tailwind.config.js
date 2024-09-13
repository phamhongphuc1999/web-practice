/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          50: 'var(--background-paper)',
        },
        black: {
          50: 'var(--text-primary)',
          100: 'var(--very-contrast)',
          150: 'var(--background-default)',
          200: 'var(--background-primary)',
          250: 'var(--background-secondary)',
        },
        blue: {
          50: 'var(--primary-main)',
        },
      },
    },
  },
  plugins: [],
};
