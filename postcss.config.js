const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        'chrome 40',
        'edge 13',
        'firefox 40',
        'ios_saf 7',
        'safari 8',
      ],
    }),
  ],
};
