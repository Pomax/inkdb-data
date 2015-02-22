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
    getInks: function() {
      return this.inks;
    },
    get: function(name, inkline, inkname) {
      if(!inkline && !inkname) {
        return this.companies[name] || false;
      }
      if (!name) {
        var inks = this.inks.filter(function(ink) {
          return ink.matches({
            inkline: inkline,
            name: inkname
          });
        });
      }
      return false;
    }
  };

  module.exports = API;

}());
