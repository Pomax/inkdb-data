var Inkline = require("./Inkline");

var Portfolio = function(name) {
  this.name = name;
  this.inklines = {};
  this.inks = [];
};

Portfolio.prototype = {
  process: function(inkobj) {
    var inkline = inkobj.inkline || "default";
    if(!this.inklines[inkline]) {
      this.inklines[inkline] = new Inkline(this.name, inkline);
    }
    inkline = this.inklines[inkline];
    var ink = inkline.process(inkobj);
    this.inks.push(ink);
    return ink;
  },
  getName: function() {
    return this.name;
  },
  getInklines: function() {
    var inklines = this.inklines;
    return Object.keys(inklines).map(function(key) {
      return inklines[key];
    });
  },
  getInkline: function(name) {
    return this.inklines[name] || false;
  },
  getInks: function() {
    return this.inks;
  }
};

module.exports = Portfolio;
