# @hnp/cz

![hero](hero.png)

> Commitizen Adaptor, fully compatible with angular style.

---

## Table of contents

-   [TLDR](#tldr)
-   [Installation and SetUp](#installation-and-setup)
-   [Changelog](#changelog)
-   [License](#license)

## TLDR

Instead of `git commit` use `git cz` with `@hnp/cz` as the adaptor

## Install

## Usage

## Installation and SetUp

First, install the Commitizen cli tools:

```sh
npm install commitizen -g
```

Next, initialize your project to use the adapter by typing:

```bash
    commitizen init @hnp/cz --save-dev --save-exact
```

> Pro TIP: set as default adapter for your projects

```bash
npm install --global @hnp/cz
echo '{ "path": "@hnp/cz" }' > ~/.czrc
```

You can customize the `scopes` on a project basis by adding a configuration section in your `package.json`:

```json
{
    "config": {
        "scopes": ["home", "accounts", "ci"]
    }
}
```

Now, instead of `git commit` you should use `git cz`.

## Changelog

## License

[MIT](LICENSE) © [Jorge Proaño](https://www.hidden-node-problem.com)
