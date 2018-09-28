# @hnp/package-scripts

> Package Maintenance Scripts

---

## Table of contents

-   [Installation](#installation)

-   [Usage](#usage)

    -   [compile](#compile)
    -   [todos](#todos)
    -   [version](#version)

-   [Changelog](#changelog)

-   [License](#license)

## Installation

```sh
npm install @hnp/package-scripts --save-dev
```

## Usage

> This tool is meant to be used as part of the `npm` package scripts in your `package.json`.

```sh
pkg-scripts [command]

Commands:
  pkg-scripts compile  Updates the project files
  pkg-scripts todos    Finds TODOs on the project                       [aliases: todo]
  pkg-scripts version  Automatic versioning and CHANGELOG generation    [aliases: release]

Options:
  --color    Force color output                                  [default: auto]
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

### `compile`

> Updates the project files.

-   Normalizes `package.json`.

    -   Uses [`normalize-package-data`](@npm/normalize-package-data) for basic normalization.
    -   Ensures the `git-remote` matches the `git.url` field.
    -   Sets the `git.url` as the `SSH` version. _Usefull on CI and Deployments_
    -   Formats the `author` field as the single line form. `name <email> (homepage)`
    -   Updates the `contributors` field using the `git history` and the `GitHub API`
    -   Ensures a valid `licence` field.
    -   Cleans the results of empty fields and saves a new `package.json`

-   Updates the `README.md` _Trying its best to make it [standard-readme](@RichardLitt/standard-readme/spec.md) compilant_
    -   Matches the Title to the package name
    -   Matches the description to the package description
    -   Updates `## Table of contents`.
    -   Updates `## Installation`.
        -   If the `package.json` field `private` is `true` it will be `git clone && npm install`
        -   If the `package.json` field `preferGlobal` is `true` it will be `npm install -g`
        -   If the `package.json` field `preferDev` is `true` it will be `npm install -D`
        -   If none of those rules matches it will be `npm install --save`
    -   Updates `## Usage` by executing the contents of `example.js` or `examples/index.js` as a `code block`.
        -   `\\ Comments` are converted to `paragraphs`
        -   `console.log()` statements are replaced by what the console prints.
    -   Updates `## Maintainers` using the `AUTHORS` file.
    -   Links `## Changelog` to the `CHANGELOG.md` file.
    -   Links `## Licence` to the `LICENCE` file.
    -   Scans the resulting document and creates links to repositories, pull requests, issues etc.
-   Updates the `AUTHORS` file.
-   Updates the `LICENCE` file using [@hnp/license-generator](../license-generator#readme)
-   Updates the `TODO.md` file using [leasot](@pgilad/leasot#readme)
    -   Opt out by using the `--no-todos` flag.
    -   Uses the closest `.gitignore` to figure it out which files scan fot TODOs
-   Stages the changed files. _Making it useful as a pre-commit hook_

### `todos`

> If the tool is already going to install [leasot](@pgilad/leasot#readme) at least should expose it.

-   Uses the closest `.gitignore` to figure it out which files scan for TODOs

### `version`

> A thin wrapper over [standard-version](@conventional-changelog/standard-version) for convenience.

-   It will run `package-scripts compile` as a `post-version-bump hook` to keep everything up to date. You can override this hook with `--post-bump=yourcommand`
-   If no `CHANGELOG.md` file is found, it will create one as a `first-release` without bumping the version.

## Changelog

## License

[MIT](LICENSE) © [Jorge Proaño](https://www.hidden-node-problem.com)
