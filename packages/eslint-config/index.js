'use strict'

module.exports = {
  root: true,
  plugins: [
    'header',
    'standard',
    'prettier',
    'no-constructor-bind',
    'class-prefer-methods'
  ],

  extends: [
    'standard',
    'plugin:lodash-fp/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/standard'
  ],

  rules: {
    'lodash-fp/consistent-name': [2, 'fp'],
    'no-console': 1,
    'header/header': 0,
    'no-constructor-bind/no-constructor-bind': 2,
    'no-constructor-bind/no-constructor-state': 2,
    'class-prefer-methods/prefer-methods': 2
  },

  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  }
}
