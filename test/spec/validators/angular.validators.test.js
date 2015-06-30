/**
 * Created by gkaimakas on 2/13/15.
 */

var tests = [
    {
        directive: 'contains',
        options: 'help',
        valid: [
            'helper'
        ],
        invalid: [
            '-34',
            '34'
        ]
    },
    {
        directive: 'equals',
        options: '123456',
        valid: [
            '123456'
        ],
        invalid: [
            '234567',
            'sdgsgf'
        ]
    },
    {
        directive: 'is-after',
        options: '2011-08-03',
        valid: [
            '2011-08-04',
            new Date(2011, 8, 10)
        ],
        invalid: [
            '2010-07-02',
            new Date(0)
        ]
    },
    {
        directive: 'is-alphanumeric',
        options: null,
        valid: [
            'aldsgjsh932742',
            'asdgdfh64564',
            '2453tgs'
        ],
        invalid: [
            'err/or',
            '----',
            'fbdb.....'
        ]
    },
    {
        directive: 'is-alpha',
        options: null,
        valid: [
            'dfgdwdghgh',
            'dsfsdfsgs'
        ],
        invalid: [
            '3423ΓΣ',
            'εςφερ3'
        ]
    },
    {
        directive: 'is-ascii',
        options: null,
        valid: [
            000,
        ],
        invalid: [
            'σδφσδφ23σ',
            'δσφσ'
        ]
    },
    {
        directive: 'is-base64',
        options: null,
        valid: [
            'TWFu'
        ],
        invalid: [
            'man'
        ]
    },
    {
        directive: 'is-before',
        options: '08/04/2011',
        valid: [
            '2010-07-02',
            '2010-08-08',
            new Date(0)
        ],
        invalid: [
            '08/04/2011',
            new Date(2011, 9, 10)
        ]
    },
    {
        directive: 'is-boolean',
        options: null,
        valid: [
            true,
            false,
            'false',
            'true',
            0,
            1
        ],
        invalid: [
            'yes',
            'no'
        ]
    },
    {
        directive: 'is-credit-card',
        options: null,
        valid: [
            '5328471859490127'
        ],
        invalid: [
            'yes',
            'no'
        ]
    },
    {
        directive: 'is-date',
        options: null,
        valid: [
            (new Date()).toString()
        ],
        invalid: [
            'yes',
            'no'
        ]
    },
    {
        directive: 'is-divisible-by',
        options: 12,
        valid: [
            24,
            48,
            60,
            72,
            84,
        ],
        invalid: [
            'yes',
            'no',
            1,
            13,
            25,
            37
        ]
    },
    {
        directive: 'is-email',
        options: null,
        valid: [
            'gkaimakas@gmail.com',
            'gkaimakas@hotmail.gr',
            'kaimakas@ceid.upatras.gr'
        ],
        invalid: [
            'rtwet324@gsgf.hteht@.g',
            '123@tr.wetyeerw!'
        ]
    },
    {
        directive: 'is-float',
        options: null,
        valid: [
            1245.4,
            234.35635,
            '235254.2453'
        ],
        invalid: [
            'dfsgf.34234',
            '234235,234'
        ]
    },
    {
        directive: 'is-fqdn',
        options: null,
        valid: [
            'www.github.com',
            'www.github.co'
        ],
        invalid: [
            'dfsgf.34234',
            '234235,234'
        ]
    },
    {
        directive: 'is-full-width',
        options: null,
        valid: [
            'ひらがな・カタカナ、．漢字',
            '３ー０　ａ＠ｃｏｍ',
            'Ｆｶﾀｶﾅﾞﾬ',
            'Good＝Parts'
        ],
        invalid: [
            'abc',
            'abc123',
            '!"#$%&()<>/+=-_? ~^|.,@`{}[]'
        ]
    },
    {
        directive: 'is-half-width',
        options: null,
        valid: [
            '!"#$%&()<>/+=-_? ~^|.,@`{}[]',
            'l-btn_02--active',
            'abc123い',
            'ｶﾀｶﾅﾞﾬ￩'
        ],
        invalid: [
            'あいうえお',
            '００１１'
        ]
    },
    {
        directive: 'is-hexadecimal',
        options: null,
        valid: [
            '06a2',
            '06a3'
        ],
        invalid: [
            'dfsgf.34234',
            '234235,234'
        ]
    },
    {
        directive: 'is-hex-color',
        options: null,
        valid: [
            '#06a234',
            '#fafafa'
        ],
        invalid: [
            '06a234-',
            'fafafa-',
            'fafg'
        ]
    },
    {
        directive: 'is-in',
        options: ['a', 'b', 'c'],
        valid: [
            'a',
            'b',
            'c'
        ],
        invalid: [
            '-',
            'd',
            'ef'
        ]
    },
    {
        directive: 'is-int',
        options: null,
        valid: [
            '1234',
            '2345',
            '3456'
        ],
        invalid: [
            '-',
            '12.5',
            '-14.45'
        ]
    },
    {
        directive: 'is-ip',
        options: null,
        valid: [
            '172.1.2.1',
            '172.1.2.2',
            '172.1.2.123'
        ],
        invalid: [
            '-http:/github.com/gkaimakas/angular.validators',
            'http:/github.com/gkaimakas/angular.validators.5',
            '-http:/github.com/gkaimakas/angular.validators.45'
        ]
    },
    {
        directive: 'is-ip',
        options: 4,
        valid: [
            '172.1.2.1',
            '172.1.2.2',
            '172.1.2.123'
        ],
        invalid: [
            '-http:/github.com/gkaimakas/angular.validators',
            'http:/github.com/gkaimakas/angular.validators.5',
            '-http:/github.com/gkaimakas/angular.validators.45'
        ]
    },
    {
        directive: 'is-ip',
        options: 6,
        valid: [
            '2000::',
            '2002:c0a8:101::42',
            '2003:dead:beef:4dad:23:46:bb:101'
        ],
        invalid: [
            '-http:/github.com/gkaimakas/angular.validators',
            'http:/github.com/gkaimakas/angular.validators.5',
            '-http:/github.com/gkaimakas/angular.validators.45'
        ]
    },
    {
        directive: 'is-isin',
        options: null,
        valid: [
            'AU0000XVGZA3',
            'DE000BAY0017',
            'BE0003796134',
            'SG1G55870362',
            'GB0001411924',
            'DE000WCH8881',
            'PLLWBGD00016'
        ],
        invalid: [
            'DE000BAY0018',
            'PLLWBGD00019',
            'foo',
            '5398228707871528'
        ]
    },
    {
        directive: 'is-isbn',
        options: 10,
        valid: [
            '90-70002-34-5'
        ],
        invalid: [
            '-http:/github.com/gkaimakas/angular.validators',
            'http:/github.com/gkaimakas/angular.validators.5',
            '-http:/github.com/gkaimakas/angular.validators.45'
        ]
    },
    {
        directive: 'is-json',
        options: null,
        valid: [
            '{"a" : "a", "b"  : ["c"]}'
        ],
        invalid: [
            '{a:"sdf"}'
        ]
    },
    {
        directive: 'is-lowercase',
        options: null,
        valid: [
            'aaaaa',
            'bbbbb',
            'ccccc'
        ],
        invalid: [
            'aAaAa',
            'bBbBb'
        ]
    },
    {
        directive: 'is-mobile-phone',
        options: 'el-GR',
        valid: [
            '6944848966',
            '2610123456'
        ],
        invalid: [
            '54768923101',
            '1234567890134'
        ]
    },
    {
        directive: 'is-mongo-id',
        options: null,
        valid: [
            '507f1f77bcf86cd799439011',
            '507f1f77bcf86cd799439012'
        ],
        invalid: [
            '54768923101',
            '1234567890134'
        ]
    },
    {
        directive: 'is-multibyte',
        options: null,
        valid: [
            'Î'
        ],
        invalid: [
            'dsfsdf',
            '1234567890134'
        ]
    },
    {
        directive: 'is-null',
        options: null,
        valid: [
            null,
        ],
        invalid: [
            'null',
            'dsfsdf',
            '1234567890134'
        ]
    },
    {
        directive: 'is-numeric',
        options: null,
        valid: [
            '2423543534534'
        ],
        invalid: [
            '12312.123',
            'dsfsdf',
            '123456782.90134',
            '213.123-'
        ]
    },
    {
        directive: 'is-surrogate-pair',
        options: null,
        valid: [
            '𠮷野𠮷',
            '𩸽',
            'ABC千𥧄1-2-3'
        ],
        invalid: [
            '吉野竈',
            '鮪',
            'ABC1-2-3'
        ]
    },
    {
        directive: 'is-uppercase',
        options: null,
        valid: [
            'AAAAAA'
        ],
        invalid: [
            '.1a23',
            'dsfsdf',
            '12345678a2.90134',
            '213a.123-'
        ]
    },
    {
        directive: 'is-url',
        options: null,
        valid: [
            'http://github.com/gkaimakas/angular.validators'
        ],
        invalid: [
            '.1a23',
            'dsfsdf',
            '12345678a2.90134',
            '213a.123-'
        ]
    },
    {
        directive: 'is-uuid',
        options: null,
        valid: [
            'de305d54-75b4-431b-adb2-eb6b9e546013'
        ],
        invalid: [
            '.1a23',
            'dsfsdf',
            '12345678a2.90134',
            '213a.123-'
        ]
    },
    {
        directive: 'is-variable-width',
        options: null,
        valid: [
            'ひらがなカタカナ漢字ABCDE',
            '３ー０123',
            'Ｆｶﾀｶﾅﾞﾬ',
            'Good＝Parts'

        ],
        invalid: [
            'abc',
            'abc123',
            '!"#$%&()<>/+=-_? ~^|.,@`{}[]',
            'ひらがな・カタカナ、．漢字',
            '１２３４５６',
            'ｶﾀｶﾅﾞﾬ'
        ]
    }
];

function setupTest(validator) {
    return function () {
        var element, $scope, form;
        beforeEach(module('angular.validators'));
        beforeEach(inject(function ($rootScope, $compile) {
            $scope = $rootScope.$new();
            if (validator.options != null) {
                element = angular.element(
                    '<form name="form">' +
                    '<input type="text" ng-model="value" name="value" ' + validator.directive + '="' + validator.options + '" />' +
                    '</form>'
                );
            } else {
                element = angular.element(
                    '<form name="form">' +
                    '<input type="text" ng-model="value" name="value" ' + validator.directive + ' />' +
                    '</form>'
                );
            }
            $compile(element)($scope);
            form = $scope.form;
        }));

        it('should return true on for ' + validator.directive, function () {
            for (var index = 0; index < validator.valid.length; index++) {
                var value = validator.valid[index];
                form.value.$setViewValue(validator.valid[index]);
                $scope.$digest();
                expect(form.value.$valid).toBe(true);
            }
        });

        it('should return false for ' + validator.directive, function () {
            for (var index = 0; index < validator.invalid.length; index++) {
                var value = validator.invalid[index];
                form.value.$setViewValue(value);
                $scope.$digest();
                expect(form.value.$valid).toBe(false);
            }
        });
    }
}

for (var i = 0; i < tests.length; i++) {
    var validator = tests[i];
    describe('Validator: ' + validator.directive, setupTest(validator));
}