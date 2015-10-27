module.exports = function(angular) {
  var i18nServiceFactory = require('javascript-i18n-library');
  var module = angular.module('idz-i18n', []);
  var i18nService = i18nServiceFactory();

  module.directive('idzTimeago', ['$window', function($window) {
    return function(scope, element, attr) {
      var model = attr.idzTimeago;
      var timer = null;
      var stopTimer = function() {
        if(timer) {
          $window.clearTimeout(timer);
          timer = null;
        }
      };

      var update = function(value) {
        stopTimer();
        var formattedValue;
        if(isNaN(value)) {
          formattedValue = i18nService.formatTimeAgoFromDateTime(value);
        } else {
          formattedValue = i18nService.formatTimeAgoFromTimestamp(value);
        }

        element.text(formattedValue);
        timer = $window.setTimeout(function() {
          update(value);
        }, 10000 /* ten seconds refresh, TODO : OPTIMIZE REFRESH */);
      };

      scope.$watch(model, function(value) {
        if(angular.isUndefined(value) || value === null) {
          stopTimer();
          element.text('');
          return;
        }

        update(value);
      });
    };
  }]);

  module.service('idzI18nConfigurator', ['$rootScope', function($rootScope) {
    this.configure = function(i18nConfig) {
      i18nService = i18nServiceFactory(i18nConfig);
    };
  }]);

  return 'idz-i18n';
};
