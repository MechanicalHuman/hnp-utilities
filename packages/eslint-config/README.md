# @hnp/eslint-config

> ESlint Rules

Just extending `standard` with pedantic rules about `lodash/fp`

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
