/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dex: {
          bg: '#F5F0EB',
          accent: '#D96032',
          accentHover: '#bf4f24',
          accentLight: '#faece6',
          card: '#FFFFFF',
          cardMuted: '#EDE7E0',
          border: '#E2DBD2',
          borderDark: '#D1C7BA',
          text: '#111111',
          textMuted: '#555555',
          textSubtle: '#777777',
        }
      }
    },
  },
  plugins: [],
};
