var port_dev = 1337;
var request_url;
var health_check_count = 0;
var hostname;

// load the modules we're using
var fs = require('fs');
var http = require('http');
var os = require('os');
var url = require('url');

// load the required dependencies
var _4oh4 = require('./4oh4');
var css = require('./css');
var fontawesome = require('./fontAwesome');
var page = require('./page');

// configure our http server
var server = http.createServer(function (request, response) {
  // If the request came from the load balancer require https
  request_url = url.parse((request.headers["x-forwarded-proto"] ? request.headers["x-forwarded-proto"] : 'http') + "://" + (request.headers.host ? request.headers.host : request.connection.localAddress) + request.url);
  if (!(request.headers["x-forwarded-proto"] !== "http" || request.headers["user-agent"] === "HTTP-Monitor/1.1")) {
    var redirect_url = "https://" + 
      (request_url.host ? request_url.host : "") + 
      (request_url.path ? request_url.path : "") + 
      (request_url.hash ? request_url.hash : "");
    console.log("Redirecting to: " + redirect_url);
    response.writeHead(302, {"Location": redirect_url});
    response.end();
  }
  // Done with validation. Process request.
  console.log("Processing request (" + (request.headers["x-forwareded-for"] ? request.headers["x-forwareded-for"] : request.connection.remoteAddress) + ") for: " + request_url.href);
  // Home route
  if (request_url.path == "/") {
    console.log("Dispatching page handler for: " + request_url.path);
    return page.handler(response, request_url.path);
  };
  // Health Check Route
  if (request_url.path == "/health_check") {
    health_check_count += 1;
    writeVanillaHeader(response);
    response.end("SUCCESS\n");
    return;
  };
  // Favicon Route
  if (request_url.path == "/favicon.ico") {
    writeVanillaHeader(response, "image/x-icon");
    fs.readFile('./favicon.ico', function (err,data) {
      if (err) throw err;
      response.end(data, 'binary');
    });
    return;
  };
  // CSS Route
  var css_pattern = "^\/css\/.*";
  var matches = request_url.path.match(css_pattern);
  if ( matches && matches[0] ) {
    console.log("Dispatching css handler for: " + matches[0]);
    return css.handler(response, request_url.path);
  };
  // Fonts Route
  var fonts_pattern = "^\/fonts\/.*";
  var matches = request_url.path.match(fonts_pattern);
  if ( matches && matches[0] ) {
    console.log("Dispatching font handler for: " + matches[0]);
    return fontawesome.handler(response, request_url.path);
  };
  // About Route
  if (request_url.path == "/about") {
    writeVanillaHeader(response);
    response.end("About (placeholder)\n"); 
    return;
  };
  // 4oh4 Route
  _4oh4.handler(response, request_url.path);
});

function writeVanillaHeader(response, content_type) {
  content_type = content_type || "text/plain";
  response.writeHead(200, {"Content-Type": content_type});
};

// listen on port_dev for development
server.listen(port_dev);

// put a friendly message on the console
console.log("Server running at http://" + os.hostname() + ":"+port_dev+"/");
