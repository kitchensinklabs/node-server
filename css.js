// cssRequestHandler
//

var fs = require('fs');

var _4oh4 = require('./4oh4');

module.exports = {
  handler: function (response, path) {
    return cssRequestHandler(response, path);
  }
};

var cssRequestHandler = function (response, path) {
  console.log("CSS handling request for: " + path);
  if (path == "/css/index.css") {
    response.writeHead(200, {"Content-Type": "text/css"});
    response.end(getPageWithNavCSS());
    return;
  };
  _4oh4.handler(response, path);
};

function getPageWithNavCSS() {
  return ".page-start {\n padding-top: 55px;\n }\n";
};
