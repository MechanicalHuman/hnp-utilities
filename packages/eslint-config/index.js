'use strict'

module.exports = {
  root: true,
  plugins: [],

  extends: ['eslint:recommended', 'standard', 'prettier', 'prettier/standard'],

  rules: {
    'no-console': 1
  },

  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  }
}
