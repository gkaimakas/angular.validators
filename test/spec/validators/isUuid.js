/**
 * Created by gkaimakas on 2/13/15.
 */

describe('Validator : isUuid', function(){
  var directive = "uuid";
  var validator = "is-" + directive;
  var valid = "de305d54-75b4-431b-adb2-eb6b9e546013";
  var invalid = "maaAn";


  var element, $scope, forms;
  beforeEach(module('angular.validators'));
  beforeEach(inject(function($rootScope, $compile){
    $scope = $rootScope.$new();

    element = angular.element(
      '<form name="form">' +
      '<input type="text" ng-model="value" name="value" ' + validator + ' />' +
      '</form>'
    );
    $compile(element)($scope);
    form = $scope.form;
  }));

  it('should return true on valid ' + directive, function(){
    form.value.$setViewValue(valid);
    $scope.$digest();
    expect(form.value.$valid).toBe(true);
  });
  it('should return false on invalid ' + directive, function(){
    form.value.$setViewValue(invalid);
    $scope.$digest();
    expect(form.value.$valid).toBe(false);
  });
});
/**
 * Created by gkaimakas on 2/14/15.
 */
