const basePreset = require('@sabinmarcu/babel-preset');

const generator = (useReact = false) =>
    (api) => {
        const base = basePreset(api);

        if (api && api.cache) {
            api.cache(false);
        }

        if (useReact) {
            base.presets = [['@babel/preset-env', { modules: false }]].concat(
                base.presets.filter(preset => (preset.indexOf('env') < 0)),
            );
            base.plugins = ['react-hot-loader/babel'].concat(base.plugins || []);
        }

        base.plugins = [
            '@babel/plugin-proposal-decorators',
            ['@babel/plugin-proposal-class-properties', { loose: true }],
        ].concat(
            (base.plugins || [])
                .filter(it => it !== '@babel/plugin-proposal-decorators' && (it[0] ? it[0] !== '@babel/plugin-proposal-decorators' : true))
        );

        return base;
    };

module.exports = generator();
module.exports.generator = generator;
