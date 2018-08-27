"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _box = _interopRequireDefault(require("@websweeper/box"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = function _default(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return _react.default.createElement("section", null, _toConsumableArray(Array(height).keys()).map(function (row) {
    return _react.default.createElement("section", {
      key: row
    }, _toConsumableArray(Array(width).keys()).map(function (column) {
      return _react.default.createElement(_box.default, {
        key: "".concat(row, "-").concat(column)
      });
    }));
  }));
};

exports.default = _default;