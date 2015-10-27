var jsdom = require('jsdom').jsdom;

global.document = jsdom('<html><head><script></script></head><body></body></html>');
global.window = global.document.parentWindow;
global.navigator = window.navigator = {};

global.window.mocha = {};
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;

require('angular/angular');
require('angular-mocks');

global.angular = window.angular;
global.inject = global.angular.mock.inject;
global.ngModule = global.angular.mock.module;

var assert = require('assert');
var moment = require('moment');
require('../javascript-i18n-angular-library')(angular);

describe('idzTimeago', function () {
  var $rootScope, $compile, $window, idzI18nConfigurator, scope;
  var now = new Date();

  beforeEach(ngModule('idz-i18n'));

  beforeEach(inject(function ($injector, $rootScope) {
    $compile = $injector.get('$compile');
    idzI18nConfigurator = $injector.get('idzI18nConfigurator');
    scope = $rootScope.$new();
  }));

  afterEach(function () {
    scope.$destroy();
  });

  var scenarios = [{
    substract: 1000,
    expect: 'il y a quelques secondes',
    locale: 'fr-FR'
  },{
    substract: 60000,
    expect: 'il y a une minute',
    locale: 'fr-FR'
  },{
    substract: 300000,
    expect: 'il y a 5 minutes',
    locale: 'fr-FR'
  },{
    substract: 3600000,
    expect: 'il y a une heure',
    locale: 'fr-FR'
  },{
    substract: 3600000 * 3,
    expect: 'il y a 3 heures',
    locale: 'fr-FR'
  },{
    substract: 3600000 * 24,
    expect: 'il y a un jour',
    locale: 'fr-FR'
  },{
    substract: 3600000 * 24 * 32,
    expect: 'il y a un mois',
    locale: 'fr-FR'
  },{
    substract: 1000,
    expect: 'a few seconds ago',
    locale: 'en-GB'
  },{
    substract: 60000,
    expect: 'a minute ago',
    locale: 'en-GB'
  },{
    substract: 300000,
    expect: '5 minutes ago',
    locale: 'en-GB'
  },{
    substract: 3600000,
    expect: 'an hour ago',
    locale: 'en-GB'
  },{
    substract: 3600000 * 3,
    expect: '3 hours ago',
    locale: 'en-GB'
  },{
    substract: 3600000 * 24,
    expect: 'a day ago',
    locale: 'en-GB'
  },{
    substract: 3600000 * 24 * 32,
    expect: 'a month ago',
    locale: 'en-GB'
  }];

  var createTest = function(scenario, testFunction) {
    return function() {
      it('should return "' + scenario.expect + '" for locale ' + scenario.locale, function() {
        idzI18nConfigurator.configure({
          locale: scenario.locale
        });
        var datetime = new Date(now.getTime() - scenario.substract);
        var result = testFunction(datetime);
        assert.equal(result, scenario.expect);
      });
    };
  };

  var testFunctions = scenarios.map(function(scenario) {
    return {
      dateTime: createTest(scenario, function(dateTime) {
        scope.dateTime = moment(dateTime).format();
        var element = angular.element('<span idz-timeago="dateTime"></span>');
        element = $compile(element)(scope);
        scope.$digest();
        return element.text();
      }),
      timestamp: createTest(scenario, function(dateTime) {
        scope.timestamp = dateTime.getTime();
        var element = angular.element('<span idz-timeago="timestamp"></span>');
        element = $compile(element)(scope);
        scope.$digest();
        return element.text();
      })
    };
  });

  describe('DateTime', function() {
    testFunctions.forEach(function(testFunction) {
      testFunction.dateTime();
    });
  });
  describe('TimeStamp', function() {
    testFunctions.forEach(function(testFunction) {
      testFunction.timestamp();
    });
  });
});
