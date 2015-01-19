//var Parse = require('parse').Parse;

var SalesPerson = Parse.Object.extend("InsCarriers", {
    // Instance methods

    initialize: function () {
        this.set('active', true);
    },

    getFullName: function(delimiter){
        return this.get("firstName") + delimiter + this.get("lastName");
    }

});

module.exports = SalesPerson;