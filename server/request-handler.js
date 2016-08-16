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



var requestHandler = function(request, response) {
  console.log('********************************************RESPONSE OBJECT LOGGED IN FULL:');
  
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'application/json';
  // response.writeHead(200, { "Content-Type": "application/json" });
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.


  // If GET
  if (request.method === 'GET') {
    console.log(request.method, 'received');
    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.write(JSON.stringify({results: []}));

    // if POST
  } else if (request.method === 'POST') {
    console.log(request.method, 'received');
    var statusCode = 201;
    request.setEncoding('utf8');
    var data = "";
    request.on("data", function(chunk) {
      data += chunk;
    });
    request.on("end", function() {
      console.log("DATA: " + data);
    });
    response.writeHead(statusCode, headers);
    response.write(JSON.stringify({results: []}));

    // if unknown request
  } else {
    console.log(request.method, 'received (unexpected method!)');
    var statusCode = 404;
    response.writeHead(statusCode, headers);
  }
  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end();
};


var exports = module.exports = {handleRequest: requestHandler};