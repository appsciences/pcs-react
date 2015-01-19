//var Parse = require('parse').Parse;

var Specialty = require("./specialty");

var Specialties = Parse.Collection.extend({
    model: Specialty
}, {

});

module.exports = Specialties;