//var Parse = require('parse').Parse;

var specialistStr = "specalist", referringStr = "referring";

var Doctor = Parse.Object.extend("Doctor", {
    // Instance methods

    initialize: function () {
        this.set('active', true);
    },

    setSpecialist: function () {
        this.set("type", specialistStr);
    },

    setReferring: function () {
        this.set("type", referringStr);
    },

    getFullName: function(delimiter){
        return this.get("firstName") + delimiter + this.get("lastName");
    },

    //TODO: pass in string mask
    getLocationsList: function(){
        if(!this.get("locations"))
            return [];
        return this.get("locations").map(function(loc){
            return loc.get('address') + ' ' + loc.get('city') + ' Ph: ' + loc.get('phone');
        });
    }


});

Object.defineProperty(Doctor.prototype, "isReferring", {
    get: function () {
        return this.get("type") === referringStr;
    }
});

Object.defineProperty(Doctor.prototype, "isSpecialist", {
    get: function () {
        return this.get("type") === specialistStr;
    }
});

module.exports = Doctor;