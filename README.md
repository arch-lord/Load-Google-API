# Load Google API

Webpack based promise wrapper around the Google API Client. Injects into page and initalizes client
library. Sign-in process left to developer. Includes an example page that with sign-in
attached to a button.

To run example page, you must have an application with the proper authorizations from Google
Cloud Console. Rename 'auth.sample.json' to 'auth.json' and add your credentials.

Currently built for Chrome. See to-do list.

## Features

* Webpack 2 based.
* ES6 as a source.
* Exports in a [umd](https://github.com/umdjs/umd) format so your library works everywhere.
* ES6 test setup with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/).
* Linting with [ESLint](http://eslint.org/).

## To Do

* [ ] Add https://github.com/taylorhakes/promise-polyfill
* [ ] Write proper tests.
* [ ] Test edge cases.
* [ ] Test more browsers.

## Build

```
$> yarn install
$> yarn run build
```

## Development and Sample Page

```
$> yarn run dev
$> open http://localhost;8080
```
