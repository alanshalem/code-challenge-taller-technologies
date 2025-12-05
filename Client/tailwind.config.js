/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'neo-bg': '#0f0f0f',
        'neo-dark': '#1a1a1a',
        'neo-card': '#242424',
        'neo-purple': '#7C3AED',
        'neo-blue': '#3B82F6',
        'neo-green': '#10B981',
        'neo-red': '#EF4444',
        'neo-orange': '#F59E0B',
        'neo-accent': '#A855F7',
      },
    },
  },
  plugins: [],
}

