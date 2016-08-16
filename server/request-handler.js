/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

urls = {
  '/log': true,
  '/send': true,
  '/classes/messages': true,
  'classes/room': true
};
  
var body = {
  results: []
};


var requestHandler = function(request, response) {
  console.log('method*****:', request.method);

  
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';
  
  // If GET
  if (request.method === 'GET' && request.url === '/classes/messages') {
    var statusCode = 200;
    response.writeHead(statusCode, headers);

    if (response.write === undefined) {
      response.end(JSON.stringify(body));
    } else {
      response.write(JSON.stringify(body));
      response.end();
    }

    // if POST
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    var statusCode = 201;
    response.writeHead(statusCode, headers);  
    request.on('data', function(chunk) {
      var converted = JSON.parse(chunk);
      converted.objectId = Math.random() * 9999;
      body.results.push(converted);

      response.end();
    });
    // if unknown request
  } else if (request.method === 'OPTIONS') {
    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  } else {
    var statusCode = 404;
    console.log('request************************:', request.method);
    response.writeHead(statusCode, headers);
    if (response.write === undefined) {
      response.end(JSON.stringify(body));
    } else {
      response.write(JSON.stringify(body));
      response.end();
    }
  }
   

};


var exports = module.exports = {requestHandler: requestHandler};