# tslint-config-hnp

![hero](https://raw.githubusercontent.com/MechanicalHuman/hnp-utilities/master/hero.png)

![version](https://img.shields.io/npm/v/@hnp/eslint-config.svg)
![licence](https://img.shields.io/npm/l/@hnp/eslint-config.svg)

> TsLint Rules

Extends `standard` with pedantic rules about `lodash/fp`

---

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Changelog](#changelog)
-   [License](#license)

## Installation

```sh
npm install tslint-config-hnp --save-dev
```

## Usage

On your .eslintrc.js

```javascript
module.exports = {
    extends: '@hnp/eslint-config'
}
```

Protip: You can omit the `eslint-config` part

```javascript
module.exports = {
    extends: '@hnp/eslint-config'
}
```

## Changelog

Find the CHANGELOG [here](CHANGELOG.md), generated using Conventional Commits.

## License

[MIT](LICENSE) © [Jorge Proaño](https://www.hidden-node-problem.com)
