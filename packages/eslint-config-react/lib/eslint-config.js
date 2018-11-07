/** @module eslint-config-react */

module.exports = {
  extends: ['@hnp/eslint-config', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['react'],
  env: { browser: true }
}
