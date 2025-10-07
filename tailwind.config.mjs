/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#fefdfb',
          100: '#fbf8f2',
          200: '#f5eed9',
          300: '#ece0b8',
          400: '#ddc888',
          500: '#c9a96e',
          600: '#b4925a',
          700: '#97784a',
          800: '#7c6340',
          900: '#665237',
        },
        sage: {
          50: '#f4f8f3',
          100: '#e7f1e4',
          200: '#d0e3cb',
          300: '#aecfa6',
          400: '#84b679',
          500: '#67ac5b',
          600: '#559047',
          700: '#467439',
          800: '#3a5d30',
          900: '#314d29',
        },
        warm: {
          50: '#fef8eb',
          100: '#fdefcd',
          200: '#fbdc97',
          300: '#f8c462',
          400: '#f5a93a',
          500: '#f29020',
          600: '#e06f15',
          700: '#bc5215',
          800: '#964218',
          900: '#7a3817',
        },
        forest: {
          50: '#f3f7f2',
          100: '#e3efe1',
          200: '#c9dfc4',
          300: '#a0c698',
          400: '#6fa665',
          500: '#4e8840',
          600: '#3e6d32',
          700: '#335629',
          800: '#2c4523',
          900: '#25391e',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sage-gradient': 'linear-gradient(135deg, #67ac5b 0%, #559047 100%)',
        'earth-gradient': 'linear-gradient(135deg, #c9a96e 0%, #97784a 100%)',
        'warm-gradient': 'linear-gradient(135deg, #f8c462 0%, #e06f15 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'sage': '0 4px 14px 0 rgba(103, 172, 91, 0.25)',
        'warm': '0 4px 14px 0 rgba(242, 144, 32, 0.25)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-left': 'slideLeft 0.8s ease-out',
        'slide-right': 'slideRight 0.8s ease-out',
        'scale-up': 'scaleUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounceSoft 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}