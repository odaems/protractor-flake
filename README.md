Protractor Flake

---

Rerun potentially flake protractor tests before failing.

> This module is still 0.x so please contribute a PR or issue if you encounter any bugs.

```
npm i protractor-flake

# or globally

npm i -g protractor-flake
```

Via the CLI:

```shell
npm i -g protractor-flake
# protractor-flake <protractor-flake-options> -- <options to be passed to protractor>
protractor-flake --max-attempts=3 -- protractor.conf.js
```

Or programmatically:

```javacript
var protractorFlake = require('protractor-flake');

protractorFlake({
  maxAttempts: 3,
  // expects protractor to be in path
  // set this to wherever the protractor bin
  // is located
  protractorPath: 'protractor',
  protractorArgs: []
}, function (status, output) {

});

```

# Caveats

This has not yet been tested with Protractor + Mocha. It _should_ function similarly. Please update with an issue or PR if this is not the case.

# Contributors

```
# clone this repository
npm i

# run the tests
npm t

# run unit tests in watch mode
npm run test:dev

# run unit integration tests
npm run test:integration
```
