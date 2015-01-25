//var Parse = require('parse').Parse;

var InsCarriers = require("./ins-carrier");

var query = new Parse.Query(InsCarriers);

query.addAscending('name');

var InsCarriers = Parse.Collection.extend({
    query: query,
    model: InsCarriers
}, {

});

module.exports = InsCarriers;