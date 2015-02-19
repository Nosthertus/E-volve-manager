/*
*	Main node.js server file
*/

// Load all modules
console.log('Loading modules');
var http = require('http'),
	fs = require('fs'),
	file = require('./bin/file.js');

// Load config file
console.log('Loading configuration file');
var config = fs.readFileSync('./config.json');
var config = JSON.parse(config);

// Config http server
var host = http.createServer(function(request, response)
{
	console.log('requesting: ', request.url);

	var view = file.read(request.url);

	response.writeHead(view.status, view.head);
	response.write(view.content);
	response.end();
});

// Start server
if(host.listen(config.port))
	console.log('Http server initialized on port:', config.port);