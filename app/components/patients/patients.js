//var Parse = require('parse').Parse;

var Patient = require("./patient");

var query = new Parse.Query(Patient);

query.include('insCarriers');
query.addAscending('lastName');

var Patients = Parse.Collection.extend({
    model: Patient,
    query: query
}, {

});

module.exports = Patients;