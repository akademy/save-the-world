(function(){

	var com = {
		
		setup : function() {
		  var socket = io.connect('http://localhost:8080');
		  socket.on('message', function(data){ console.log(data) })
		},
		
		test : function( message ) {
			console.log( message );
		}
	}

	try {
		window.com = com;
	} catch(e) {
		module.exports = com;
	}


})();
