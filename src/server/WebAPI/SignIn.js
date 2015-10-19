var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var _ = require('lodash');
var async = require('async');

var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");


var SignInHandler = function(){}
var UserModel = require('../Models/User');

_.extend(SignInHandler.prototype,RequestHandlerBase.prototype);

SignInHandler.prototype.attach = function(router){
        
    var self = this;

    router.post('/',function(request,response){
            
        var userModel = UserModel.get();
            
        var username = request.body.username;
        var password = request.body.password;
        
    	userModel.model.findOne({ 
    	    username: username,
    	    password: password
    	    
        },function (err, user) {
            
            if(!_.isNull(user)){
                self.successResponse(response,{
                    ok: true,
                    user: user
                });
                
                return;
            }
            
            self.successResponse(response,{
                ok: false
            });
        
        });
        
    });
    

}

new SignInHandler().attach(router);
module["exports"] = router;
