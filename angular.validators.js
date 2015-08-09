'use strict';

/**
 * @ngdoc overview
 * @name angularvalidatorsApp
 * @description
 * # angularvalidatorsApp
 *k
 * Main module of the application.
 */
angular
    .module('angular.validators', [])
    .provider('asyncValidator', function(){
        var _baseUrl;
        var _defaultState = false;
        var _endpoints = {};
        var _httpVerb = 'get'.toLowerCase();
        var _invalidResponse = 'false';
        var _minLength = 3;
        var _responseField = 'valid';
        var _validResponse = 'true';
        var _wildcard = '{value}';

        //sets the base url for the api
        this.baseUrl = function(baseUrl){
            _baseUrl = baseUrl;
            return this;
        };

        this.defaultState =function(defaultState){
            _defaultState = !!defaultState;
            return this;
        };

        //sets an api endpoint for easy use
        this.endpoint = function(name, url){
            _endpoints[name] = url;
            return this;
        };

        //sets the http verb
        this.httpVerb = function(verb){
            _httpVerb = verb.toLowerCase();
            return this;
        };

        // sets the invalid response value from the api
        this.invalidResponse = function(response){
            _invalidResponse = response;
            return this;
        };

        // in the viewValue.length is less than min length then the validator return
        this.minLength = function(minLength){
            _minLength = parseInt(minLength);
            return this;
        };

        this.responseField = function(responseField){
            _responseField = responseField;
            return this;
        };


        this.validResponse = function(response){
            _validResponse = response;
            return this;
        };

        this.wildcard = function(wildcard){
            _wildcard = wildcard;
            return this;
        };

        this.$get = ['$http', '$q', function($http, $q){
            var endpoints = {};
            for( var key in _endpoints){
                endpoints[key] = _baseUrl + _endpoints[key];
            }

            return new function(){
                var deferred = $q.defer();

                this.defaultState = _defaultState;
                this.endpoints = endpoints;
                this.getUrl = function(endpoint, value){
                    return this.endpoints[endpoint].replace(_wildcard, value);
                };

                this.invalidResponse = _invalidResponse;
                this.minLength = _minLength;

                this.resolve = function(url){
                    return $http[_httpVerb](url)
                        .then(function(response){
                            if(response.data[_responseField] === _validResponse){
                                return deferred.resolve(true);
                            }

                            if(response.data[_responseField] === _invalidResponse){
                                return deferred.reject(false);
                            }
                        })
                        .catch(function(err){
                            return deferred.reject();
                        });
                };

                this.validResponse = _validResponse;
            };
        }];
    })
    .service('validator', ['$http', '$q', function ($http, $q) {
        var deferred = $q.defer();
        $http.get('https://cdn.rawgit.com/chriso/validator.js/master/validator.js')
            .then(function(result){
                deferred.resolve(result.data);
            });
        return deferred.promise;
    }])
    .directive('asyncValid', ['asyncValidator', '$q', function(asyncValidator, $q){
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, element, attrs, controller){
                var endpoint = asyncValidator[attrs.asyncValid];
                var defaultState = attrs.asyncDefaultState || asyncValidator.defaultState;
                var invalidResponse = attrs.asyncInvalidResponse || asyncValidator.invalidResponse;
                var minLength = parseInt(attrs.asyncMinLength) || asyncValidator.minLength;
                var validResponse = attrs.asyncValidResponse || asyncValidator.validResponse;

                controller.$asyncValidators.asyncValid = function(modelValue, viewValue){
                    if(viewValue.length < minLength && defaultState == validResponse) return $q.defer().resolve(true);
                    if(viewValue.length < minLength && defaultState == invalidResponse) return $q.defer().resolve(false);

                    var url = asyncValidator.getUrl(endpoint, viewValue);
                    return asyncValidator.resolve(url)
                        .then(function(result){
                            if(!result) return $q.reject(false);
                            if(result === true) return $q.defer().resolve(true);
                            if(result == false) return $q.defer().reject(false);
                            return false;
                        });
                }
            }
        };
    }])
    .directive('contains', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.contains = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.contains(viewValue, attrs.contains);
                };
            }
        };
    }])
    .directive('equals', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.equals = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.equals(viewValue, attrs.equals);
                };
            }
        };
    }])
    .directive('isAfter', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isAfter = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (attrs.isAfter !== '') {
                        return validator.isAfter(viewValue, attrs.isAfter);
                    }
                    return validator.isAfter(viewValue);
                };
            }
        };
    }])
    .directive('isAlpha', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isAlpha = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isAlpha(viewValue);
                };
            }
        };
    }])
    .directive('isAlphanumeric', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isAlphanumeric = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isAlphanumeric(viewValue);
                };
            }
        };
    }])
    .directive('isAscii', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isAscii = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isAscii(viewValue);
                };
            }
        };
    }])
    .directive('isBase64', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isAlphanumeric = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isBase64(viewValue);
                };
            }
        };
    }])
    .directive('isBefore', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isBefore = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (attrs.isBefore !== '') {
                        return validator.isBefore(viewValue, attrs.isBefore);
                    }
                    return validator.isBefore(viewValue);
                };
            }
        };
    }])
    .directive('isBoolean', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isBoolean = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isBoolean(viewValue);
                };
            }
        };
    }])
    .directive('isCreditCard', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isCreditCard = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isCreditCard(viewValue);
                };
            }
        };
    }])
    .directive('isCurrency', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isCurrency = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (attrs.isCurrency != null && attrs.isCurrency != '') {
                        return validator.isCurrency(viewValue, attrs.isCurrency);
                    }
                    return validator.isCurrency(viewValue);
                };
            }
        };
    }])
    .directive('isDate', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isDate = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isDate(viewValue);
                };
            }
        };
    }])
    .directive('isDivisibleBy', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isDivisibleBy = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isDivisibleBy(viewValue, attrs.isDivisibleBy);
                };
            }
        };
    }])
    .directive('isEmail', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isEmail = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }

                    if (attrs.isEmail != null && attrs.isEmail != '') {
                        return validator.isEmail(viewValue, attrs.isEmail);
                    }
                    return validator.isEmail(viewValue);
                };
            }
        };
    }])
    .directive('isFqdn', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isFqdn = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }

                    if (attrs.isFqdn != null && attrs.isFqdn != '') {
                        return validator.isFQDN(viewValue, attrs.isFqdn);
                    }

                    return validator.isFQDN(viewValue);
                };
            }
        };
    }])
    .directive('isFloat', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isFloat = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isFloat(viewValue);
                };
            }
        };
    }])
    .directive('isFullWidth', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isFullWidth = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isFullWidth(viewValue);
                };
            }
        };
    }])
    .directive('isHalfWidth', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isHalfWidth = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isHalfWidth(viewValue);
                };
            }
        };
    }])
    .directive('isHexColor', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isHexColor = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isHexColor(viewValue);
                };
            }
        };
    }])
    .directive('isHexadecimal', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isHexadecimal = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isHexadecimal(viewValue);
                };
            }
        };
    }])
    .directive('isIp', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isIp = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    var ipVersion = attrs.isIp.toString();
                    if (ipVersion === "6" || ipVersion === "4") {
                        return validator.isIP(viewValue, ipVersion);
                    }
                    return validator.isIP(viewValue);
                };
            }
        };
    }])
    .directive('isIsbn', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isIsbn = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    var isbnVersion = parseInt(attrs.isIsbn);
                    if (isbnVersion === 10 || isbnVersion === 13) {
                        return validator.isISBN(viewValue, isbnVersion);
                    }
                    return validator.isISBN(viewValue);
                };
            }
        };
    }])
    .directive('isIsin', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isIsin = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isISIN(viewValue);
                };
            }
        };
    }])
    .directive('isIso8601', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isIsin = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isISO8601(viewValue);
                };
            }
        };
    }])
    .directive('isIn', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isIn = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isIn(viewValue, attrs.isIn);
                };
            }
        };
    }])
    .directive('isInt', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isInt = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isInt(viewValue);
                };
            }
        };
    }])
    .directive('isJson', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isJson = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isJSON(viewValue);
                };
            }
        };
    }])
    .directive('isLowercase', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isLowercase = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isLowercase(viewValue);
                };
            }
        };
    }])
    .directive('isMobilePhone', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isMobilePhone = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    if (attrs.isMobilePhone !== '') {
                        return validator.isMobilePhone(viewValue, attrs.isMobilePhone);
                    }
                    return false;
                };
            }
        };
    }])
    .directive('isMongoId', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isMongoId = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isMongoId(viewValue);
                };
            }
        };
    }])
    .directive('isMultibyte', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isMultibyte = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isMultibyte(viewValue);
                };
            }
        };
    }])
    .directive('isNull', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isNull = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isNull(viewValue);
                };
            }
        };
    }])
    .directive('isNumeric', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isNumeric = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isNumeric(viewValue);
                };
            }
        };
    }])
    .directive('isUrl', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isUrl = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }

                    if (attrs.isUrl != null && attrs.isUrl != '') {
                        return validator.isURL(viewValue, attrs.isUrl);
                    }

                    return validator.isURL(viewValue);
                };
            }
        };
    }])
    .directive('isUuid', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isUuid = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    var uuidVersion = parseInt(attrs.isUuid.toString());
                    if (uuidVersion === 3 || uuidVersion === 4 || uuidVersion === 5) {
                        return validator.isUUID(viewValue, uuidVersion);
                    }
                    return validator.isUUID(viewValue);
                };
            }
        };
    }])
    .directive('isUppercase', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isUppercase = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isUppercase(viewValue);
                };
            }
        };
    }])
    .directive('isVariableWidth', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isVariableWidth = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isVariableWidth(viewValue);
                };
            }
        };
    }])
    .directive('isSurrogatePair', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.isSurrogatePair = function (modelValue, viewValue) {
                    if (controller.$isEmpty(modelValue)) {
                        return true;
                    }
                    return validator.isSurrogatePair(viewValue);
                };
            }
        };
    }])
    .directive('watchEquals', ['validator', function (validator) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                controller.$validators.watchEquals = function (modelValue, viewValue) {

                    scope.$watch(attrs.ngModel, function () {
                        if (viewValue != null && attrs.watchEquals != null) {
                            controller.$setValidity("watchEquals", validator.equals(viewValue, attrs.watchEquals));
                        }
                    });

                    attrs.$observe('watchEquals', function () {
                        if (viewValue != null && attrs.watchEquals != null) {
                            controller.$setValidity("watchEquals", validator.equals(viewValue, attrs.watchEquals));
                        }
                    });
                };
            }
        };
    }]);

