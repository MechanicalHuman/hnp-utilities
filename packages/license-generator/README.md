# @hnp/license-generator

![hero](hero.png)

![version](https://img.shields.io/npm/v/@hnp/license-generator.svg)

> Basic licence generator, used internally by @hnp/package-scripts

---

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Available Licenses](#available-licenses)
-   [Changelog](#changelog)
-   [License](#license)

## Installation

```sh
npm install @hnp/license-generator
```

## Usage

Just tell the generator function which of the valid licenses you want to generate and for whom.

```javascript
const licenseGenerator = require('./')
const licence = licenseGenerator.generate('MIT', 'Anon')
```

```md
The MIT License (MIT)

Copyright (c) 2018 Anon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

Is worth noticing that if the provided licence type is _unknown_, the tool will default to generate a `Copyrighted` one.

```javascript
const notValid = licenseGenerator.generate('none', 'Anon')
```

```md
Copyright (c) 2018 Anon
All rights reserved.
```

## Available Licenses

-   Apache 2.0
-   MIT
-   Mozilla Public License 2.0
-   BSD 2-Clause (FreeBSD) License
-   BSD 3-Clause (NewBSD) License
-   Internet Systems Consortium (ISC) License
-   GNU AGPL 3.0
-   GNU GPL 3.0
-   GNU LGPL 3.0
-   Unlicense
-   No License (Copyrighted)

## Changelog

Find the CHANGELOG [here](CHANGELOG.md), generated using Conventional Commits.

## License

[MIT](LICENSE) © [Jorge Proaño](https://www.hidden-node-problem.com)
