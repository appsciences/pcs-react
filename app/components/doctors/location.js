//var Parse = require('parse').Parse;
var Location = Parse.Object.extend("Location", {
    // Instance methods
    getFullAddress: function(){
        return this.get('address') + ' ' + this.get('city') + ' Ph: ' + this.get('phone');
    }

});

module.exports = Location;