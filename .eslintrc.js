module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true
    },
    extends: ['standard'],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always']
    }
};
