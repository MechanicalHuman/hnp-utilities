'use strict'

const Listr = require('listr')
const fp = require('lodash/fp')
const gitParser = require('git-url-parse')
const execa = require('execa')

const { ERR_GIT } = require('../constants')
const utils = require('../utils')

const parseAuthors = fp.pipe(
  fp.split(/\r?\n/g),
  fp.map(
    fp.pipe(
      fp.replace(/^\s*#.*$/, ''),
      fp.trim
    )
  ),
  fp.compact,
  fp.map(utils.parsePerson)
)

module.exports = () =>
  new Listr([
    {
      title: 'Get Git remote',
      task: ctx =>
        execa
          .stdout('git', ['config', '--get', 'remote.origin.url'])
          .then(remote => gitParser(remote))
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
          .shell('git log --format="%aN <%aE>" | sort -f | uniq')
          .then(data => parseAuthors(data.stdout))
          .then(cnt => mergeContributors(ctx, cnt))
    }
  ])

function mergeContributors (context, contributors) {
  const current = fp.getOr([], 'contributors', context)
  const merged = fp.unionBy((x = {}) => x.email)(contributors, current)
  context['contributors'] = fp.compact(merged)
}
