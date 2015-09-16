var Backbone = require('backbone');
var _ = require('lodash');

(function(global) {
    "use strict;"

    var BaseView = Backbone.View.extend({
    
        container: null,
        showError : function(err){
            
            $(this.container + " .alert").show();
            $(this.container + " .alert .detail").text(err);
            
        },
        dismissAlerts : function(){
            
            $(this.container + " .alert").hide();
            
        }
    });
        
    // returns instance
    module["exports"] = BaseView;

})((this || 0).self || global);