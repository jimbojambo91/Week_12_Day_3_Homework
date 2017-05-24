var Country = require ('./country');
var RequestHelper = require('../helpers/request.js')

var Countries = function() {
  this.requestHelper = new RequestHelper();
}

Countries.prototype = {
  all: function(callback){
    this.requestHelper.makeRequest("http://localhost:3000/api/countries", function(results){
      var countries = this.populateCountries(results);
      callback(countries);
    }.bind(this));
  },
  populateCountries: function(results){
    var countries = results.map(function(resultObject){
      return new Country(resultObject);
    })
    return countries;
  },
  add: function(newCountry, callback){
    var countryData = JSON.stringify(newCountry);
    this.requestHelper.makePostRequest("http://localhost:3000/api/countries", callback, countryData);
  }
};

module.exports = Countries;