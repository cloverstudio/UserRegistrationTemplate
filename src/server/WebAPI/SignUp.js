var bodyParser = require("body-parser");
var _ = require('lodash');

var RequestHandlerBase = require('./RequestHandlerBase');
var init = require('../lib/init');

var SignUpHandler = function(){}

_.extend(SignUpHandler.prototype,RequestHandlerBase.prototype);

SignUpHandler.prototype.attach = function(app,express){
        
    var self = this;

    //Login data (requires body-parser)
    app.post(this.path('/signup'),function(request,response){
                
        var name = request.body.name;
        var email = request.body.email;
        var password = request.body.password;
        var passwordConfirm = request.body.passwordConfirm;
        
        
        
        self.successResponse(response,{
            ok: 'ok'
        });
        
    });

}

SignUpHandler.prototype.validate = function(requestBody){

    var name = requestBody.name;
    var email = requestBody.email;
    var password = requestBody.password;
    var passwordConfirm = requestBody.passwordConfirm;
    

}


module["exports"] = new SignUpHandler();