var _ = require('lodash');

var Const = require("../lib/consts");
var Config = require("../lib/init");

var BaseModel = require('./BaseModel');
var UserModel = function(){};

var DatabaseManager = require('../lib/DatabaseManager');


_.extend(UserModel.prototype,BaseModel.prototype);

UserModel.prototype.init = function(mongoose){
    
    this.schema = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        created: Number
    });
 
    this.model = mongoose.model(Config.dbCollectionPrefix + "users", this.schema);
    
}

UserModel.get = function(){
    
    return DatabaseManager.getModel('User');
    
}

module["exports"] = UserModel;
