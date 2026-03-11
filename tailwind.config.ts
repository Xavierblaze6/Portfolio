import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'bg-subtle': '#111111',
        text: '#f0ede6',
        'text-muted': '#666666',
        accent: '#e8c547',
        border: '#1f1f1f',
      },
    },
  },
  plugins: [],
}
export default config
