/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(1);

var app = function() {
  new UI();
}

window.addEventListener('load', app);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Countries = __webpack_require__(2);
var RequestHelper = __webpack_require__(4)

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__ (3);
var RequestHelper = __webpack_require__(4)

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var Country = function(options) {
  this.name = options.name;
  this.capital = options.capital;
  }

module.exports = Country;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var RequestHelper = function () {

};

RequestHelper.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener('load', function(){
      if(request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    request.send();
  },
  makePostRequest: function(url, callback, payload){
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function(){
      if(request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    request.send(payload);
  }
};

module.exports = RequestHelper;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map