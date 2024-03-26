module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'import/no-unresolved': [2, { ignore: ['cc'] }],
        'no-underscore-dangle': 'off',
    },
    globals: {
        cc: true,
    },
};
