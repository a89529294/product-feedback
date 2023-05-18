/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ghost-white': '#F7F8FD',
        'cotton-ball': '#F2F4FF',
        'jewel-cave': '#3A4374',
        'rainbow-fish': '#4661E6',
        'creamy-peach': '#F49F85',
        'singapore-orchid': '#AD1FEA',
        'blue-mana': '#62BCFA',
        'ocean-night': '#647196',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 500ms ease-out ',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: (theme) => ({
        auto: 'auto',
        ...theme('spacing'),
        full: '100%',
        screen: 'calc(var(--vh) * 100)',
      }),
      minHeight: (theme) => ({
        0: '0',
        ...theme('spacing'),
        full: '100%',
        screen: 'calc(var(--vh) * 100)',
      }),
    },
  },
  plugins: [],
}
