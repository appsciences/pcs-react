//var Parse = require('parse').Parse;

var Specialty = require("./specialty");


var query = new Parse.Query(Specialty);

query.addAscending('name');

var Specialties = Parse.Collection.extend({
    model: Specialty,
    query: query

}, {

});

module.exports = Specialties;