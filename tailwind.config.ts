import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gx: {
          background: '#030504',
          surface: '#0B120E',
          border: '#1A2920',
          neon: '#ccff00', // INI KUNCI UTAMANYA
          text: '#E2E8F0',
          muted: '#839689',
        }
      },
    },
  },
  plugins: [],
}
export default config