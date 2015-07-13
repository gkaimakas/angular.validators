/**
 * Created by gkaimakas on 7/8/15.
 */

describe('asyncValidator', function () {
    var asyncValidator;

    beforeEach(function () {
        module('angular.validators');
        module(function ($provide) {
            $provide.value('asyncValidator', {
                getUrl: function () {
                    return 'username/gkaimakas';
                },
                resolve: function () {
                    return {
                        then: function (callback) {
                            return callback(false);
                        }
                    };
                }
            });
        });
    });

    beforeEach(inject(function (_asyncValidator_) {
        asyncValidator = _asyncValidator_;
    }));

    describe('provider', function () {
        it('should return a valid url', function () {
            spyOn(asyncValidator, 'getUrl').and.callThrough();

            var url = asyncValidator.getUrl();

            expect(asyncValidator.getUrl).toHaveBeenCalled();
            expect(url).toBe('username/gkaimakas');
        });

        it('should resolve to false', function (done) {
            spyOn(asyncValidator, 'resolve').and.callThrough();

            asyncValidator.resolve()
                .then(function (result) {
                    expect(result).toBe(false);
                    done();
                });

            expect(asyncValidator.resolve).toHaveBeenCalled();
        });
    });

    describe('validator', function () {
        var element;
        var $scope;
        var form;
        beforeEach(inject(function ($rootScope, $compile) {
            $scope = $rootScope.$new();
            element = angular.element(
                '<form name="form">' +
                '<input type="text" ng-model="value" name="value" async-valid="username" />' +
                '</form>'
            );

            $compile(element)($scope);
            form = $scope.form;
        }));

        it('should invalidate the input', function(){
            spyOn(asyncValidator, 'resolve').and.callThrough();

            form.value.$setViewValue('should-be-false');
            $scope.$digest();

            expect(asyncValidator.resolve).toHaveBeenCalled();
            expect(form.value.$valid).toBe(false);
        });
    });
});
