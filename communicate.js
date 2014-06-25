(function(){
	
	function communicate( _control, _response ) {
		
		// When we recieve a message
		_control.on( "miaow" , function( response ) {
			_response( unscramble( response.message ), unscramble( response.data ) );
		} );
		
		// send our message
		this.sendMessage = function( message, data ) {
			_control.emit( "miaow", { message : scramble( message ), data : scramble( data || "" ) } );
		};

		this.log = function(message, data) {
			if( data ) {
				console.log('Message:',message,"Data:",data);
			} else {
				console.log('Message:',message);
			}
		};
		
		// Scramble a string (hide it)
		function scramble( text ) {
			for( var i=0,scrambled="";i<text.length;i++) {
				scrambled += String.fromCharCode( text.charCodeAt(i) + 1 );
			}
			return scrambled;
		}
		
		// Unscramble a string
		function unscramble( text ) {
			for( var i=0, unscrambled="";i<text.length;i++) {
				unscrambled += String.fromCharCode( text.charCodeAt(i) - 1 );
			}
			return unscrambled;
		}
	}

	try {
		window.communicate = communicate;
	} catch(e) {
		module.exports = communicate;
	}

})();