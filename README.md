[![npm version](https://badge.fury.io/js/angular.validators.svg)](http://badge.fury.io/js/angular.validators)
[![Bower version](https://badge.fury.io/bo/angular.validators.svg)](http://badge.fury.io/bo/angular.validators)

# angular.validators

Angular validation directives using [validator.js](https://www.npmjs.com/package/validator)

### Contents

+ [Install](#install)
+ [Supported functions](#supported-functions)
+ [Use](#use)
+ [Changelog](#changelog)
+ [License](#license)

### Install

    bower install angular.validator
    
Include the module in your dependencies
    
    angular.module('myProject',[
        'angular.validators'
    ])
    
### Supported functions

Currently the following functions are supported. 

Directive | Description | Arguments
-------------------|-------------|-------------------
 contains | check if the string contains the seed | string
 equals | check if the string matches the comparison. | string
 is-after | check if the string is a date that's after the specified date (defaults to now). | date
 is-alpha |  check if the string contains only letters (a-zA-Z).
 is-alphanumeric | check if the string contains only letters and numbers.
 is-ascii | check if the string contains ASCII chars only.
 is-base64 | check if a string is base64 encoded.
 is-before | check if the string is a date that's before the specified date (defaults to now). | date
 is-boolean | check if a string is a boolean |
 is-credit-card | check if the string is a credit card.
 is-currency | check if the string is a valid currency amount | as in validator.js isCurrency
 is-date | check if the string is a date.
 is-divisible-by | check if the string is a number that's divisible by another | Int
 is-email | check if the string is an email. | as in validator.js isEmail
 is-fqdn | check if the string is a fully qualified domain name (e.g. domain.com).
 is-float | check if the string is a float.
 is-full-width | check if the string contains any full-width chars.
 is-half-width | check if the string contains any half-width chars.
 is-hex-color | check if the string is a hexadecimal color.
 is-hexadecimal | check if the string is a hexadecimal number.
 is-ip | check if the string is an IP (version 4 or 6). | 4, 6
 is-isbn |  check if the string is an ISBN (version 10 or 13). | 10, 13
 is-isin |  check if the string is an ISIN (stock/security identifier)
 is-in | check if the string is in a array of allowed values. | array
 is-int | check if the string is an integer.
 is-json | check if the string is valid JSON (note: uses JSON.parse).
 is-lowercase | check if the string is lowercase.
 is-mobile-phone | check if the string is a mobile phone number |  zh-CN, en-ZA, en-AU, pt-PT, el-GR. For el-GR landline and mobile phones are validated.
 is-mongo-id | check if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 is-multibyte |  check if the string contains one or more multibyte chars.
 is-null | check if the string is null.
 is-numeric | check if the string contains only numbers.
 is-url | check if the string is a URL.
 is-uuid | check if the string is a UUID (version 3, 4 or 5). |  3, 4, 5
 is-uppercase | check if the string is uppercase.
 is-variable-width | check if the string contains a mixture of full and half-width chars.
 is-surrogate-pair | check if the string contains any surrogate pairs chars.
 watch-equals | check if the string matches the comparison. | ngModel

### Use

To use a validator simply include the angular directive in an input element.

    <form name="form">
      <input type="text" ng-model="value" name="value" is-mongo-id />
    </form>
    
You can use multiple directives at once

    <form name="form">
      <input type="text" ng-model="value" name="value" is-alpha is-lowercase />
    </form>

### Changelog

v3.40.1 - updated to validator.js v3.40.1. Deprecated is-phone and changed it to is-mobile-phone to be in parity with validator.js. 
        Added new validators and suppot for optional arguments as in validator.js Major refactoring at tests, removed most of the files and replaced them with a single one.

v3.40.0 - updated to validator.js v3.40.0

v3.39.0 - updated to validator.js v3.39.0

v3.38.0 - updated to validator.js v3.38.0

v3.37.3 - updated package.json and bower.json

v3.37.2 - updated package.json and bower.json

v3.37.1 - updated package.json and bower.json

v3.37.0 - updated to validator.js v3.37.0

v3.35.0 - updated to validator.js v3.35.0

v3.34.0 - updated to validator.js v3.34.0

v3.33.1 - all validators are restricted as attributes now

v3.33.0 - updated to validator.js v3.33.0

v3.30.6 - simplified file structure 

v3.30.5 - equals, watchEquals validators. watchEquals can be used for password validation where two fields may change.
Currently it must not be used as a circular watch, e.x :

    <input type="text" name="test1" ng-model="t.test1" watch-equals='{{t.test2}}'/>
    <input type="text" name="test2" ng-model="t.test2" watch-equals='{{t.test1}}'/>
  

v3.30.4 - isPhone validator with validator.js's locales + Greek landline and mobile validation.

v3.30.3 - new validators and some validation options where possible.

v3.30.0 - version bump to be on par with validator.js


### License

Copyright (c) 2015 George Kaimakas <gkaimakas@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

