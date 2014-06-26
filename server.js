var http = require('http'), 
    io = require('socket.io'),
    fs = require('fs');	

var Communicate = require('./communicate'),
	router = require('./router');

server = http.createServer();

server.on('request', function(request, response){
	
	if( request.url == "/communicate.js" ) {
		
		response.writeHead( 200, {'content-type': 'text/javascript'} );
		fs.readFile( 'communicate.js', function( error, file ) {
			response.end(file);
		});
	}
	else if( request.url == "/cats.html") {
			
		response.writeHead(200, {'content-type': 'text/html'} );
		fs.readFile( 'socket.html', function( error, file ) {
			response.end(file);
		});
	}
	else {
		  
		routerResponse = router.router( request, response );

		response.writeHead( 200, {"Content-Type": "text/html"} );
		response.write( '<html><head><meta charset="UTF-8"></head><body>')
		response.write( routerResponse );
		response.end( "</body></html>"  );
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
