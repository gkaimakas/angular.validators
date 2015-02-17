[![npm version](https://badge.fury.io/js/angular.validators.svg)](http://badge.fury.io/js/angular.validators)
[![Bower version](https://badge.fury.io/bo/angular.validators.svg)](http://badge.fury.io/bo/angular.validators)

# angular.validators

Angular wrapper for [validator](https://www.npmjs.com/package/validator) by [Chris O'Hara](https://github.com/chriso).

### Contents

+ [Validator version](#validator-version)
+ [Install](#install)
+ [Supported functions](#supported-functions)
+ [Use](#use)
+ [Disclaimer](#disclaimer)
+ [License](#license)

### Validator version

This module was written using validator v3.30.0

### Install

    bower install angular.validator
    
Include the module in your dependencies
    
    angular.module('myProject',[
        'angular.validators'
    ])
    
### Supported functions

Currently we support the following functions. 
*All functions support only the default options of validator.*

Validator function | Angular directive | Description | Optional Arguments
-------------------|-------------------|-------------|-------------------
isEmail | is-email | check if the string is an email.
isURL | is-url | check if the string is a URL.
isFQDN | is-fqdn | check if the string is a fully qualified domain name (e.g. domain.com).
isIP | is-ip | check if the string is an IP (version 4 or 6). | ipVersion
isAlpha | is-alpha |  check if the string contains only letters (a-zA-Z).
isNumeric | is-numeric | check if the string contains only numbers.
isAlphanumeric | is-alphanumeric | check if the string contains only letters and numbers.
isBase64 | is-base64 | check if a string is base64 encoded.
isHexadecimal | is-hexadecimal | check if the string is a hexadecimal number.
isHexColor | is-hex-color | check if the string is a hexadecimal color.
isLowercase | is-lowercase | check if the string is lowercase.
isUppercase | is-uppercase | check if the string is uppercase.
isInt | is-int | check if the string is an integer.
isFloat | is-float | check if the string is a float.
isNull | is-null | check if the string is null.
isUUID | is-uuid | check if the string is a UUID (version 3, 4 or 5).
isDate | is-date | check if the string is a date.
isCreditCard | is-credit-card | check if the string is a credit card.
isISBN | is-isbn |  check if the string is an ISBN (version 10 or 13).
isJSON | is-json | check if the string is valid JSON (note: uses JSON.parse).
isMultibyte | is-multibyte |  check if the string contains one or more multibyte chars.
isAscii | is-ascii | check if the string contains ASCII chars only.
isFullWidth | is-full-width | check if the string contains any full-width chars.
isHalfWidth | is-half-width | check if the string contains any half-width chars.
isVariableWidth | is-variable-width | check if the string contains a mixture of full and half-width chars.
isSurrogatePair | is-surrogate-pair | check if the string contains any surrogate pairs chars.
isMongoId | is-mongo-id | check if the string is a valid hex-encoded representation of a MongoDB ObjectId.

### Use

To use a validator simply include the angular directive in an input element.

    <form name="form">
      <input type="text" ng-model="value" name="value" is-mongo-id />
    </form>
    
You can use multiple directives at once

    <form name="form">
      <input type="text" ng-model="value" name="value" is-alpha is-lowercase />
    </form>

### Disclaimer

I did not create validator. Validator was created and maintained by [Chris O'Hara](https://github.com/chriso).

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

