const path = require('path');

module.exports = {
  // Only resolve .js and .jsx files.
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'app/spectacle': path.resolve(__dirname, 'app/spectacle'),
    },
  }
};
