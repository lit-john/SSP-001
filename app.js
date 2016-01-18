/*******   Part A *********************/

// Get dependencies
var express = require('express');

var logger = require('morgan');

var routes = require('./routes/index.js');
var user = require('./routes/user');
var path = require('path');
var errorHandler = require('errorhandler');

/********  Part B ********************/

// Create the Express app
var app = express();

/********  Part C ********************/

// Set up some express settings

// Set the port for express to use to be either process.env.PORT or 3000
app.set('port', 8080);

// Specify the directory that contains the views e.g. the jade files
app.set('views', path.join(__dirname, 'views'));

// Specify the extension to use for views if none is specified
app.set('view engine', 'jade');

// Set the environment mode variable 'env' to development i.e. we are in
// development mode. We actually don't have to set this as it defaults
// to 'development' anyway.
app.set('env', 'development');

/********  Part D ********************/

// Set up some middleware. At its simplest you can think of middleware as
// functions that get called before the http request gets routed. The express
// framework uses the Connect middleware framework so all of Connect's
// middleware functions are available here (http://www.senchalabs.org/connect/)
// as well as expresses middleware functions (http://expressjs.com/api.html#middleware)

// Log all requests using the 'dev' format
app.use(logger('dev'));

// Tell express to use the 'static' middleware function and specify the directory
// where static files (html, js, css) will be placed. If express can't find a route
// that matches the request then it will look in the static directory, in the 
// example below that would be the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// If we are in 'development mode' then use the errorHandler middleware which
// prints out as much information about errors as possible
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/********  Part E ********************/

// Ok now that everything is set up lets start routing requests. Let's start with
// a real simple one
app.get('/index', function(req, res){
	// Write back some response headers
	res.writeHead(200, {'Content-Type': 'text/html'});
	// Write back some content
    res.write('<html><head><title>The index Page</title></head><body><h1>Welcome to the index page</h1></body></html>');
    // end the response
    res.end();
});

// This is another example similar to the one above but I am going to 'take the 
// anonymous inline function out'
app.get('/about', about);

function about(req, res) {
	// Write back some response headers
	res.writeHead(200, {'Content-Type': 'text/html'});
	// Write back some content
    res.write('<html><head><title>The About Page</title></head><body><h1>Welcome to the about page</h1></body></html>');
    // end the response
    res.end();
}

// And another example but this time the callback function declared a little differently.
// Notice how this callback function is declared a little differently and it is declared
// before we do the routing on line 92
var onContact = function(req, res){
	// Write back some response headers
	res.writeHead(200, {'Content-Type': 'text/html'});
	// Write back some content
    res.write('<html><head><title>The Contact Page</title></head><body><h1>Welcome to the contact page</h1></body></html>');
    // end the response
    res.end();
};

app.get('/contact', onContact);

// This example will route the /help path to a function that I am going to  declare
// in a index.js which is in the routes folder which, in line 7 above, I require. The function
// is called onHelp but I have exported it as help
app.get('/help', routes.help);


// Next I am going to route the path /sample to a function that I declate in routes but this
// function is going to use a Jade view
app.get('/sample', routes.sample);

// Finaly I will route the / path
app.get('/', routes.index);

/********  Part F ********************/
// Finally, get the app to listen on a port
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

