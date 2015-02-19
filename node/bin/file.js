// Load the required modules
var fs = require('fs');

// Load configuration
var config = fs.readFileSync('config.json');
var config = JSON.parse(config);

// Export module function
module.exports = {
	read: function(file)
	{
		if(file == '/')
			return loadFile('index.html');
	}
};

// Load the requested file
function loadFile(file)
{
	var req = fs.readFileSync(file);

	var result = {};
	
	if(!req)
	{
		result = {
			status: 404,
			head: {'Content-Type': 'text/plain'},
			content: 'The requested view does not exist'
		};
	}

	else
	{
		result = {
			status: 200,
			head: {'Content-Type': getMIME(file)},
			content: req
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
			MIME: 'text/html';
			break;
	}

	return MIME;
}