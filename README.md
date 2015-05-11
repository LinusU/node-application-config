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

## Config location

Platform | Location
--- | ---
OS X | `~/Library/Application Support/<name>/config.json`
Linux (XDG) | `$XDG_CONFIG_HOME/<name>/config.json`
Linux (Legacy) | `~/.config/<name>/config.json`
Windows (> Vista) | `%LOCALAPPDATA%/<name>/config.json`
Windows (XP, 2000) | `%USERPROFILE%/Local Settings/Application Data/<name>/config.json`

## License

MIT
