(function(){
	
	function communicate( control ) {
	
		var _control = control;
		var _message_code = "miaow";
		
		_control.on( _message_code , function( data ){ console.log( unscramble( data ) ) });
		
		this.sendMessage = function( message ) {
			_control.emit( _message_code, scramble( message ) );
		};
		
		function scramble( data ) {
			return data;
		};
		
		function unscramble( data ) {
			return data;
		};
	}

	try {
		window.communicate = communicate;
	} catch(e) {
		module.exports = communicate;
	}


})();
