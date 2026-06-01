import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        screen: {
          bg: '#020617',
          panel: '#0a1225',
          border: '#0ea5e9',
          accent: '#0ea5e9',
          cyan: '#06b6d4',
          text: '#e0f2fe',
          muted: '#64748b',
          danger: '#f43f5e',
          warning: '#f59e0b',
          success: '#10b981',
        }
      },
      fontFamily: {
        digital: ['Orbitron', 'monospace'],
        tech: ['Rajdhani', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
export default config
