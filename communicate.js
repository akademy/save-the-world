(function(){
	
	function communicate( control ) {
	
		var _control = control;
		var _message_code = "miaow";
		
		_control.on( _message_code , function( data ){ console.log( unscramble( data ) ) });
		
		this.sendMessage = function( message ) {
			_control.emit( _message_code, scramble( message ) );
		};
		
		function scramble( data ) {
			var scrambled = "";
			for( var i=0;i<data.length;i++) {
				scrambled += String.fromCharCode( data.charCodeAt(i) + 1 );
			}
			return scrambled;
		};
		
		function unscramble( data ) {
			var unscrambled = "";
			for( var i=0;i<data.length;i++) {
				unscrambled += String.fromCharCode( data.charCodeAt(i) - 1 );
			}
			return unscrambled;
		};
	}

	try {
		window.communicate = communicate;
	} catch(e) {
		module.exports = communicate;
	}


})();
