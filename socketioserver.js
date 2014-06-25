var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs');	

var Communicate = require('./communicate');

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

var socketio = io.listen(server);

socketio.on( 'connection', function( socket ) {
    
	var localTime = null;
	var com = new Communicate();
    
    socket.on( "miaow", function( response ) {
        var message = com.unscramble( response["message"] );
        console.log(message);

        if( message == "ON-SPACESHIP" ) {
            localTime = (+new Date());
            socket.emit( "miaow", { message: com.scramble( 'GET-SHIP-TIME') } );
        }
        else if( message == "SHIP-TIME" ) {
            var shipTime = com.unscramble( response['data'] );
            var timeDifference = shipTime - localTime;

            console.log( "Time from Spaceship to Earth", timeDifference );
        }
    });
});
