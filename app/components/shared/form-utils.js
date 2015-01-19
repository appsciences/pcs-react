var _ = require('lodash')._;
var formUtils = {};

formUtils.toNameValCollection = function(form){
    var o = {};
    _.forEach(form, function(input){
            o[input.name] = input.value;
        });
    return o;
}

module.exports = formUtils;/**
 * Created by levushka on 1/18/15.
 */
