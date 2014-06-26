var url = require( "url" );
//var util = require( 'util' );

var handlers = {
	"/" 			: "handler_wait",
	"/lasers" 		: "handler_laser",
	"/surrender" 	: "handler_surrender",
};

function earth_defence_router( request, response ) {

	var urlParts = url.parse( request.url );
	
	var subpaths = urlParts.pathname.split("/");
	var subpath = ( subpaths.length > 1 ) ? "/" + subpaths[1] : "/";
	
	if( subpath in handlers ) {
		var handler = require( "./handlers/" + handlers[subpath] );
		return handler.handle( request, response );
	}
	
	return "No viable response. Fire wildly into the skies!";
}

exports.router = earth_defence_router;