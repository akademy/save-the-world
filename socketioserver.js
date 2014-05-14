var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs');

var communicate = require('./communicate');

var sockFile = fs.readFileSync('socket.html');
var commFile = fs.readFileSync('communicate.js');

server = http.createServer();

server.on('request', function(req, res){
	
	if( req.url == "/communicate.js" ) {
		res.writeHead(200, {'content-type': 'text/javascript'});
		res.end(commFile);
	}
	else {
		res.writeHead(200, {'content-type': 'text/html'});
		res.end(sockFile);
	}
});

server.listen(8080);


var socket = io.listen(server);

socket.on('connection', function(client){
	var com = new communicate( client );
	com.sendMessage( 'Welcome client ' + client.id );
});
