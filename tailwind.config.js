module.exports = {
  content: [
    './src/**/*.html',
    './partials/**/*.html',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['"Source Sans Pro"', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        accent: '#5f5f5f',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      lineHeight: {
        'extra-tight': '1.1',
        'relaxed': '1.75',
      },
      letterSpacing: {
        wider: '0.1em',
        widest: '0.15em',
      }
    },
  },
  plugins: [],
};

