module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
    'stylelint-config-prettier'
  ],
  rules: {
    'property-no-unknown': [true, { ignoreProperties: ['/^mso-table-/'] }]
  }
}
