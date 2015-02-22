var Ink = require("./Ink");

var Inkline = function(company, name) {
  this.company = company;
  this.name = name;
  this.inks = {};
};

Inkline.prototype = {
  process: function(inkobj) {
    var inkname = inkobj.inkname;
    if(!this.inks[inkname]) {
      this.inks[inkname] = new Ink(inkobj);
    }
    return this.inks[inkname];
  },
  getCompany: function() {
    return tihs.company;
  },
  getName: function() {
    return this.name;
  },
  getInks: function() {
    var inks = this.inks;
    return Object.keys(inks).map(function(key) {
      return inks[key];
    });
  }
};

module.exports = Inkline;
