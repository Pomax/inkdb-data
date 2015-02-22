(function() {
  "use strict";

  var Portfolio = require("./Portfolio");

  var API = function() {
    this.companies = {};
    this.inks = [];
  };

  API.prototype = {
    process: function(inkobjects) {

      var processInk = function(inkobj) {
        if(!this.companies[inkobj.company]) {
          this.companies[inkobj.company] = new Portfolio(inkobj.company);
        }
        var company = this.companies[inkobj.company];
        var ink = company.process(inkobj);
        this.inks.push(ink);
      }.bind(this);

      inkobjects.forEach(processInk);
    },
    getCompanies: function() {
      var companies = this.companies;
      return Object.keys(companies).map(function(key) {
        return companies[key];
      });
    },
    getCompany: function(name) {
      return this.companies[name] || false;
    },
    getInks: function() {
      return this.inks;
    },
    getInk: function(name) {
      return this.inks.filter(function(ink) {
        return ink.matches({name: name});
      });
    },
    find: function(options) {

    }
  };

  module.exports = API;

}());
