module.exports = {
    root: true,
    // parser: "babel-eslint",
    parserOptions: {
        // sourceType: "module",
        // allowImportExportEverywhere: false,
        // codeFrame: false
        parser: "babel-eslint"

    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: ['plugin:vue/recommended', 'standard'],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    'rules': {
        // "semi": [0], // 结束语句需要分号
        'indent': ['error', 4], // 使用四个空格进行缩进
        'eqeqeq': 'warn', // 三个等号
        'space-before-function-paren': 'off', // 函数声明时括号与函数名间加空格，不允许有空格
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-use-less-escape': 'off',
        'vue/html-indent': ['error', 4], // 使用四个空格进行缩进
        'vue/html-attributes-per-line': 'off',
        'vue/html-self-closing': 'off',
        'vue/name-property-casing': 'off',
        'vue/require-default-prop': 'off',
        'vue/max-attributes-per-line': 'off',
        'object-curly-spacing': 'off',
        'no-tabs': 'off',
        'no-mixed-spaces-and-tabs': 'off'
    },
    globals: {
        '__DEV__': true
    }
};
