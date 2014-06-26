var url = require( "url" );

var responses = {
	"/"						: "Lasers? They're friendly right?",
	"/low" 					: "Working on our tan.",
	"/high" 				: "Raise Worldwide Shields!",
	"/vogons"				: "The dolphins are leaving the planet...",
	"/earth-shattering"		: '<span style="font-size:100pt">Kaboom!</span>',
};

function handler_laser( alien_attack, human_defence ) {

	var urlParts = url.parse( alien_attack.url );
	
	var subpaths = urlParts.pathname.split("/");
	var subsubpath = ( subpaths.length > 2 ) ? "/" + subpaths[2] : "/";
	
	if( subsubpath in responses ) {
		return "<p>" + responses[subsubpath] + "</p>";
	}
	
	return "<p>Perhaps if we had some kind of really big mirror???</p>";
}

exports.handle = handler_laser;