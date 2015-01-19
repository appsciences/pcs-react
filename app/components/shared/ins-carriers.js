//var Parse = require('parse').Parse;

var InsCarriers = require("./ins-carrier");

var InsCarriers = Parse.Collection.extend({
    model: InsCarriers
}, {

});

module.exports = InsCarriers;