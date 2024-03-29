// fontAwesomeRequestHandler
// ========

var fs = require('fs');

var _4oh4 = require('./4oh4');

module.exports = {
  handler: function (response, path) {
    return fontAwesomeRequestHandler(response, path);
  }
};

var fontAwesomeRequestHandler = function (response, path) {
  console.log("FontAwesome handling request for: " + path);
  if (path == "/fonts/font-awesome.min.css") {
    response.writeHead(200, {"Content-Type": "text/plain"});
    fs.readFile('./fonts/font-awesome.min.css', function (err, data) {
      if (err) throw err;
      response.end(data, 'utf8');
    });
    return;
  };
  if (path == "/fonts/FontAwesome.otf") {
    response.writeHead(200, {"Content-Type": "font/otf"});
    fs.readFile('./fonts/FontAwesome.otf', function (err, data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.eot") {
    response.writeHead(200, {"Content-Type": "application/vnd.ms-fontobject"});
    fs.readFile('./fonts/fontawesome-webfont.eot', function (err, data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.svg") {
    response.writeHead(200, {"Content-Type": "image/svg+xml"});
    fs.readFile('./fonts/fontawesome-webfont.svg', function (err, data) {
      if (err) throw err;
      response.end(data, 'utf8');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.ttf") {
    response.writeHead(200, {"Content-Type": "application/x-font-ttf"});
    fs.readFile('./fonts/fontawesome-webfont.ttf', function (err, data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  if (path == "/fonts/fontawesome-webfont.woff") {
    response.writeHead(200, {"Content-Type": "application/font-woff"});
    fs.readFile('./fonts/fontawesome-webfont.woff', function (err, data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  _4oh4.handler(response, path);
};
