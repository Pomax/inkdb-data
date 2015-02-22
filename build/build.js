(function(global) {
  Inkdata = require("./loader");

  // CommonJS style loading
  if(global.module) {
    module.exports = Inkdata;
  }

  // AMD style loading
  else if(global.define && global.require) {
    define(function() { return Inkdata; });
  }

  // Loading for vanilla JS contexts
  else { global.Inkdata = Inkdata }
}(this));
