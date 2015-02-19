// Load the required modules
var fs = require('fs'),
	path = require('path');

// Load configuration
var config = fs.readFileSync('config.json');
var config = JSON.parse(config);

// Export module function
module.exports = {
	read: function(file)
	{
		if(file == '/')
			return loadFile('/index.html');

		return loadFile(file);
	}
};

// Load the requested file
function loadFile(file)
{
	var loc = path.normalize(config.dirFiles + file);
	var result = {};
	
	if(loc.indexOf(config.dirFiles) === 0 && fileExist(loc))
	{	
		result = {
			status: 200,
			head: {'Content-Type': getMIME(file)},
			stream: fs.createReadStream(loc)
		};
	}

	else
	{
		result = {
			status: 404,
			head: {'Content-Type': 'text/plain'},
			content: 'The requested view does not exist'
		};
	}

	return result;
}

// Detect MIME file type
function getMIME(file)
{
	var regex = /(.css|.html|.js)/;
	var ext = regex.exec(file);
	
	var MIME = '';

	switch(ext[1])
	{
		case '.js':
			MIME = 'text/javascript';
			break;

		case '.css':
			MIME = 'text/css';
			break;

		case '.html':
			MIME = 'text/html';
			break;

		default:
			MIME = 'text/plain';
	}

	console.log(MIME, ext);

	return MIME;
}

// Check if file exist
function fileExist(filename)
{
	try
	{
		fs.statSync(filename);
		return true
	}
	catch(ex)
	{
		return false;
	}
}