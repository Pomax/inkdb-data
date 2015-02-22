var API = require("./loader").loadAPI(function(err, api) {
  if(err) { console.error(err); }
  var inks = api.getInks();
  var companies = api.getCompanies();
  console.log([
    inks.length,
    "inks loaded for",
    companies.length,
    "companies"
  ].join(" "));
});
