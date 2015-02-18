var Location = require("./location");

var query = new Parse.Query(Location);

var Locations = Parse.Collection.extend({
    model: Location,
    query: query

}, {

});

module.exports = Locations;