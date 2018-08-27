"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)('Game Board', module).add('Default State', function () {
  return _react.default.createElement("section", null, _react.default.createElement(_index.default, {
    width: 5,
    height: 3
  }));
});