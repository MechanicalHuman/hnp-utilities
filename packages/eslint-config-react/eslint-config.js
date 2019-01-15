/** @module eslint-config-hnp-react */

module.exports = {
  extends: ['eslint-config-hnp', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['react'],
  env: { browser: true }
}
