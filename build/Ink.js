var Ink = function(obj) {
  var ink = this;
  Object.keys(obj).forEach(function(key) {
    ink[key] = obj[key];
  })
  this.name = this.inkname;
  delete this.inkname;
};

Ink.prototype = {
  getName: function() {
    return this.name;
  },
  matches: function(options) {
    return (this.name.matches(options.name));
  }
};

module.exports = Ink;
