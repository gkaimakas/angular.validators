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
    .service('nodeValidator', function () {
        var _this = {};
        (function (name, definition) {
            if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
                module.exports = definition();
            } else if (typeof define === 'function' && typeof define.amd === 'object') {
                define(definition);
            } else {
                _this[name] = definition();
            }
        })('validator', function (validator) {
          'use strict';

          validator = { version: '4.4.1' };

          var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
          var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;

          var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
          var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;

          var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;

          var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

          var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

          var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/
            , isbn13Maybe = /^(?:[0-9]{13})$/;

          var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;

          var ipv4Maybe = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/
            , ipv6Block = /^[0-9A-F]{1,4}$/i;

          var uuid = {
            '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
            , '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
            , '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
            , all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
          };

          var alpha = /^[A-Z]+$/i
            , alphanumeric = /^[0-9A-Z]+$/i
            , numeric = /^[-+]?[0-9]+$/
            , int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/
            , float = /^(?:[-+]?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/
            , hexadecimal = /^[0-9A-F]+$/i
            , decimal = /^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/
            , hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

          var ascii = /^[\x00-\x7F]+$/
            , multibyte = /[^\x00-\x7F]/
            , fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/
            , halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

          var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

          var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

          var phones = {
            'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
            'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
            'en-ZA': /^(\+?27|0)\d{9}$/,
            'en-AU': /^(\+?61|0)4\d{8}$/,
            'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
            'fr-FR': /^(\+?33|0)[67]\d{8}$/,
            'pt-PT': /^(\+351)?9[1236]\d{7}$/,
            'el-GR': /^(\+?30)?(69\d{8})$/,
            'en-GB': /^(\+?44|0)7\d{9}$/,
            'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
            'en-ZM': /^(\+26)?09[567]\d{7}$/,
            'ru-RU': /^(\+?7|8)?9\d{9}$/,
            'nb-NO': /^(\+?47)?[49]\d{7}$/,
            'nn-NO': /^(\+?47)?[49]\d{7}$/,
            'vi-VN': /^(0|\+?84)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
            'en-NZ': /^(\+?64|0)2\d{7,9}$/
          };

          // from http://goo.gl/0ejHHW
          var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

          validator.extend = function (name, fn) {
            validator[name] = function () {
              var args = Array.prototype.slice.call(arguments);
              args[0] = validator.toString(args[0]);
              return fn.apply(validator, args);
            };
          };

          //Right before exporting the validator object, pass each of the builtins
          //through extend() so that their first argument is coerced to a string
          validator.init = function () {
            for (var name in validator) {
              if (typeof validator[name] !== 'function' || name === 'toString' ||
                name === 'toDate' || name === 'extend' || name === 'init') {
                continue;
              }
              validator.extend(name, validator[name]);
            }
          };

          validator.toString = function (input) {
            if (typeof input === 'object' && input !== null && input.toString) {
              input = input.toString();
            } else if (input === null || typeof input === 'undefined' || (isNaN(input) && !input.length)) {
              input = '';
            }
            return '' + input;
          };

          validator.toDate = function (date) {
            if (Object.prototype.toString.call(date) === '[object Date]') {
              return date;
            }
            date = Date.parse(date);
            return !isNaN(date) ? new Date(date) : null;
          };

          validator.toFloat = function (str) {
            return parseFloat(str);
          };

          validator.toInt = function (str, radix) {
            return parseInt(str, radix || 10);
          };

          validator.toBoolean = function (str, strict) {
            if (strict) {
              return str === '1' || str === 'true';
            }
            return str !== '0' && str !== 'false' && str !== '';
          };

          validator.equals = function (str, comparison) {
            return str === validator.toString(comparison);
          };

          validator.contains = function (str, elem) {
            return str.indexOf(validator.toString(elem)) >= 0;
          };

          validator.matches = function (str, pattern, modifiers) {
            if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
              pattern = new RegExp(pattern, modifiers);
            }
            return pattern.test(str);
          };

          var default_email_options = {
            allow_display_name: false,
            allow_utf8_local_part: true,
            require_tld: true
          };

          validator.isEmail = function (str, options) {
            options = merge(options, default_email_options);

            if (options.allow_display_name) {
              var display_email = str.match(displayName);
              if (display_email) {
                str = display_email[1];
              }
            }

            var parts = str.split('@')
              , domain = parts.pop()
              , user = parts.join('@');

            var lower_domain = domain.toLowerCase();
            if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
              user = user.replace(/\./g, '').toLowerCase();
            }

            if (!validator.isByteLength(user, 0, 64) ||
              !validator.isByteLength(domain, 0, 256)) {
              return false;
            }

            if (!validator.isFQDN(domain, {require_tld: options.require_tld})) {
              return false;
            }

            if (user[0] === '"') {
              user = user.slice(1, user.length - 1);
              return options.allow_utf8_local_part ?
                quotedEmailUserUtf8.test(user) :
                quotedEmailUser.test(user);
            }

            var pattern = options.allow_utf8_local_part ?
              emailUserUtf8Part : emailUserPart;

            var user_parts = user.split('.');
            for (var i = 0; i < user_parts.length; i++) {
              if (!pattern.test(user_parts[i])) {
                return false;
              }
            }

            return true;
          };

          var default_url_options = {
            protocols: [ 'http', 'https', 'ftp' ]
            , require_tld: true
            , require_protocol: false
            , require_valid_protocol: true
            , allow_underscores: false
            , allow_trailing_dot: false
            , allow_protocol_relative_urls: false
          };

          validator.isURL = function (url, options) {
            if (!url || url.length >= 2083 || /\s/.test(url)) {
              return false;
            }
            if (url.indexOf('mailto:') === 0) {
              return false;
            }
            options = merge(options, default_url_options);
            var protocol, auth, host, hostname, port,
              port_str, split;
            split = url.split('://');
            if (split.length > 1) {
              protocol = split.shift();
              if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
                return false;
              }
            } else if (options.require_protocol) {
              return false;
            }  else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
              split[0] = url.substr(2);
            }
            url = split.join('://');
            split = url.split('#');
            url = split.shift();

            split = url.split('?');
            url = split.shift();

            split = url.split('/');
            url = split.shift();
            split = url.split('@');
            if (split.length > 1) {
              auth = split.shift();
              if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
                return false;
              }
            }
            hostname = split.join('@');
            split = hostname.split(':');
            host = split.shift();
            if (split.length) {
              port_str = split.join(':');
              port = parseInt(port_str, 10);
              if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
                return false;
              }
            }
            if (!validator.isIP(host) && !validator.isFQDN(host, options) &&
              host !== 'localhost') {
              return false;
            }
            if (options.host_whitelist &&
              options.host_whitelist.indexOf(host) === -1) {
              return false;
            }
            if (options.host_blacklist &&
              options.host_blacklist.indexOf(host) !== -1) {
              return false;
            }
            return true;
          };

          validator.isMACAddress = function (str) {
            return macAddress.test(str);
          };

          validator.isIP = function (str, version) {
            version = validator.toString(version);
            if (!version) {
              return validator.isIP(str, 4) || validator.isIP(str, 6);
            } else if (version === '4') {
              if (!ipv4Maybe.test(str)) {
                return false;
              }
              var parts = str.split('.').sort(function (a, b) {
                return a - b;
              });
              return parts[3] <= 255;
            } else if (version === '6') {
              var blocks = str.split(':');
              var foundOmissionBlock = false; // marker to indicate ::

              // At least some OS accept the last 32 bits of an IPv6 address
              // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
              // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
              // and '::a.b.c.d' is deprecated, but also valid.
              var foundIPv4TransitionBlock = validator.isIP(blocks[blocks.length - 1], 4);
              var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

              if (blocks.length > expectedNumberOfBlocks)
                return false;

              // initial or final ::
              if (str === '::') {
                return true;
              } else if (str.substr(0, 2) === '::') {
                blocks.shift();
                blocks.shift();
                foundOmissionBlock = true;
              } else if (str.substr(str.length - 2) === '::') {
                blocks.pop();
                blocks.pop();
                foundOmissionBlock = true;
              }

              for (var i = 0; i < blocks.length; ++i) {
                // test for a :: which can not be at the string start/end
                // since those cases have been handled above
                if (blocks[i] === '' && i > 0 && i < blocks.length -1) {
                  if (foundOmissionBlock)
                    return false; // multiple :: in address
                  foundOmissionBlock = true;
                } else if (foundIPv4TransitionBlock && i == blocks.length - 1) {
                  // it has been checked before that the last
                  // block is a valid IPv4 address
                } else if (!ipv6Block.test(blocks[i])) {
                  return false;
                }
              }

              if (foundOmissionBlock) {
                return blocks.length >= 1;
              } else {
                return blocks.length === expectedNumberOfBlocks;
              }
            }
            return false;
          };

          var default_fqdn_options = {
            require_tld: true
            , allow_underscores: false
            , allow_trailing_dot: false
          };

          validator.isFQDN = function (str, options) {
            options = merge(options, default_fqdn_options);

            /* Remove the optional trailing dot before checking validity */
            if (options.allow_trailing_dot && str[str.length - 1] === '.') {
              str = str.substring(0, str.length - 1);
            }
            var parts = str.split('.');
            if (options.require_tld) {
              var tld = parts.pop();
              if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                return false;
              }
            }
            for (var part, i = 0; i < parts.length; i++) {
              part = parts[i];
              if (options.allow_underscores) {
                if (part.indexOf('__') >= 0) {
                  return false;
                }
                part = part.replace(/_/g, '');
              }
              if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
                return false;
              }
              if (/[\uff01-\uff5e]/.test(part)) {
                // disallow full-width chars
                return false;
              }
              if (part[0] === '-' || part[part.length - 1] === '-') {
                return false;
              }
              if (part.indexOf('---') >= 0 && part.slice(0, 4) !== 'xn--') {
                return false;
              }
            }
            return true;
          };

          validator.isBoolean = function(str) {
            return (['true', 'false', '1', '0'].indexOf(str) >= 0);
          };

          validator.isAlpha = function (str) {
            return alpha.test(str);
          };

          validator.isAlphanumeric = function (str) {
            return alphanumeric.test(str);
          };

          validator.isNumeric = function (str) {
            return numeric.test(str);
          };

          validator.isDecimal = function (str) {
            return str !== '' && decimal.test(str);
          };

          validator.isHexadecimal = function (str) {
            return hexadecimal.test(str);
          };

          validator.isHexColor = function (str) {
            return hexcolor.test(str);
          };

          validator.isLowercase = function (str) {
            return str === str.toLowerCase();
          };

          validator.isUppercase = function (str) {
            return str === str.toUpperCase();
          };

          validator.isInt = function (str, options) {
            options = options || {};
            return int.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
          };

          validator.isFloat = function (str, options) {
            options = options || {};
            if (str === '' || str === '.') {
              return false;
            }
            return float.test(str) && (!options.hasOwnProperty('min') || str >= options.min) && (!options.hasOwnProperty('max') || str <= options.max);
          };

          validator.isDivisibleBy = function (str, num) {
            return validator.toFloat(str) % validator.toInt(num) === 0;
          };

          validator.isNull = function (str) {
            return str.length === 0;
          };

          validator.isLength = function (str, min, max) {
            var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
            var len = str.length - surrogatePairs.length;
            return len >= min && (typeof max === 'undefined' || len <= max);
          };

          validator.isByteLength = function (str, min, max) {
            var len = encodeURI(str).split(/%..|./).length - 1;
            return len >= min && (typeof max === 'undefined' || len <= max);
          };

          validator.isUUID = function (str, version) {
            var pattern = uuid[version ? version : 'all'];
            return pattern && pattern.test(str);
          };

          function getTimezoneOffset(str) {
            var iso8601Parts = str.match(iso8601)
              , timezone, sign, hours, minutes;
            if (!iso8601Parts) {
              str = str.toLowerCase();
              timezone = str.match(/(?:\s|gmt\s*)(-|\+)(\d{1,4})(\s|$)/);
              if (!timezone) {
                return str.indexOf('gmt') !== -1 ? 0 : null;
              }
              sign = timezone[1];
              var offset = timezone[2];
              if (offset.length === 3) {
                offset = '0' + offset;
              }
              if (offset.length <= 2) {
                hours = 0;
                minutes = parseInt(offset);
              } else {
                hours = parseInt(offset.slice(0, 2));
                minutes = parseInt(offset.slice(2, 4));
              }
            } else {
              timezone = iso8601Parts[21];
              if (!timezone || timezone === 'z' || timezone === 'Z') {
                return 0;
              }
              sign = iso8601Parts[22];
              if (timezone.indexOf(':') !== -1) {
                hours = parseInt(iso8601Parts[23]);
                minutes = parseInt(iso8601Parts[24]);
              } else {
                hours = 0;
                minutes = parseInt(iso8601Parts[23]);
              }
            }
            return (hours * 60 + minutes) * (sign === '-' ? 1 : -1);
          }

          validator.isDate = function (str) {
            var normalizedDate = new Date(Date.parse(str));
            if (isNaN(normalizedDate)) {
              return false;
            }
            // normalizedDate is in the user's timezone. Apply the input
            // timezone offset to the date so that the year and day match
            // the input
            var timezoneOffset = getTimezoneOffset(str);
            if (timezoneOffset !== null) {
              var timezoneDifference = normalizedDate.getTimezoneOffset() -
                timezoneOffset;
              normalizedDate = new Date(normalizedDate.getTime() +
                60000 * timezoneDifference);
            }
            var day = String(normalizedDate.getDate());
            var dayOrYear, dayOrYearMatches, year;
            //check for valid double digits that could be late days
            //check for all matches since a string like '12/23' is a valid date
            //ignore everything with nearby colons
            dayOrYearMatches = str.match(/(^|[^:\d])[23]\d([^:\d]|$)/g);
            if (!dayOrYearMatches) {
              return true;
            }
            dayOrYear = dayOrYearMatches.map(function(digitString) {
              return digitString.match(/\d+/g)[0];
            }).join('/');
            year = String(normalizedDate.getFullYear()).slice(-2);
            if (dayOrYear === day || dayOrYear === year) {
              return true;
            } else if ((dayOrYear === (day + '/' + year)) || (dayOrYear === (year + '/' + day))) {
              return true;
            }
            return false;
          };

          validator.isAfter = function (str, date) {
            var comparison = validator.toDate(date || new Date())
              , original = validator.toDate(str);
            return !!(original && comparison && original > comparison);
          };

          validator.isBefore = function (str, date) {
            var comparison = validator.toDate(date || new Date())
              , original = validator.toDate(str);
            return !!(original && comparison && original < comparison);
          };

          validator.isIn = function (str, options) {
            var i;
            if (Object.prototype.toString.call(options) === '[object Array]') {
              var array = [];
              for (i in options) {
                array[i] = validator.toString(options[i]);
              }
              return array.indexOf(str) >= 0;
            } else if (typeof options === 'object') {
              return options.hasOwnProperty(str);
            } else if (options && typeof options.indexOf === 'function') {
              return options.indexOf(str) >= 0;
            }
            return false;
          };

          validator.isWhitelisted = function (str, chars) {
            for (var i = str.length - 1; i >= 0; i--) {
              if (chars.indexOf(str[i]) === -1) {
                return false;
              }
            }

            return true;
          };

          validator.isCreditCard = function (str) {
            var sanitized = str.replace(/[^0-9]+/g, '');
            if (!creditCard.test(sanitized)) {
              return false;
            }
            var sum = 0, digit, tmpNum, shouldDouble;
            for (var i = sanitized.length - 1; i >= 0; i--) {
              digit = sanitized.substring(i, (i + 1));
              tmpNum = parseInt(digit, 10);
              if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                  sum += ((tmpNum % 10) + 1);
                } else {
                  sum += tmpNum;
                }
              } else {
                sum += tmpNum;
              }
              shouldDouble = !shouldDouble;
            }
            return !!((sum % 10) === 0 ? sanitized : false);
          };

          validator.isISIN = function (str) {
            if (!isin.test(str)) {
              return false;
            }

            var checksumStr = str.replace(/[A-Z]/g, function(character) {
              return parseInt(character, 36);
            });

            var sum = 0, digit, tmpNum, shouldDouble = true;
            for (var i = checksumStr.length - 2; i >= 0; i--) {
              digit = checksumStr.substring(i, (i + 1));
              tmpNum = parseInt(digit, 10);
              if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                  sum += tmpNum + 1;
                } else {
                  sum += tmpNum;
                }
              } else {
                sum += tmpNum;
              }
              shouldDouble = !shouldDouble;
            }

            return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
          };

          validator.isISBN = function (str, version) {
            version = validator.toString(version);
            if (!version) {
              return validator.isISBN(str, 10) || validator.isISBN(str, 13);
            }
            var sanitized = str.replace(/[\s-]+/g, '')
              , checksum = 0, i;
            if (version === '10') {
              if (!isbn10Maybe.test(sanitized)) {
                return false;
              }
              for (i = 0; i < 9; i++) {
                checksum += (i + 1) * sanitized.charAt(i);
              }
              if (sanitized.charAt(9) === 'X') {
                checksum += 10 * 10;
              } else {
                checksum += 10 * sanitized.charAt(9);
              }
              if ((checksum % 11) === 0) {
                return !!sanitized;
              }
            } else  if (version === '13') {
              if (!isbn13Maybe.test(sanitized)) {
                return false;
              }
              var factor = [ 1, 3 ];
              for (i = 0; i < 12; i++) {
                checksum += factor[i % 2] * sanitized.charAt(i);
              }
              if (sanitized.charAt(12) - ((10 - (checksum % 10)) % 10) === 0) {
                return !!sanitized;
              }
            }
            return false;
          };

          validator.isMobilePhone = function(str, locale) {
            if (locale in phones) {
              return phones[locale].test(str);
            }
            return false;
          };

          var default_currency_options = {
            symbol: '$'
            , require_symbol: false
            , allow_space_after_symbol: false
            , symbol_after_digits: false
            , allow_negatives: true
            , parens_for_negatives: false
            , negative_sign_before_digits: false
            , negative_sign_after_digits: false
            , allow_negative_sign_placeholder: false
            , thousands_separator: ','
            , decimal_separator: '.'
            , allow_space_after_digits: false
          };

          validator.isCurrency = function (str, options) {
            options = merge(options, default_currency_options);

            return currencyRegex(options).test(str);
          };

          validator.isJSON = function (str) {
            try {
              var obj = JSON.parse(str);
              return !!obj && typeof obj === 'object';
            } catch (e) {}
            return false;
          };

          validator.isMultibyte = function (str) {
            return multibyte.test(str);
          };

          validator.isAscii = function (str) {
            return ascii.test(str);
          };

          validator.isFullWidth = function (str) {
            return fullWidth.test(str);
          };

          validator.isHalfWidth = function (str) {
            return halfWidth.test(str);
          };

          validator.isVariableWidth = function (str) {
            return fullWidth.test(str) && halfWidth.test(str);
          };

          validator.isSurrogatePair = function (str) {
            return surrogatePair.test(str);
          };

          validator.isBase64 = function (str) {
            return base64.test(str);
          };

          validator.isMongoId = function (str) {
            return validator.isHexadecimal(str) && str.length === 24;
          };

          validator.isISO8601 = function (str) {
            return iso8601.test(str);
          };

          validator.ltrim = function (str, chars) {
            var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
            return str.replace(pattern, '');
          };

          validator.rtrim = function (str, chars) {
            var pattern = chars ? new RegExp('[' + chars + ']+$', 'g') : /\s+$/g;
            return str.replace(pattern, '');
          };

          validator.trim = function (str, chars) {
            var pattern = chars ? new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g') : /^\s+|\s+$/g;
            return str.replace(pattern, '');
          };

          validator.escape = function (str) {
            return (str.replace(/&/g, '&amp;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#x27;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/\//g, '&#x2F;')
              .replace(/\`/g, '&#96;'));
          };

          validator.stripLow = function (str, keep_new_lines) {
            var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
            return validator.blacklist(str, chars);
          };

          validator.whitelist = function (str, chars) {
            return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
          };

          validator.blacklist = function (str, chars) {
            return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
          };

          var default_normalize_email_options = {
            lowercase: true,
            remove_dots: true,
            remove_extension: true
          };

          validator.normalizeEmail = function (email, options) {
            options = merge(options, default_normalize_email_options);
            if (!validator.isEmail(email)) {
              return false;
            }
            var parts = email.split('@', 2);
            parts[1] = parts[1].toLowerCase();
            if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
              if (options.remove_extension) {
                parts[0] = parts[0].split('+')[0];
              }
              if (options.remove_dots) {
                parts[0] = parts[0].replace(/\./g, '');
              }
              if (!parts[0].length) {
                return false;
              }
              parts[0] = parts[0].toLowerCase();
              parts[1] = 'gmail.com';
            } else if (options.lowercase) {
              parts[0] = parts[0].toLowerCase();
            }
            return parts.join('@');
          };

          function merge(obj, defaults) {
            obj = obj || {};
            for (var key in defaults) {
              if (typeof obj[key] === 'undefined') {
                obj[key] = defaults[key];
              }
            }
            return obj;
          }

          function currencyRegex(options) {
            var symbol = '(\\' + options.symbol.replace(/\./g, '\\.') + ')' + (options.require_symbol ? '' : '?')
              , negative = '-?'
              , whole_dollar_amount_without_sep = '[1-9]\\d*'
              , whole_dollar_amount_with_sep = '[1-9]\\d{0,2}(\\' + options.thousands_separator + '\\d{3})*'
              , valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep]
              , whole_dollar_amount = '(' + valid_whole_dollar_amounts.join('|') + ')?'
              , decimal_amount = '(\\' + options.decimal_separator + '\\d{2})?';
            var pattern = whole_dollar_amount + decimal_amount;
            // default is negative sign before symbol, but there are two other options (besides parens)
            if (options.allow_negatives && !options.parens_for_negatives) {
              if (options.negative_sign_after_digits) {
                pattern += negative;
              }
              else if (options.negative_sign_before_digits) {
                pattern = negative + pattern;
              }
            }
            // South African Rand, for example, uses R 123 (space) and R-123 (no space)
            if (options.allow_negative_sign_placeholder) {
              pattern = '( (?!\\-))?' + pattern;
            }
            else if (options.allow_space_after_symbol) {
              pattern = ' ?' + pattern;
            }
            else if (options.allow_space_after_digits) {
              pattern += '( (?!$))?';
            }
            if (options.symbol_after_digits) {
              pattern += symbol;
            } else {
              pattern = symbol + pattern;
            }
            if (options.allow_negatives) {
              if (options.parens_for_negatives) {
                pattern = '(\\(' + pattern + '\\)|' + pattern + ')';
              }
              else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
                pattern = negative + pattern;
              }
            }
            return new RegExp(
              '^' +
                // ensure there's a dollar and/or decimal amount, and that it doesn't start with a space or a negative sign followed by a space
              '(?!-? )(?=.*\\d)' +
              pattern +
              '$'
            );
          }

          validator.init();

          return validator;

        });

        return _this.validator;

    })
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
    .directive('contains', ['nodeValidator', function (validator) {
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
    .directive('equals', ['nodeValidator', function (validator) {
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
    .directive('isAfter', ['nodeValidator', function (validator) {
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
    .directive('isAlpha', ['nodeValidator', function (validator) {
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
    .directive('isAlphanumeric', ['nodeValidator', function (validator) {
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
    .directive('isAscii', ['nodeValidator', function (validator) {
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
    .directive('isBase64', ['nodeValidator', function (validator) {
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
    .directive('isBefore', ['nodeValidator', function (validator) {
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
    .directive('isBoolean', ['nodeValidator', function (validator) {
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
    .directive('isCreditCard', ['nodeValidator', function (validator) {
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
    .directive('isCurrency', ['nodeValidator', function (validator) {
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
    .directive('isDate', ['nodeValidator', function (validator) {
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
    .directive('isDivisibleBy', ['nodeValidator', function (validator) {
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
    .directive('isEmail', ['nodeValidator', function (validator) {
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
    .directive('isFqdn', ['nodeValidator', function (validator) {
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
    .directive('isFloat', ['nodeValidator', function (validator) {
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
    .directive('isFullWidth', ['nodeValidator', function (validator) {
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
    .directive('isHalfWidth', ['nodeValidator', function (validator) {
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
    .directive('isHexColor', ['nodeValidator', function (validator) {
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
    .directive('isHexadecimal', ['nodeValidator', function (validator) {
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
    .directive('isIp', ['nodeValidator', function (validator) {
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
    .directive('isIsbn', ['nodeValidator', function (validator) {
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
    .directive('isIsin', ['nodeValidator', function (validator) {
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
    .directive('isIso8601', ['nodeValidator', function (validator) {
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
    .directive('isIn', ['nodeValidator', function (validator) {
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
    .directive('isInt', ['nodeValidator', function (validator) {
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
    .directive('isJson', ['nodeValidator', function (validator) {
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
    .directive('isLowercase', ['nodeValidator', function (validator) {
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
    .directive('isMobilePhone', ['nodeValidator', function (validator) {
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
    .directive('isMongoId', ['nodeValidator', function (validator) {
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
    .directive('isMultibyte', ['nodeValidator', function (validator) {
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
    .directive('isNull', ['nodeValidator', function (validator) {
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
    .directive('isNumeric', ['nodeValidator', function (validator) {
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
    .directive('isUrl', ['nodeValidator', function (validator) {
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
    .directive('isUuid', ['nodeValidator', function (validator) {
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
    .directive('isUppercase', ['nodeValidator', function (validator) {
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
    .directive('isVariableWidth', ['nodeValidator', function (validator) {
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
    .directive('isSurrogatePair', ['nodeValidator', function (validator) {
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
    .directive('watchEquals', ['nodeValidator', function (validator) {
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
