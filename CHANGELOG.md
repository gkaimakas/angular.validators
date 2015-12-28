# Changelog

## v.4.4.2
Fixed a bug in the tests that caused them to fail. Also Happy holidays

## v4.4.1 
Updated to version 4.4.1

## v4.3.0 
Updated to version 4.3.0

## v4.2.1
It's been a long time, updated to version 4.2.1

## v4.0.6
reverted back to code from v4.0.2 since v4.0.3 & v4.0.4 where riddled with bugs.
 
## v4.0.5
reverted back to code from v4.0.2 since v4.0.3 & v4.0.4 where riddled with bugs. 

## v4.0.4
DECRECATED use v4.0.6+ instead

## v4.0.3
DECRECATED use v4.0.6_ instead

## v4.0.2
updated to validator.js v4.0.2 

## v4.0.0
updated to validator.js v4.0.0 and new directive is-iso8601 

## v3.41.2 
updated to validator.js v3.41.2 and added support for async validation using the asyncValid directive

## v3.41.1 
updated to validator.js v3.41.1

## v3.40.1 
updated to validator.js v3.40.1. Deprecated is-phone and changed it to is-mobile-phone to be in parity with validator.js. 
        Added new validators and suppot for optional arguments as in validator.js Major refactoring at tests, removed most of the files and replaced them with a single one.

## v3.40.0 
updated to validator.js v3.40.0

## v3.39.0 
updated to validator.js v3.39.0

## v3.38.0 
updated to validator.js v3.38.0

## v3.37.3 
updated package.json and bower.json

## v3.37.2 
updated package.json and bower.json

## v3.37.1 
updated package.json and bower.json

## v3.37.0 
updated to validator.js v3.37.0

## v3.35.0 
updated to validator.js v3.35.0

## v3.34.0 
updated to validator.js v3.34.0

## v3.33.1 
all validators are restricted as attributes now

## v3.33.0 
updated to validator.js v3.33.0

## v3.30.6 
simplified file structure 

## v3.30.5 
equals, watchEquals validators. watchEquals can be used for password validation where two fields may change.
Currently it must not be used as a circular watch, e.x :

    <input type="text" name="test1" ng-model="t.test1" watch-equals='{{t.test2}}'/>
    <input type="text" name="test2" ng-model="t.test2" watch-equals='{{t.test1}}'/>
  

## v3.30.4 
isPhone validator with validator.js's locales + Greek landline and mobile validation.

## v3.30.3 
new validators and some validation options where possible.

## v3.30.0 
version bump to be on par with validator.js
