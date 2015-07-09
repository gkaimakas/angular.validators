/**
 * Created by gkaimakas on 7/8/15.
 */

describe('asyncValidatorProvider', function(){
    var asyncValidator;
    //beforeEach(module('angular.validators'));
    beforeEach(module('angular.validators', function(asyncValidatorProvider){
        asyncValidatorProvider
            .baseUrl("http://localhost")
            .wildcard('{value}')
            .endpoint('username', '/username/{value}')
            .endpoint('password', '/password/{value}')
    }));

    beforeEach(inject(function(_asyncValidator_){
        asyncValidator = _asyncValidator_;
    }));

    it('should log something', inject(function(){
        console.log(asyncValidator.getUrl('username', 'gkaimakas'));
    }));
});
