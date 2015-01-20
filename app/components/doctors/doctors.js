//var Parse = require('parse').Parse;

var Doctor = require("./doctor");

var query = new Parse.Query(Doctor);

query.include('locations');
query.include('specialties');
query.include('salesPeople');

var Doctors = Parse.Collection.extend({
    model: Doctor,
    query: query
}, {

});

module.exports = Doctors;