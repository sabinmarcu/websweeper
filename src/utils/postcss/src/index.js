// @flow

module.exports = (
    { file }: { file: Object },
) => ({
    parser: (
        f => (f.extname || (f.path && f.path.substr(f.path.lastIndexOf('.'))))
    )(file) === '.sss' ? 'sugarss' : false,
    plugins: {
        'postcss-import': {},
        'postcss-font-magician': {},
        'postcss-url': {},
        'postcss-for': {},
        'postcss-normalize': {},
        'postcss-google-color': {},
        'postcss-flexbox': {},
        'postcss-cssnext': {},
        autoprefixer: {},
        'postcss-browser-reporter': {},
        'postcss-reporter': {},
        // cssnano: {},
    },
});
