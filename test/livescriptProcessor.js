
const livescript = require('livescript');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ls')) {
      return livescript.compile(src, { bare: true });
    }
    return src;
  },
};
