var express = require('express');
var http = require('http');
var init = require('./init.js');

// initialization
var app = express();
var server = http.createServer(app);
var port = init.port;
    
var WebAPI = require('./WebAPI/WebAPIMain');

WebAPI.init(app,express);

server.listen(init.port, function(){
    console.log('Server listening on port ' + init.port + '!');
});