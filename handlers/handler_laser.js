var url = require( "url" );

var responses = {
	"/"						: "Lasers? They're friendly right?",
	"/low" 					: "Working on our tan.",
	"/high" 				: "Raise Worldwide Shields!",
	"/vogons"				: "The dolphins are leaving the planet.",
	"/earth-shattering"		: "Kaboom.",
};

function handler_laser( alien_attack, human_defence ) {

	var urlParts = url.parse( alien_attack.url );
	
	var subpaths = urlParts.pathname.split("/");
	var subsubpath = ( subpaths.length > 2 ) ? "/" + subpaths[2] : "/";
	
	if( subsubpath in responses ) {
		return responses[subsubpath];
	}
	
	return "Perhaps if we had some kind of really big mirror?";
}

exports.handle = handler_laser;