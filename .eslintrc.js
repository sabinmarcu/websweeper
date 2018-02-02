var a11y = require("eslint-plugin-jsx-a11y/lib/index.js");

module.exports = Object.assign({
    "parser": "babel-eslint",
    "extends": [
        "plugin:flowtype/recommended",
        "airbnb",
    ],
    "plugins": [ 
        "flowtype", 
        "disable",
    ],
    "settings": {
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
    rules: Object.keys(a11y.configs.recommended.rules).reduce(
        (prev, key) => ({
            ...prev,
            [key]: "off",
        })
    , {})
});