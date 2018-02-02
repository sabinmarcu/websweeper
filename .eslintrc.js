var a11y = require("eslint-plugin-jsx-a11y/lib/index.js");
var path = require("path");

module.exports = Object.assign({
    "parser": "babel-eslint",
    "extends": [
        // "plugin:flowtype/recommended",
        "plugin:monorepo/recommended",
        "airbnb",
    ],
    "plugins": [
        // "flowtype",
        "disable",
        "monorepo",
    ],
    "settings": {
        "import/resolver": {
          "node-extended": {
            "paths": [
              path.resolve(__dirname),
            ],
            "moduleDirectory": [
              "node-modules",
              "packages"
            ]
          }
        },
        "eslint-plugin-disable": {
            "paths": {
                "jsx-a11y": [ "*" ],
            },
        },
    },
    "env": {
        "browser": true,
        "jest": true,
    },
}, {
    rules: Object.assign(
        Object.keys(a11y.configs.recommended.rules).reduce(
            (prev, key) => Object.assign({},
                prev,
                { [key]: "off" }
            )
        , {}),
        {
        // Add more here, if needed
          "react/default-props-match-prop-types": [1, { "allowRequiredDefaults": true }],
        }
    ),
});
