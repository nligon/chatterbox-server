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

var requestHandler = function(request, response) {

  var body = {
    headers: request.headers,
    method: request.method,
    url: request.url,
    results: []
  };
  
  var headers = defaultCorsHeaders;
  var end = function () {
    response.end();
  };

  headers['Content-Type'] = 'application/json';
  
  // If GET
  if (request.method === 'GET' && request.url === '/classes/messages') {
    var statusCode = 200;
    response.writeHead(statusCode, headers);
    // console.log('0Body*******************************************', body);
    response.write(JSON.stringify(body));
          // console.log('1body.results*********************************', body.results);

    // if POST
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    var statusCode = 201;
    response.writeHead(statusCode, headers);  
    request.on('data', function(chunk) {

      body.results.push(JSON.parse(chunk));
      // console.log('CHUNK **************************', chunk);
      console.log('3body.results*********************************', body.results);
      return end();
    });
    // if unknown request
  } else {
    var statusCode = 404;
    response.writeHead(statusCode, headers);
    response.write(JSON.stringify(body));
  }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
        // console.log('4body.results*********************************', body.results);
        console.log('*****************end of function reached ***')
  response.end();
        // console.log('5body.results*********************************', body.results);
};


var exports = module.exports = {handleRequest: requestHandler};