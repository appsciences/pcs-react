//var Parse = require('parse').Parse;

var Patient = Parse.Object.extend("Patient", {
    // Instance methods

    initialize: function () {
        this.set('active', true);
    },


    getFullName: function(delimiter){
        return this.get("firstName") + delimiter + this.get("lastName");
    },

    //TODO: pass in string mask
    getFullAddress: function(){
            return this.get('address') + ' ' + this.get('city') + ' Ph: ' + this.get('phone');
    }

});

module.exports = Patient;