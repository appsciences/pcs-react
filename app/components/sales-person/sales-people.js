//var Parse = require('parse').Parse;

var SalesPerson = require("./sales-person");

var SalesPeople = Parse.Collection.extend({
    model: SalesPerson
}, {

});

module.exports = SalesPeople;