'use strict'

const Listr = require('listr')
const fp = require('lodash/fp')
const readPkg = require('read-pkg')
const sort = require('sort-package-json')
const { normalize } = require('@hnp/license-generator')

const utils = require('../utils')
const { IN_REPO, PKG_PATH } = require('../constants')

module.exports = () =>
  new Listr([
    {
      title: 'Normalize package.json',
      task: ctx => readPkg().then(pkg => (ctx.pkg = pkg))
    },
    {
      title: 'Ensuring git-remote matches the project.',
      skip: ctx => !IN_REPO || !ctx.remote,
      task: ctx =>
        Promise.resolve()
          .then(() => ctx.repoData.toString())
          .then(gitURl => updateCtx('repository.url', gitURl, ctx))
          .then(() => updateCtx('repository.type', 'git', ctx))
    },
    {
      title: 'Formating Author',
      task: ctx =>
        fp.pipe(
          fp.getOr('', 'pkg.author'),
          utils.unParsePerson,
          author => updateCtx('author', author, ctx)
        )(ctx)
    },
    {
      title: 'Updating Contributors',
      task: ctx =>
        fp.pipe(
          ctx =>
            fp.isEmpty(ctx.contributors)
              ? fp.getOr([], 'pkg.contributors')
              : ctx.contributors,
          fp.map(
            fp.pipe(
              utils.parsePerson,
              utils.unParsePerson
            )
          ),
          fp.reject(fp.isEqual(fp.get('pkg.author', ctx))),
          ctr => updateCtx('contributors', ctr, ctx)
        )(ctx)
    },
    {
      title: 'Ensuring Valid Licence',
      task: ctx => {
        const current = fp.getOr('MIT', 'pkg.license')(ctx)
        updateCtx('license', normalize(current), ctx)
      }
    },
    {
      title: 'Saving',
      task: ctx => utils.writeJson(PKG_PATH, cleanUp(ctx))
    }
  ])

function updateCtx (path, val, ctx) {
  const pkg = fp.get('pkg')(ctx)
  ctx.pkg = fp.set(path, val, pkg)
  return ctx
}

function cleanUp (ctx) {
  const pkg = fp.pipe(
    fp.get('pkg'),
    fp.omit(['_id', 'readmeFilename', 'readme']),
    fp.omitBy(fp.allPass([fp.isEmpty, fp.negate(fp.isBoolean)])),
    pkg => sort(pkg)
  )(ctx)
  ctx.pkg = pkg
  return pkg
}

function remoteAsSSH (o) {
  if (o.source !== 'azure.com') return o.toString('ssh')
  return `git@ssh.${o.resource}:v3/${o.organization}/${o.owner}/${o.name}`
}
