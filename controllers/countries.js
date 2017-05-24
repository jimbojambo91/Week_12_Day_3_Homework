var express = require('express');
var app = express();
var countryRouter = express.Router();

var Country = require('../client/src/models/country');

var CountryQuery = require('../db/countryQuery.js');
var query = new CountryQuery();

//country index
countryRouter.get('/', function(req, res){
  query.all(function(countries){
    res.json(countries);
  });
});

//add new country
countryRouter.post('/', function(req, res){
  var country = new Country({
    name: req.body.name,
    capital: req.body.capital
  })
  query.add(country, function(countries){
    res.json(countries)
  })
})

module.exports = countryRouter;