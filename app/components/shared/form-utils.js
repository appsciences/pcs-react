var _ = require('lodash')._
, React = require('react/addons');


var formUtils = {};

formUtils.toLabelValArrayByName = function (parseObjCol) {
    return parseObjCol && parseObjCol.map(function (parseObj) {
            return {label: parseObj.get("name"), value: parseObj.id};
        });
};

formUtils.toIdArray = function (parseObjCol) {
    return parseObjCol && parseObjCol.map(function (parseObj) {
            return parseObj.id;
        });
};


formUtils.toLabelValArrayByFirstLastName = function (parseObjCol) {
    return parseObjCol && parseObjCol.map(function (parseObj) {
            return {label: parseObj.get("firstName") + ' ' + parseObj.get("lastName"), value: parseObj.id};
        });
};


formUtils.toNameValCollection = function(form){
    var o = {};
    console.log('yo pops ' + _);
    _.forEach(form, function(input){
            if(input.name && input.name.indexOf("Button") == -1) {
                o[input.name] = input.value;
            }
        });
    return o;
}

formUtils.removeItemAtIndex = function(arr, index)
{
    return React.addons.update(
        arr,
        {$splice: [[index, 1]]}
    );
}

module.exports = formUtils;/**
 * Created by levushka on 1/18/15.
 */
