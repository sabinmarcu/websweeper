module.exports = {
    extends: ['@sabinmarcu/all'],
    rules: {
        'react/prop-types': [0],
        'no-underscore-dangle': [0],
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: ['**/__test__/*.js', '**/*.spec.js'],
        }],
    },
};
