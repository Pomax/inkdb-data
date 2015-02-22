var Ink = require("./Ink");

var Inkline = function(name) {
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
  getName: function() { return this.name; }
};

module.exports = Inkline;
