//var Parse = require('parse').Parse;

var Appointment = require("./appointment");

var query = new Parse.Query(Appointment);

query.include('location');
query.include('doctor');
query.include('patient');

var Appointments = Parse.Collection.extend({
    model: Appointment,
    query: query
}, {

});

module.exports = Appointments;