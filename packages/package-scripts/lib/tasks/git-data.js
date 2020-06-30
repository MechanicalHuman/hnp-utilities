'use strict'

const Listr = require('listr')
const fp = require('lodash/fp')
const gitParser = require('git-url-parse')
const execa = require('execa')

const { ERR_GIT } = require('../constants')
const utils = require('../utils')

const parseAuthors = fp.pipe(
  fp.split(/\r?\n/g),
  fp.map(fp.pipe(fp.replace(/^\s*#.*$/, ''), fp.trim)),
  fp.compact,
  fp.map(utils.parsePerson)
)

module.exports = () =>
  new Listr([
    {
      title: 'Get Git remote',
      task: ctx =>
        execa('git', ['config', '--get', 'remote.origin.url'])
          .then(({ stdout }) => gitParser(stdout))
          .then(repoData => (ctx.repoData = repoData))
          .then(() => (ctx.remote = true))
          .catch(e => {
            throw new Error(ERR_GIT)
          })
    },
    {
      title: 'Get Contributors via local Repo',
      task: ctx =>
        execa
          .command('git log --format="%aN <%aE>" | sort -f | uniq', {
            shell: true
          })
          .then(data => parseAuthors(data.stdout))
          .then(cnt => mergeContributors(ctx, cnt))
    }
  ])

function mergeContributors(context, contributors) {
  const skip = [
    'dependabot[bot]@users.noreply.github.com',
    'semantic-release-bot@martynus.net'
  ]

  context.contributors = fp.pipe(
    fp.getOr([], 'contributors'),
    current => fp.unionBy((x = {}) => x.email)(contributors, current),
    fp.filter((x = {}) => !skip.includes(x.email))
  )(context)
}
