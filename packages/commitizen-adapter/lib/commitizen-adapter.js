/* eslint-disable no-console */
/**
 *
 * @summary A commitizen adapter
 * @author Jorge Proaño
 *
 * Created at     : 2018-08-28 17:17:02
 *
 * Heavily inspired by:
 *  - https://github.com/commitizen/cz-conventional-changelog
 *  - https://github.com/commitizen/cz-cli
 *  - https://github.com/leonardoanalista/cz-customizable
 *  - https://github.com/ngryman/cz-emoji
 */

'use strict'

const readPkg = require('read-pkg-up')
const wrap = require('wrap-ansi')
const truncate = require('cli-truncate')
const termSize = require('term-size')
const fp = require('lodash/fp')
const chalk = require('chalk')
const types = require('./types.json')

const LIMIT = 100
const MAX = fp.pipe(
  () => termSize(),
  term => term.columns || LIMIT,
  v => (v > LIMIT ? LIMIT : v)
)()

const MAX_DESC = types.reduce(lengthReducer, 0)
const SEPARATOR = { type: 'separator' }
const NONE = { name: ['none'], value: '' }

/**
 * Export an object containing a `prompter` method. This object is used by `commitizen`.
 *
 * @type {Object}
 */
module.exports = {
  prompter: function (cz, commit) {
    loadScopes()
      .then(createQuestions)
      .then(cz.prompt)
      .then(cancel)
      .then(format)
      .then(printCommit)
      .then(commit)
      .catch(err => console.error(err))
      .catch(() => console.error('😔  Commit has been canceled.'))
  }
}

/**
 * Loads the Custom Scopes
 *
 * @returns {Promise<string[]>} Project Scopes.
 */
function loadScopes() {
  return readPkg()
    .then(fp.getOr([], 'packageJson.config.scopes'))
    .then(scopes => (Array.isArray(scopes) ? scopes : []))
    .catch(() => [])
}

/**
 * Parses the types to create a pretty choice
 */
function getChoices() {
  const name = choice => fp.padStart(MAX_DESC)(choice.value)
  const desc = choice => wrap(choice.description, MAX)
  return types.map(choice => {
    if (choice.value === 'separator') return SEPARATOR
    return {
      name: `${name(choice)}  ${choice.emoji}  ${desc(choice)}`,
      value: choice.value,
      short: name(choice)
    }
  })
}

function shouldSkip(answers) {
  if (answers.type === 'WIP') return true

  const defaultAnswers = [
    'Passing lint rules.',
    'Updated Deployments.',
    'Updated Dependencies.',
    'Updated Environment definition.',
    'Updated Scripts.',
    'Updated Build system.',
    'Updated VsCode configuration.',
    'Updated Github Actions',
    'Changed Linting rules'
  ]

  if (defaultAnswers.includes(answers.subject.trim())) return true

  return false
}

/**
 * Create inquirer.js questions object trying to read `types` and `scopes` from the current project
 * `package.json` falling back to nice default :)
 *
 * @param {Object} scopes Result of the `loadScopes` returned promise
 * @return {Array} Return an array of `inquirer.js` questions
 * @private
 */
function createQuestions(scopes) {
  const hasScopes = ({ type }) =>
    fp.pipe(
      fp.find(['value', type]),
      fp.getOr([], 'scopes'),
      fp.concat(scopes),
      v => v.length > 0
    )(types)

  return [
    {
      type: 'list',
      name: 'type',
      message: "Select the type of change you're committing:",
      pageSize: types.length,
      choices: getChoices()
    },
    {
      type: 'list',
      name: 'scope',
      message: 'Specify a scope:',
      pageSize: scopes.length > 10 ? scopes.length : 10,
      choices: answers =>
        fp.pipe(
          fp.find(['value', answers.type]),
          fp.getOr([], 'scopes'),
          extras => (extras.length > 0 ? [SEPARATOR, ...extras] : extras),
          extras => [NONE, ...extras, SEPARATOR, ...scopes]
        )(types),
      when: answers => hasScopes(answers)
    },
    {
      type: 'input',
      name: 'subject',
      message: 'Write a short description:',
      default: ({ type, scope }) => {
        if (type === 'WIP') return 'Quick Commit'
        if (type === 'style') return 'Passing lint rules.'
        if (type === 'chore') {
          switch (scope) {
            case 'dependencies':
              return 'Updated Dependencies.'
            case 'environment':
              return 'Updated Environment definition.'
            case 'scripts':
              return 'Updated Scripts.'
            case 'build':
              return 'Updated Build system.'
            case 'vscode':
              return 'Updated VsCode configuration.'
            case 'github':
              return 'Updated Github Actions'
            case 'linters':
              return 'Changed Linting rules'
          }
        }
        return ''
      },
      validate: input => (input.length > 0 ? true : 'Empty commit!')
    },
    {
      type: 'input',
      name: 'body',
      message:
        'Provide a longer description [ break lines with | ]: (optional)',
      when: answers => shouldSkip(answers) === false
    },
    {
      type: 'input',
      name: 'issues',
      message: 'List any issue closed [ex: #1, ...]: (optional)',
      when: answers => shouldSkip(answers) === false
    },
    {
      type: 'input',
      name: 'breaking',
      message: 'List any BREAKING CHANGES (optional):',
      when: answers => ['feat', 'fix'].includes(answers.type)
    },
    {
      type: 'confirm',
      name: 'confirmCommit',
      message: 'Ready to commit?',
      default: true,
      when: answers => shouldSkip(answers) === false
    }
  ]
}

/**
 * Cancels the commit
 *
 * @param {Object} answers Answers provided by `inquirer.js`
 * @return {Object} PassTrough
 * @throws {Error} If answers.confirmCommit is false
 */
function cancel(answers) {
  if (answers.confirmCommit === false) {
    throw new Error('User canceled the commit.')
  }
  return answers
}

/**
 * Format the git commit message from given answers.
 *
 * @param {Object} answers Answers provided by `inquirer.js`
 * @return {String} Formated git commit message
 */
function format(answers) {
  const { type, subject } = answers
  // parentheses are only needed when a scope is present
  const scope = answers.scope ? `(${answers.scope.trim()}): ` : ': '
  // build head line and limit it to 100
  const head = truncate(`${type}${scope}${subject.trim()}`, LIMIT)
  // wrap body at 100
  const body = answers.body
    ? wrap(answers.body, LIMIT).split('|').join('\n')
    : false

  const breaking = answers.breaking
    ? fp.pipe(
        fp.constant(answers.breaking),
        brk => wrap(brk, LIMIT),
        brk => `BREAKING CHANGE:
      ${brk}`
      )()
    : false
  // Close issues
  const footer = answers.issues
    ? (answers.issues.match(/#\d+/g) || [])
        .map(issue => `Fixes ${issue}`)
        .join('\n')
    : false

  return fp.compact([head, body, breaking, footer]).join('\n\n').trim()
}

function printCommit(msg) {
  const message = `${chalk.green('> Commit message:')}

  ${chalk.dim(msg)}

`
  console.log(message)

  return msg
}

function lengthReducer(max, { value }) {
  return value.length > max ? value.length : max
}
