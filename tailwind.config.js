/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          100: 'var(--background-paper)',
        },
        black: {
          100: 'var(--text-primary)',
          900: 'var(--very-contrast)',
        },
        blue: {
          50: 'var(--primary-main)',
        },
      },
    },
  },
  plugins: [],
};
