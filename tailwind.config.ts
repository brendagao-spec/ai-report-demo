import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8f7ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed'
        }
      }
    }
  },
  plugins: []
};

export default config;
