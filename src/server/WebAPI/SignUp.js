var express = require('express');
var router = express.Router();
var validator = require('validator');
var bodyParser = require("body-parser");
var _ = require('lodash');
var async = require('async');

var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Utils = require('../lib/utils');
var Const = require("../lib/consts");


var SignUpHandler = function(){}
var UserModel = require('../Models/User');

_.extend(SignUpHandler.prototype,RequestHandlerBase.prototype);

SignUpHandler.prototype.attach = function(router){
        
    var self = this;

    router.post('/',function(request,response){
                
        var username = request.body.username;
        var email = request.body.email;
        var password = request.body.password;
        var passwordConfirm = request.body.passwordConfirm;
        
        self.validate(request.body,function(err){
            
            if(_.isEmpty(err)){
                
                var userModel = UserModel.get();

                var sha1 = require('sha1');
                var hash = sha1(request.body.password);
        

                // save to database
                var model = new userModel.model({
                    username:username,
                    email: email,
                    password: sha1(password),
                    created: Utils.now()          
                });
                        
                model.save(function(err,fileModel){
                                    
                    if(err){
                        self.errorResponse(response,Const.httpCodeServerError);  
                        return;
                    }
                    
                    self.successResponse(response,{
                        ok: true
                    });   
                
                });

                                 
            } else {
                
                self.successResponse(response,{
                    validationError: err
                });
                
            }
        
        });

    });

}

SignUpHandler.prototype.validate = function(requestBody,callBack){

    // value validation should be done in client side
    
    // check duplications
	var userModel = UserModel.get();
	
    async.waterfall([

		
        function (done) {

            if(_.isEmpty(requestBody.username))
            	done("Wrong username");
            	
            else if(!validator.isAlphanumeric(requestBody.username)){
            	done("Wrong username");
            	
            } else if(!validator.isLength(requestBody.username,Const.credentialsMinLength)){
            	done("Wrong username");
            	
            } else if(!validator.isEmail(requestBody.email)){
            	done("Wrong email");

            } else if(!validator.isEmail(requestBody.email)){
            	done("Wrong email");

            } else if(!validator.isAlphanumeric(requestBody.password)){
            	done("Wrong password");
            	
            } else if(!validator.isLength(requestBody.password,Const.credentialsMinLength)){
            	done("Wrong password");
            
            } else if(requestBody.password != requestBody.passwordConfirm){
            	done("Wrong password");
            
            }
            done(null,null);
            
        },

        function (result,done) {
        
        	userModel.model.findOne({ username: requestBody.username },function (err, user) {
                
                if(!_.isNull(user)){
                    done("The user name is already taken.",null);
                }
                
                done(err,user);
            
            });

        },
        
        function (result,done){
            
        	userModel.model.findOne({ email: requestBody.email },function (err, user) {
                
                if(!_.isNull(user)){
                    done("The email address is already taken.",null);
                }
                
                done(err,user);
            
            });
            
        }],
        
        function (err, result) {
            
            if(callBack)
                callBack(err);            
                         
        }
        
    );

}

new SignUpHandler().attach(router);
module["exports"] = router;
