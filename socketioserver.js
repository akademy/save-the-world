var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs');

var communicate = require('./communicate');

server = http.createServer();

server.on('request', function(req, res){
	
	if( req.url == "/communicate.js" ) {
		res.writeHead( 200, {'content-type': 'text/javascript'} );
		fs.readFile( 'communicate.js', function( error, file ) {
			res.end(file);
		});
	}
	else {
		res.writeHead(200, {'content-type': 'text/html'});
		fs.readFile( 'socket.html', function( error, file ) {
			res.end(file);
		});
	}
});

server.listen(8080);


var socket = io.listen(server);

socket.on('connection', function(client){
	var com = new communicate( client, function( message ){
		console.log( message );
		if( message == "on-spaceship" ) {
			com.sendMessage( 'begin-shield-calibration' );
		}
		else if( message == "shield-calibration-started" ) {
			com.sendMessage( 'return-shield-frequency' );
		}
		
	});
});
