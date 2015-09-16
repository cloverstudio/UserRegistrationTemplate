var bodyParser = require("body-parser");
var _ = require('lodash');

var init = require('../lib/init.js');

var WebAPIMain ={
    
    init: function(app,express){
                
        var self = this;
        
        app.use(init.urlPrefix,express.static(__dirname + '/../../../public'));
        app.use(bodyParser.json());
        
        require('./SignUp').attach(app,express);
                
    }
}

module["exports"] = WebAPIMain;