/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { mine: { ink: '#101b23', panel: '#172630', line: '#263b46', cyan: '#70d7d1', lime: '#c8e66c' } } } },
  plugins: [],
}