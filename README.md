javascript-i18n-angular-library [![Circle CI](https://circleci.com/gh/iadvize/javascript-i18n-angular-library.svg?style=svg)](https://circleci.com/gh/iadvize/javascript-i18n-angular-library) [![npm version](https://badge.fury.io/js/javascript-i18n-angular-library.svg)](https://badge.fury.io/js/javascript-i18n-angular-library)
===============================

This angular library provides directives to format dates, numbers and currencies

## Examples

Register i18n service :

```javascript
app.run(['idzI18nConfigurator', function(idzI18nConfigurator) {
    idzI18nConfigurator.configure(settings.i18n || {});
  }]);
```

## Install

``` sh
npm install javascript-i18n-angular-library --save
```

## Documentation

Inject angular into the module :

```javascript
require('javascript-i18n-angular-library')(angular);
```

### Directive

#### ìdzTimeAgo

Define a directive to set a timer

#### idzI18nConfigurator

Define a service to call iAdvize [javascript-i18n-library](https://github.com/iadvize/javascript-i18n-library)

## Contribute

Look at contribution guidelines here : [CONTRIBUTING.md](CONTRIBUTING.md)


### Running tests

```sh
npm test
```
