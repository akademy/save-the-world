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
		res.writeHead(200, {'content-type': 'text/html'} );
		fs.readFile( 'socket.html', function( error, file ) {
			res.end(file);
		});
	}
});

server.listen(8080);


var socket = io.listen(server);

socket.on('connection', function(client) {
	var localTime = null;
	var com = new communicate( client, function( message, data ) {
		
		com.log( message, data );
		
		if( message == "on-spaceship" ) {
            localTime = (+new Date());
			com.sendMessage( 'get-ship-time' );
		}
		else if( message == "ship-time" ) {
            var timeDifference = data - localTime;
			
			console.log( "Time from Spaceship to Earth", timeDifference );
		}
		
	});
});
