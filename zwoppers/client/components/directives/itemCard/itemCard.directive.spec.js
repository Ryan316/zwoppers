'use strict';

describe('Directive: itemCard', function () {

  // load the directive's module and view
  beforeEach(module('zwoppersApp'));
  beforeEach(module('components/directives/itemCard/itemCard.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-card></product-card>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});
