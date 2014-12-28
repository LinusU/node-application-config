# `node-application-config`

Store your applications config where the operating system wants you to.

## Installation

```sh
npm install --save application-config
```

## Usage

```js
var cfg = require('application-config')('App Name');

// Read the stored data
cfg.read(function (err, data) {

});

// Write new config
cfg.write({ n: 1337 }, function (err) {

});

// Trash the stored config
cfg.trash(function (err) {

});

```

## License

MIT
