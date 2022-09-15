module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true
    },
    extends: ['standard'],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: ['jest'],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
    }
};
