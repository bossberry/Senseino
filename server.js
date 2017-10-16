var express = require('express')
var app = express();
var http = require('http');
var serveStatic = require('serve-static');



app.use(express.static('./'));
app.use(serveStatic('public', {'index': ['index.html', 'index.htm']}));

var port = (process.env.WEB_PORT) ? process.env.WEB_PORT : 80;

var httpsServer = http.createServer(app);
httpsServer.listen(port, function () {
    console.log("Application start on port: " + port);
});
