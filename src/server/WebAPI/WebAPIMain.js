var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var _ = require('lodash');

var init = require('../lib/init.js');

var WebAPIMain ={
    
    init: function(app){
                
        var self = this;
        
        app.use('/',express.static(__dirname + '/../../../public'));
        app.use(bodyParser.json());
        
        router.use("/user/signin", require('./SignIn'));
        router.use("/user/signup", require('./SignUp'));
        router.use("/user/resetpassword", require('./ResetPassword'));
        router.use("/test", require('./Test'));
        
        app.use(init.urlPrefix, router);
                
    }
}

module["exports"] = WebAPIMain;