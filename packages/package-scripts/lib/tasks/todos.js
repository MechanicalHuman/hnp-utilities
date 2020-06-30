'use strict'

const execa = require('execa')
const utils = require('../utils')
const { TODO_PATH } = require('../constants')

const opts = ['*/**', ...utils.ignore(), '-Sx', '--reporter', 'vscode']

module.exports = ctx =>
  execa('leasot', opts).then(({ stdout: todos }) =>
    utils.writeFile(TODO_PATH, todos)
  )
