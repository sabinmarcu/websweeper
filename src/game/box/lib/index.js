"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.missingClickHandler = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _flag = _interopRequireDefault(require("./assets/flag.svg"));

var _mine = _interopRequireDefault(require("./assets/mine.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var missingClickHandler = function missingClickHandler() {
  throw new Error('Required!');
};

exports.missingClickHandler = missingClickHandler;
var defaultSize = 50;
var iconPercent = 60;

var Box = _styledComponents.default.div.withConfig({
  displayName: "src__Box"
})(["display:inline-block;min-width:", "px;min-height:", "px;height:", "px;width:", "px;background:", ";color:", ";box-shadow:0 0 1px rgba(0,0,0,0.2);margin:", "px;position:relative;svg{fill:currentColor;}"], function (_ref) {
  var size = _ref.size;
  return size || defaultSize;
}, function (_ref2) {
  var size = _ref2.size;
  return size || defaultSize;
}, function (_ref3) {
  var size = _ref3.size;
  return size || defaultSize;
}, function (_ref4) {
  var size = _ref4.size;
  return size || defaultSize;
}, function (_ref5) {
  var _ref5$theme = _ref5.theme,
      fg = _ref5$theme.fg,
      states = _ref5$theme.states,
      state = _ref5.state;
  return state && !['flagged', 'bombed'].includes(state) && states && states[state] || fg || '#fff';
}, function (_ref6) {
  var _ref6$theme = _ref6.theme,
      fg = _ref6$theme.fg,
      states = _ref6$theme.states,
      state = _ref6.state;
  return state && ['flagged', 'bombed'].includes(state) && states && states[state] || fg || '#fff';
}, function (_ref7) {
  var margin = _ref7.margin;
  return margin || 5;
});

var symbolShapes = {
  'default': '',
  'revealed': '',
  'flagged': _flag.default,
  'bombed': _mine.default
};

var _Symbol = _styledComponents.default.div.withConfig({
  displayName: "src___Symbol"
})(["position:absolute;left:", "px;top:", "px;width:", "px;height:", "px;"], function (_ref8) {
  var size = _ref8.size;
  return (size || defaultSize) * (100 - iconPercent) / 200;
}, function (_ref9) {
  var size = _ref9.size;
  return (size || defaultSize) * (100 - iconPercent) / 200;
}, function (_ref10) {
  var size = _ref10.size;
  return (size || defaultSize) * iconPercent / 100;
}, function (_ref11) {
  var size = _ref11.size;
  return (size || defaultSize) * iconPercent / 100;
});

var withFetchIcon = function withFetchIcon(ComposedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(FetcherComponent, _Component);

      function FetcherComponent() {
        var _ref12;

        var _temp, _this;

        _classCallCheck(this, FetcherComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref12 = FetcherComponent.__proto__ || Object.getPrototypeOf(FetcherComponent)).call.apply(_ref12, [this].concat(args))), _this.state = {}, _this.fetchIcon = function (icon) {
          return fetch(icon).then(function (res) {
            return res.text();
          }).then(function (icon) {
            return _this.setState({
              icon: icon
            });
          });
        }, _temp));
      }

      _createClass(FetcherComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          if (this.props.icon) {
            this.fetchIcon(this.props.icon);
          }
        }
      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
          if (props.icon !== this.props.icon) {
            this.fetchIcon(props.icon);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var icon = this.state.icon;

          var _props = this.props,
              propIcon = _props.icon,
              rest = _objectWithoutProperties(_props, ["icon"]);

          return _react.default.createElement(ComposedComponent, _extends({}, rest, {
            dangerouslySetInnerHTML: {
              __html: icon
            }
          }));
        }
      }]);

      return FetcherComponent;
    }(_react.Component)
  );
};

var IconSymbol = withFetchIcon(_Symbol);

var component = function component(_ref13) {
  var state = _ref13.state,
      onClick = _ref13.onClick,
      size = _ref13.size;
  return _react.default.createElement(Box, {
    onClick: onClick,
    state: state,
    size: size
  }, _react.default.createElement(IconSymbol, {
    state: state,
    size: size,
    icon: symbolShapes[state]
  }));
};

component.defaultProps = {
  state: 'default',
  onClick: missingClickHandler
};
var _default = component;
exports.default = _default;
//# sourceMappingURL=index.js.map
