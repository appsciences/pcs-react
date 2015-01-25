//var Parse = require('parse').Parse;

var Appointment = Parse.Object.extend("Appointment", {
    // Instance methods

    initialize: function () {
        this.set('active', true);
    }


});

module.exports = Appointment;