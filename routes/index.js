/*
 * GET help page.
 */

 onHelp = function(req, res){
	// Write back some response headers
	res.writeHead(200, {'Content-Type': 'text/html'});
	// Write back some content
    res.write('<html><head><title>The Help Page</title></head><body><h1>Welcome to the help page</h1></body></html>');
    // end the response
    res.end();
 };

 // Next I need to export the function, notice that I export the function using a 
 // different name (you don't have to do this but you can if you want).
 exports.help = onHelp;

/*
 * GET sample page
 */
exports.sample = function(req, res){
	// Render the sample(.jade) view i.e. convert it to html
	res.render('sample');
};

/*
 * GET home page.
 */

exports.index = function(req, res){
	// pass the view called index (i.e. index.jade) a JSON object with a property called title
	// that has a value of 'Express' and render the view i.e. convert it to html
	res.render('index', { title: 'Express' });
};