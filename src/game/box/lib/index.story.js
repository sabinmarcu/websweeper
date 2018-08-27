"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _styledComponents = require("styled-components");

var _themes = _interopRequireDefault(require("@websweeper/themes"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var clickHandler = function clickHandler() {
  return alert('Clicked!');
};

var CountComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(CountComponent, _Component);

  function CountComponent() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, CountComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = CountComponent.__proto__ || Object.getPrototypeOf(CountComponent)).call.apply(_ref, [this].concat(args))), _this.state = {
      count: 0
    }, _temp));
  }

  _createClass(CountComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var count = this.state.count;
      return _react.default.createElement("span", null, _react.default.createElement(_index.default, {
        state: state,
        onClick: function onClick() {
          return _this2.setState({
            count: count + 1
          });
        }
      }), _react.default.createElement("span", null, "Clicked : ", count));
    }
  }]);

  return CountComponent;
}(_react.Component);

var SwitchComponent =
/*#__PURE__*/
function (_Component2) {
  _inherits(SwitchComponent, _Component2);

  function SwitchComponent() {
    var _ref2;

    var _temp2, _this3;

    _classCallCheck(this, SwitchComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _possibleConstructorReturn(_this3, (_temp2 = _this3 = _possibleConstructorReturn(this, (_ref2 = SwitchComponent.__proto__ || Object.getPrototypeOf(SwitchComponent)).call.apply(_ref2, [this].concat(args))), _this3.state = {
      count: 0
    }, _temp2));
  }

  _createClass(SwitchComponent, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var count = this.state.count;
      var state = ['default', 'flagged', 'bombed', 'revealed'][count % 4];
      return _react.default.createElement("span", null, _react.default.createElement(_index.default, {
        state: state,
        onClick: function onClick() {
          return _this4.setState({
            count: count + 1
          });
        }
      }), _react.default.createElement("span", null, "State: ", state));
    }
  }]);

  return SwitchComponent;
}(_react.Component);

(0, _react2.storiesOf)('Box', module).add('Default States', function () {
  return _react.default.createElement("section", null, Object.values(_themes.default).map(function (_ref3, index, _ref4) {
    var name = _ref3.name,
        theme = _ref3.theme;
    var length = _ref4.length;
    return _react.default.createElement("section", {
      key: name
    }, _react.default.createElement("article", null, _react.default.createElement("h1", null, name), _react.default.createElement(_styledComponents.ThemeProvider, {
      theme: theme
    }, _react.default.createElement("article", null, _react.default.createElement(_index.default, null), _react.default.createElement(_index.default, {
      state: "flagged"
    }), _react.default.createElement(_index.default, {
      state: "bombed"
    }), _react.default.createElement(_index.default, {
      state: "revealed"
    })))), index !== length - 1 && _react.default.createElement("hr", null));
  }));
}).add('Click Handlers', function () {
  return _react.default.createElement("section", null, _react.default.createElement("article", null, _react.default.createElement("h1", null, "Click handlers are attached to these guys"), _react.default.createElement(CountComponent, null), _react.default.createElement(CountComponent, {
    state: "flagged"
  }), _react.default.createElement(CountComponent, {
    state: "bombed"
  }), _react.default.createElement(CountComponent, {
    state: "revealed"
  })), _react.default.createElement("hr", null), _react.default.createElement("article", null, _react.default.createElement("h1", null, "This guy will change state when clicked"), _react.default.createElement(SwitchComponent, null)));
});
//# sourceMappingURL=index.story.js.map
