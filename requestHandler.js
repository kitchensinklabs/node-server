var port_dev = 1337;
var request_url;
var health_check_count = 0;
var hostname;

// load the modules we're using
var fs = require('fs');
var http = require('http');
var os = require('os');
var url = require('url');

// configure our http server to dump request header to console
var server = http.createServer(function (request, response) {
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
  console.log("Processing request (" + (request.headers["x-forwareded-for"] ? request.headers["x-forwareded-for"] : request.connection.remoteAddress) + ") for: " + request_url.href);
  // Health Check Route
  if (request_url.path == "/health_check") {
    health_check_count += 1;
    writeVanillaHeader(response);
    response.end("SUCCESS\n");
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
  // About Route
  if (request_url.path == "/about") {
    writeVanillaHeader(response);
    response.end("About (placeholder)\n"); 
  };
  writeVanillaHeader(response);
  response.end("Hello World\n");
});

function writeVanillaHeader(response, content_type) {
  content_type = content_type || "text/plain";
  response.writeHead(200, {"Content-Type": content_type});
}

// listen on port_dev for development
server.listen(port_dev);

// put a friendly message on the console
console.log("Server running at http://" + os.hostname() + ":"+port_dev+"/");
