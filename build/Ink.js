
var Ink = function(obj) {
  var ink = this;
  Object.keys(obj).forEach(function(key) {
    ink[key] = obj[key];
  })
  this.name = this.inkname;
  delete this.inkname;
};

Ink.prototype = {
  getCompany: function() {
    return this.company;
  },
  getInkline: function() {
    return this.inkline;
  },
  getName: function() {
    return this.name;
  },
  getColors: function() {
    return this.colorInformation.colors;
  },
  getColorComposition: function() {
    return this.colorInformation.composition;
  },
  getProperties: function() {
    return this.properties;
  },
  getReviews: function() {
    return this.reviews;
  },
  getNotes: function() {
    return this.notes;
  },
  getRetailers: function() {
    return this.retailers;
  },

  matches: function(options) {
    var nmatch = !options.name ? true : this.name.matches(options.name);
    var ilmatch = !options.inkline ? true : this.inkline.matches(options.inkline);
    return nmatch && ilmatch;
  }
};

module.exports = Ink;
