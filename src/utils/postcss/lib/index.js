module.exports = function (_ref) {
  var file = _ref.file;
  return {
    parser: function (file) {
      return file.extname || file.path && file.path.substr(file.path.lastIndexOf('.'));
    }(file) === '.sss' ? 'sugarss' : false,
    plugins: {
      'postcss-import': {},
      'postcss-normalize': {},
      'postcss-google-color': {},
      'postcss-cssnext': {},
      'postcss-font-magician': {
        variants: {
          Nunito: {
            300: [],
            100: []
          }
        },
        foundries: ['google']
      },
      autoprefixer: {},
      cssnano: {}
    }
  };
};