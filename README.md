# Node.js Application Config

Store your applications config where the operating system wants you to.

## Installation

```sh
npm install --save application-config
```

## Usage

```js
var cfg = require('application-config')('App Name')

// Read the stored data
const data = await cfg.read()

// Write new config
await cfg.write({ n: 1337 })

// Trash the stored config
await cfg.trash()
```

## API

### `applicationConfig(name)`

Creates and return a new instance with the provided name.

### `cfg.read()`

Read the stored configuration. Returns a Promise that settles with the data.

### `cfg.write(data)`

Write new configuration. Returns a Promise.

### `cfg.trash()`

Remove the stored configuration. Returns a Promise.

### `cfg.filePath`

The path to the underlying file in which the configuration is stored.

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
