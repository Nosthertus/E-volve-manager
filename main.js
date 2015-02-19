/*
*	Main node.js server file
*/

// Load all modules
console.log('Loading modules');
var http = require('http'),
	fs = require('fs'),
	file = require('./bin/file.js'),
	io = require('socket.io');

// Load config file
console.log('Loading configuration file');
var config = fs.readFileSync('./config.json');
var config = JSON.parse(config);

// Config http server
var host = http.createServer(function(request, response)
{
	var view = file.read(request.url);

	response.writeHead(view.status, view.head);
	
	if(view.stream)
		view.stream.pipe(response);

	else
		response.end(view.content);
});



// Start server
host.listen(config.port)

// Configure socket
var io = io.listen(host);

var socket = io.sockets.on('connection', function(socket)
{
	console.log('socket connection');
});

if(socket)
	console.log('Http server initialized on port:', config.port);