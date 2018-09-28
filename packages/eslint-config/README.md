# @hnp/eslint-config

![hero](https://raw.githubusercontent.com/MechanicalHuman/hnp-utilities/master/hero.png)

![version](https://img.shields.io/npm/v/@hnp/eslint-config.svg)
![licence](https://img.shields.io/npm/l/@hnp/eslint-config.svg)

> ESlint Rules

Extends `standard` with pedantic rules about `lodash/fp`

---

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Changelog](#changelog)
-   [License](#license)

## Installation

```sh
npm install @hnp/eslint-config
```

## Usage

On your .eslintrc.js

```javascript
module.exports = {
    extends: '@hnp'
}
```

If you're using `React` you can use the `React` flavored one.

```javascript
module.exports = {
    extends: '@hnp/eslint-config/react'
}
```

## Changelog

Find the CHANGELOG [here](CHANGELOG.md), generated using Conventional Commits.

## License

[MIT](LICENSE) © [Jorge Proaño](https://www.hidden-node-problem.com)
