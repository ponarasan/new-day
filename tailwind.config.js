/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#060411',
        ink: '#0B071B',
        plum: '#170D2B',
        wine: '#2B1233',
        lavender: '#CDBBFF',
        blush: '#F8B9CC',
        rose: '#E98BA9',
        champagne: '#ECCE9D',
        cream: '#FFF8F0',
        muted: '#B9A9C8',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"SFMono-Regular"', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(247, 185, 204, 0.24)',
        gold: '0 0 50px rgba(236, 206, 157, 0.18)',
        card: '0 30px 100px rgba(2, 1, 10, 0.42)',
      },
      animation: {
        'spin-slow': 'spin 45s linear infinite',
        'spin-slower': 'spin 90s linear infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        'soft-pulse': 'softPulse 4s ease-in-out infinite',
        'float-y': 'floatY 7s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'sun-glow': 'sunGlow 7s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.24', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        softPulse: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(0.98)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -16px, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        sunGlow: {
          '0%, 100%': { opacity: '0.62', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.045)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
