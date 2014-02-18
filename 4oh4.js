// 4oh4RequestHandler

module.exports = {
  handler: function (response, path) {
    return _4oh4RequestHandler(response, path);
  }
};

var _4oh4RequestHandler = function (response, path) {
  console.log("4oh4 handling request for: " + path);
  response.writeHead(404, {"Content-Type": "text/html"});
  response.end("Uh oh 4oh4!\n");
};
