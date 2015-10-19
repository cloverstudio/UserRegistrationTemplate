var express = require('express');
var http = require('http');
var Conf = require('./lib/init.js');

// initialization
var app = express();
var server = http.createServer(app);
var port = Conf.port;
    
var WebAPI = require('./WebAPI/WebAPIMain');
var DatabaseManager = require('./lib/DatabaseManager');

Conf.host = "localhost";
Conf.port = 8081;
Conf.urlPrefix = '/api/v1';

Conf.dbCollectionPrefix = '';
Conf.databaseUrl = "mongodb://localhost/test";
    
DatabaseManager.init(function(success){
        
    if(!success){
        
        console.log('Failed to connect DB');
        process.exit(1);
        
    } else {

        WebAPI.init(app);
        
        server.listen(Conf.port, function(){
            console.log('Server listening on port ' + Conf.port + '!');
        });
        
    }
    
});

module.exports = app;