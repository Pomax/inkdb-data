var fs = require("fs-extra");
var data = require("../data.json");

var ids = Object.keys(data);
ids.forEach(function(id) {
  var obj = data[id];

  var company = obj.company;
  var inkline = obj.inkline;
  var inkname = obj.inkname;

  var path = [company];
  if(!!inkline) { path.push(inkline); }
  path.push(inkname)
  path = "../data/" + path.join("/");
  fs.ensureDirSync(path);

  var inkdata = {
    // Identifying information:
    company: company,
    inkline: inkline,
    inkname: inkname,
    // The thing we care most about, generally
    colorInformation: {
      colors: [
        // An ink may exhibit multiple colors.
        { r: obj.r, g: obj.g, b: obj.b }
      ],
      // Chromatography can reveal component colors
      composition: false
    },
    // We start off knowing nothing
    properties: {
      drytime: false,
      flow: false,
      shading: false,
      nibtype: false,
      cost: false,
      fluorescence: false,
      solution: false,
      deposit: false,
      rating: false
    },
    // URLs to reviews
    reviews: [],
    notes: [],
    // URLs to (specialist) retailers that sell this ink.
    retailers: []
  };

  fs.writeFileSync(path + "/information.json", JSON.stringify(inkdata,false,2));
  try { fs.unlinkSync("./data/inkdata.js"); } catch (e) {}

});
