"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getBannerLine = function getBannerLine(bannerSignature) {
  var bannerSymbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
  var bannerThickness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  var bannerSize = bannerSignature.length + bannerThickness * 2 + 4;
  return "".concat(new Array(bannerSize + 1).join(bannerSymbol));
};

var _default = function _default(bannerSignature) {
  var bannerSymbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
  var bannerThickness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  var bannerLine = getBannerLine(bannerSignature, bannerSymbol);
  var bannerLinePrefix = '  * ';
  var bannerBuffer = new Array(bannerThickness - 1).join("".concat(bannerLinePrefix).concat(bannerLine, "\n"));
  var bannerGutter = new Array(bannerThickness + 1).join(bannerSymbol);
  var bannerEmptyLine = "".concat(bannerLinePrefix).concat(bannerGutter).concat(new Array(bannerSignature.length + 5).join(' ')).concat(bannerGutter, "\n");
  var bannerTextLine = "".concat(bannerLinePrefix).concat(bannerGutter, "  ").concat(bannerSignature, "  ").concat(bannerGutter, "\n");
  return "/** ".concat(bannerLine, "\n").concat(bannerBuffer).concat(bannerEmptyLine).concat(bannerTextLine).concat(bannerEmptyLine).concat(bannerBuffer).concat(bannerLinePrefix).concat(bannerLine, " */\n");
};

exports.default = _default;
//# sourceMappingURL=banner.js.map
