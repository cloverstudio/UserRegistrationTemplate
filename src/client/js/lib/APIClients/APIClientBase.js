var JSON = require('JSON2');
var _ = require('lodash');

var Const = require('../consts');
var Conf = require('../init');

(function(global) {
    "use strict;"

    var APIClientBase = function(){}
    
    APIClientBase.prototype.getRequst = function(urlPrefix,success,error){
        
        $.ajax({
           type: 'GET',
           url: Conf.APIEndpoint + urlPrefix,
           dataType: 'json',
           success: function(data) {
               if(_.isFunction(success)){
                   success(data);
               }
           },
           error: function() {
               if(_.isFunction(error)){
                   error();
               }
           }
        });
        
    }

    APIClientBase.prototype.postRequst = function(urlPrefix,data,success,error){
        
        $.ajax({
           type: 'POST',
           url: Conf.APIEndpoint + urlPrefix,
           data: JSON.stringify(data),
           dataType: 'json',
           contentType: "application/json; charset=utf-8",
           success: function(data) {
               if(_.isFunction(success)){
                   success(data);
               }
           },
           error: function() {
               if(_.isFunction(error)){
                   error();
               }
           }
        });
        
    }
        
    // returns instance
    module["exports"] = APIClientBase;

})((this || 0).self || global);