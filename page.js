// pageRequestHandler
//

var fs = require('fs');

var _4oh4 = require('./4oh4');

module.exports = {
  handler: function (response, path) {
    return pageRequestHandler(response, path);
  }
};

var pageRequestHandler = function (response, path) {
  console.log("Page handling request for: " + path);
  if (path == "/") {
    response.writeHead(200, {"Content-Type": "text/html"});
    var options = {encoding: 'utf8'};
    fs.readFile('./pages/index.html', options, function (err, data) {
      if (err) throw err;
      fs.readFile('./pages/mixpanel.js', options, function (err, mixpanel_code) {
        if (err) throw err;
        response.end(data.replace("/* inject: mixpanel.js */", mixpanel_code), 'utf8');
      });
    });
    return;
  };
  _4oh4.handler(response, path);
};
