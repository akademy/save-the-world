(function(){
	
	function Communicate( ) {
        
        // Scramble a string (hide it)
		this.scramble = function( text ) {
			for( var i=0,scrambled="";i<text.length;i++) {
				scrambled += String.fromCharCode( text.charCodeAt(i) + 1 );
			}
			return scrambled;
		}
		
		// Unscramble a string
		this.unscramble = function( text ) {
			for( var i=0, unscrambled="";i<text.length;i++) {
				unscrambled += String.fromCharCode( text.charCodeAt(i) - 1 );
			}
			return unscrambled;
		}
    }
    
	try {
		window.Communicate = Communicate;
	} catch(e) {
		module.exports = Communicate;
	}

})();