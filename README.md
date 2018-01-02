# dehumanize

Turn humanized numbers back into machine numbers

Works well for UI tests if numbers are humanized with [`humanize-plus`](https://www.npmjs.com/package/humanize-plus)

## Installation

With [npm](https://npmjs.org) do

```sh
$ npm install --save-dev dehumanize
```

or if you prefer [`yarn`](https://yarnpkg.com)

```sh
$ yarn add --dev dehumanize
```

## Usage

Currently only one method `fromCompactInteger` is exposed. The delimiter and thousands separator are not (yet) configurable.

### Basic Usage

```js
const { fromCompactInteger } = require("dehumanize")

fromCompactInteger("56") // 56 as a number
fromCompactInteger("34k") // 34000
fromCompactInteger("6.54M") // 6540000
fromCompactInteger("4,321") // 4321
```
