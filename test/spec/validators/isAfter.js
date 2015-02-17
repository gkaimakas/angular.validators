/**
 * Created by gkaimakas on 2/13/15.
 */

describe('Validator : isAfter', function(){
  var directive = "after";
  var validator = "is-" + directive;
  var valid = (new Date());
  var invalid = "maaAn";

  var element, $scope, forms;
  beforeEach(module('angular.validators'));
  beforeEach(inject(function($rootScope, $compile){
    $scope = $rootScope.$new();

    element = angular.element(
      '<form name="form">' +
      '<input type="text" ng-model="value" name="value" ' + validator + '="' + valid + '" />' +
      '</form>'
    );
    $compile(element)($scope);
    form = $scope.form;
  }));

  it('should return true on valid ' + directive, function(){
    var date = new Date(valid);
    date.setDate(valid.getDate() + 1);
    form.value.$setViewValue(date);
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
