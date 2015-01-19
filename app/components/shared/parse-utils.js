//var parseUtils = {
//
//    createParseObj: function(parseClass){
//        if (typeof(parseClass) === Object) {
//            return new parseClass();
//        } else {
//            return (new (Parse.Object.extend(parseClass))());
//        }
//
//    },
//
//    getObjsByName: function(parseArr, names){
//
//        return parseCol.filter(function(obj){
//            return names.indexOf(obj.get("name")) > -1
//        });
//    },
//
//    colToJSON: function(parseArr){
//
//        return (new Parse.Collection(parseArr)).toJSON();
//    },
//
//    createObjFromJSArray: function(parseClass, propsArray, parsePropCollections) {
//        //propsArray can be form which is collection but not an array, thus the use of lodash
//        var parseObj;
//
//        if (typeof(parseClass) === Object) {
//            parseObj = new parseClass();
//        } else {
//            parseObj = this.createParseObj(parseClass);
//        }
//
//        _.forEach(propsArray, function(field){
//            var collectionProp;
//            if(collectionProp = _.find(parsePropCollections, {prop: field})){
//
//                delimitedPropString.split(collectionProp.delimiter || ',').forEach(function(nameValue){
//
//                    parseObj.add (collectionProp.prop, new Parse.Object(collectionProp.parseClass, {name: field.value});
//
//                });
//
//            }else {
//                parseObj.set(field.name, field.value)
//            };
//        });
//    },
//
//    toDelimitedNameString:  function(parseObjCol, delimiter){
//    return parseObjCol.map(function(parseObj){
//        return parseObj.get("name");
//    }).join(delimiter);
//}
//
//module.exports = parseUtils;