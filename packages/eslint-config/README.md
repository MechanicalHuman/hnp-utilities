# eslint-config-hnp

![hero](https://raw.githubusercontent.com/MechanicalHuman/hnp-utilities/master/hero.png)

![version](https://img.shields.io/npm/v/eslint-config-hnp.svg)
![licence](https://img.shields.io/npm/l/eslint-config-hnp.svg)

> EsLint Rules

Extends `standard` with pedantic rules about `lodash/fp`

---

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Changelog](#changelog)
-   [License](#license)

## Installation

```sh
npm install eslint-config-hnp --save-dev
```

## Usage

On your .eslintrc.js

```javascript
module.exports = {
    extends: 'eslint-config-hnp'
}
```

Protip: You can omit the `eslint-config` part

```javascript
module.exports = {
    extends: 'hnp'
}
```

## Changelog

Find the CHANGELOG [here](CHANGELOG.md), generated using Conventional Commits.

## License

[MIT](LICENSE) © [Jorge Proaño](https://www.hidden-node-problem.com)
