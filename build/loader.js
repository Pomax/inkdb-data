module.exports = {
  loadAPI: function(cb) {
    "use strict";

    var API = require("./API");
    var api = new API();
    try {

      var data = require("../data/inkdata.js");
      api.process(data);
      cb(false, api);

    } catch(e) {

      var fs = require("fs");
      var inkObjects = [];
      var walk;

      var processData = function(file) {
        var data = fs.readFileSync(file);
        var obj = JSON.parse(data);
        inkObjects.push(obj);
      };

      var inspect = function (pending, dir, onComplete) {
        return function (file) {
          file = dir + '/' + file;
          fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              return walk(file, function(err, res) {
                if (!--pending) {
                  onComplete(false, inkObjects);
                }
              });
            }
            processData(file);
            if (!--pending) {
              onComplete(false, inkObjects);
            }
          });
        };
      };

      walk = function(dir, done) {
        fs.readdir(dir, function(err, list) {
          if (err) { return done(err); }
          var pending = list.length;
          if (!pending) { return done(false, inkObjects); }
          var walker = inspect(pending, dir, done);
          list.forEach(walker);
        });
      };

      walk("./data", function(err, inkObjects) {
        fs.writeFileSync(
          "./data/inkdata.js",
          "module.exports = " + JSON.stringify(inkObjects) + ";\n"
        );
        api.process(inkObjects);
        cb(err, api);
      });

    }
  }
};
