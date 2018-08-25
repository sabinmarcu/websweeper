const common = require('./default');
const deepAssign = (a, b) => {
  const keys = new Set([]
    .concat(Object.keys(a))
    .concat(Object.keys(b))
  );
  return [...keys].reduce((acc, it) => {
    acc[it] =
      (typeof (a[it]) === 'object') || (typeof (b[it]) === 'object')
        ? deepAssign(a[it], b[it])
        : a[it] || b[it]
    return acc;
  }, {})
}

const ctx = require.context('./', true, /\.js$/);
const themes = ctx
  .keys()
  .filter(it => !it.match(/^\.\/(default|index)/));

module.exports = themes.reduce((prev, it) => {
  const theme = ctx(it);
  prev[it.substr(2, it.lastIndexOf('.') - 2)] = {
    name: theme.name,
    theme: deepAssign(theme.theme, common),
  };
  return prev;
}, {});
