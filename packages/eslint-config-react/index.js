'use strict'

const restrictedGlobals = require('confusing-browser-globals')

module.exports = {
  root: true,
  extends: [
    'eslint-config-hnp',
    'plugin:react/recommended',
    'prettier',
    'prettier/standard',
    'prettier/react'
  ],

  parser: 'babel-eslint',

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  settings: {
    react: {
      version: 'detect'
    }
  },

  plugins: ['import', 'react'],

  rules: {
    'no-restricted-globals': ['error'].concat(restrictedGlobals)
  }
}
