module.exports = {
  root: false,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'vue/multi-word-component-names': 'off'
    'no-console': process.env.NODE_ENV === 'production',
    'no-debugger': process.env.NODE_ENV === 'production',
    'no-unused-vars': process.env.NODE_ENV === 'production',
    'vue/multi-word-component-names': 'off'
  }
}
