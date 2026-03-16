/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,md,html}"],
  theme: {
    extend: {
      colors: {
        relatio: {
          dark: '#080808',      
          dark2: '#1a1916',     
          off: '#f0ede6',       
          muted: '#a09c94',
          accent: '#e04e1b',    
          blue: '#0D6980'       
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards',
      }
    },
  },
  plugins: [],
}