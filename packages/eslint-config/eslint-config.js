/** @module eslint-config */

module.exports = {
  plugins: ['header'],
  extends: ['standard', 'plugin:lodash-fp/recommended'],
  rules: {
    'lodash-fp/consistent-name': ['error', 'fp'],
    'no-console': 'warn'
  }
}
