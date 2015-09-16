var bodyParser = require("body-parser");
var _ = require('lodash');
var async = require('async');

var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');
var Const = require("../lib/consts");
var Utils = require('../lib/utils');


var SignInHandler = function(){}
var UserModel = require('../Models/User');

_.extend(SignInHandler.prototype,RequestHandlerBase.prototype);

SignInHandler.prototype.attach = function(app,express){
        
    var self = this;

    app.post(this.path('/resetpassword'),function(request,response){
            
        var userModel = UserModel.get();
        var email = request.body.email;
        
    	userModel.model.findOne({ 
    	    email: email
        },function (err, user) {
            
            if(_.isNull(user)){
            
                self.successResponse(response,{
                    ok: false
                });
                
                return;
            }

            var sha1 = require('sha1');

            var newPassword = Utils.getRandomString(6);
            var newPasswordHashed = sha1(newPassword);
            
            user.update({
                password: newPasswordHashed
            },{},function(err,user){

                if(err){
                    self.errorResponse(response,Const.httpCodeServerError);  
                    return;
                }
            
                self.successResponse(response,{
                    ok: true
                });
                
                                
            });
                
        });
        
    });

}

module["exports"] = new SignInHandler();