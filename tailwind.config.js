module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'scroll-thumb': 'rgba(168,85,247,0.85)', // purple-500, semi-transparent
        'scroll-thumb-hover': 'rgba(147,51,234,1)', // purple-600, solid on hover
        'scroll-track': 'rgba(34,31,61,0.7)', // dark purple, semi-transparent
        'scroll-corner': 'rgba(147,51,234,0.2)', // subtle for corner
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true
    }),
  ],
}; 