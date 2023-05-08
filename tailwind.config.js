/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      minHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      maxHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      animation: {
        'spin-pulse': 'spin 3.5s cubic-bezier(0.785, 0.135, 0.150, 0.860) infinite',
        'rotate-pulse': 'rotate-scale-up 3.5s cubic-bezier(0.785, 0.135, 0.150, 0.860) infinite',
      },
      keyframes: {
        'rotate-scale-up': {
          '0%': { transform: 'scale(1) rotateZ(0)' },
          '50%': { transform: 'scale(1.5) rotateZ(180deg)' },
          '100%': { transform: 'scale(1) rotateZ(360deg)' },
        },
      },
    },
  },
  plugins: [require('daisyui')]
}
