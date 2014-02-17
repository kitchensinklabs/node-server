// fontAwesomeRequestHandler
// ========

var fs = require('fs');

module.exports = {
  handler: function(response, path) {
    return fontAwesomeRequestHandler(response, path);
  }
};

var fontAwesomeRequestHandler = function(response, path) {
  console.log(path);
  if (path == "/fonts/FontAwesome.otf") {
    response.writeHead(200, {"Content-Type": "font/otf"});
    fs.readFile('./fonts/FontAwesome.otf', function (err,data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.eot") {
    response.writeHead(200, {"Content-Type": "application/vnd.ms-fontobject"});
    fs.readFile('./fonts/fontawesome-webfont.eot', function (err,data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.svg") {
    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    fs.readFile('./fonts/fontawesome-webfont.svg', function (err,data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.ttf") {
    response.writeHead(200, {"Content-Type": "application/x-font-ttf"});
    fs.readFile('./fonts/fontawesome-webfont.ttf', function (err,data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.woff") {
    response.writeHead(200, {"Content-Type": "application/font-woff"});
    fs.readFile('./fonts/fontawesome-webfont.woff', function (err,data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
};
