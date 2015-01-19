//var Parse = require('parse').Parse;

var Doctor = require("./doctor");

var query = new Parse.Query(Doctor);

query.include('specialties');
query.include('insCarriers');
query.include('salesPeople');
query.include('locations');

var Doctors = Parse.Collection.extend({
    model: Doctor,
    query: query
}, {

});

module.exports = Doctors;