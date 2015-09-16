var mongoose = require('mongoose');
var _ = require('lodash');

var Const = require('./consts.js');
var Conf = require('./init.js');

var DatabaseManager = {
    
    isDatabaseReady : false,
    loadedModels : {},
    init: function(callBack){
		
		var self = this;
		
        // Connection to our chat database
        console.log("Connecting mongoDB " + Conf.databaseUrl);
        
        try{
	        
	        mongoose.connect(Conf.databaseUrl, function(err){

	          if (err) {
		          	            
	          } else {
		        
		        self.isDatabaseReady = true;

	          }
	          
	          if(callBack)
                callBack(self.isDatabaseReady);
	          
	        });
	
        } catch(ex){
	        
	        console.log("Failed to connect MongoDB!");

	        throw ex;
	        
        }

    },
    
    getModel : function(modelName){
        
        if(!this.isDatabaseReady)
            return null;
        
        if(!_.isEmpty(this.loadedModels[modelName]))
            return this.loadedModels[modelName];
        
        
        var model = require('../Models/' + modelName);
        
        if(model){
            
            var model = new model();
            
            model.init(mongoose);
            
            this.loadedModels[modelName] = model;
            
            return model;
            
        }
        else
            return null;
        
    }
    
}

module["exports"] = DatabaseManager;