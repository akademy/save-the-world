(function(){
	
	function communicate( _control, _response ) {
		
		_control.on( "miaow" , function( message ){ _response( unscramble( message ) ) } );
		
		this.sendMessage = function( message ) {
			_control.emit( "miaow", scramble( message ) );
		};
		
		function scramble( data ) {
			var scrambled = "";
			for( var i=0;i<data.length;i++) {
				scrambled += String.fromCharCode( data.charCodeAt(i) + 1 );
			}
			return scrambled;
		}
		
		function unscramble( data ) {
			var unscrambled = "";
			for( var i=0;i<data.length;i++) {
				unscrambled += String.fromCharCode( data.charCodeAt(i) - 1 );
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
