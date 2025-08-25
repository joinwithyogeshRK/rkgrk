import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f6',
          100: '#ffe4ee',
          200: '#ffc9dd',
          300: '#ff9ec2',
          400: '#ff64a1',
          500: '#ff3884',
          600: '#ff1166',
          700: '#e60052',
          800: '#bd0045',
          900: '#9c003a',
          950: '#57001d',
        },
        secondary: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
          950: '#171717',
        },
        accent: {
          50: '#fff1f6',
          100: '#ffe4ee',
          200: '#ffc9dd',
          300: '#ff9ec2',
          400: '#ff64a1',
          500: '#ff3884',
          600: '#ff1166',
          700: '#e60052',
          800: '#bd0045',
          900: '#9c003a',
          950: '#57001d',
        },
        success: {
          50: '#fff1f6',
          100: '#ffe4ee',
          200: '#ffc9dd',
          300: '#ff9ec2',
          400: '#ff64a1',
          500: '#ff3884',
          600: '#ff1166',
          700: '#e60052',
          800: '#bd0045',
          900: '#9c003a',
          950: '#57001d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neumorphic': '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
        'neumorphic-inset': 'inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}

export default config