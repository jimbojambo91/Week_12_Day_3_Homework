var Countries = require("../models/countries");
var RequestHelper = require('../helpers/request.js')

var UI = function(){
  var countries = new Countries();
  countries.all(function(countries){
    this.render(countries);
    this.requestHelper = new RequestHelper();
    this.renderDropDown()
  }.bind(this));
  var button = document.getElementById("country-button");
  button.addEventListener("click", this.handleButtonClick.bind(this));
  // this.createForm();
}

UI.prototype = {
  createText: function(text, label){
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  },

  appendText: function(element, text, label){
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  render: function(countries){
    var container = document.getElementById("countries");
    container.innerHTML = "";
    for (var country of countries) {
      var li = document.createElement('li');
      this.appendText(li, country.name, 'Name: ');
      this.appendText(li, country.capital, 'Capital: ');

      container.appendChild(li);
    }
  },
  renderDropDown: function(){
    var url = "https://restcountries.eu/rest/v2/all"
    this.requestHelper.makeRequest(url, function(results){
      this.populateDropdown(results)
    }.bind(this));
  },
  populateDropdown: function(results){
    var dropdown = document.getElementById("dropDownSelect");
    results.forEach(function(result){
      var option = document.createElement('option');
      option.innerText = result.name;
      dropdown.appendChild(option);
    })
  },
  handleButtonClick: function(){
    var selectedCountry = document.getElementById("dropDownSelect");
    url = "https://restcountries.eu/rest/v2/name/" + selectedCountry.value;
    this.requestHelper.makeRequest(url, function(result){
      console.log(this)
      this.requestHelper.makePostRequest("http://localhost:3000/api/countries", this.render.bind(this), JSON.stringify(result[0]))
      console.log(result);
    }.bind(this))
  }
}

module.exports = UI;