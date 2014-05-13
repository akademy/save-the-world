var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs');

var com = require('./communicate');

var sockFile = fs.readFileSync('socket.html');
var commFile = fs.readFileSync('communicate.js');

server = http.createServer();

server.on('request', function(req, res){
	console.log("=============================================================\n");
	console.log(req.url);
	
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
	console.log('Client connected');
	//console.log(client);
	client.send('Welcome client ' + client.id);
});

com.test( "In Server" );
