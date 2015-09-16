var Backbone = require('backbone');
var template = require('./Reset.hbs');
var _ = require('lodash');
var validator = require('validator');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

var BaseView = require('../BaseView');
var ResetPasswordClient = require('../../../lib/APIClients/ResetPasswordClient');

var ResetView = BaseView.extend({

    initialize: function(options) {
        
        this.container = options.container;
        this.render();
    },

    render: function() {
        
        $(this.container).html(template());

        this.onLoad();

        return this;

    },

    onLoad: function(){

        var self = this;

		$('#form-reset #btn-reset').unbind().on('click',function(){
			
			self.dismissAlerts();
			
			self.validate(function(err){
				
				self.resetValidationAlert();
				
				if(!_.isEmpty(err.email)){
					$('#form-reset .email').addClass('has-error');
					$('#form-reset .email .help-block').text(err.email);
				}

				var validationSuccess = _.isEmpty(err.email);
				
				if(!validationSuccess)
					return;
                    
        		var email = $('#form-reset input[name="email"]').val();
                
                ResetPasswordClient.send({
                    
                    email:email
                                        
                },function(data){
                    
                    console.log(data.result.ok);
                    
                    if(data.result.ok){
                        
                        self.showInfo(Utils.l10n("New password is sent to your email."));
                        
                    }else{
                    
                        self.showError(Utils.l10n("Wrong email address"));
        		
                    }
                    
                    
                },function(){
                    
                    self.showError(Utils.l10n("Failed to reset password, please try after."));
                    
                })

                
			});
			
		});
		
    },

	resetValidationAlert : function(){
		
		$('#form-reset .email').removeClass('has-error');
		$('#form-reset .email .help-block').text('');

	},
	
    validate: function(callBack){

		var email = $('#form-reset input[name="email"]').val();
		
		var err = {
		    email : ''
		}
		
		if(_.isEmpty(email))
			err.email = Utils.l10n("Please input email address.");
		else if(!validator.isEmail(email)){
			err.email = Utils.l10n("Wrong email address");
		} 
		
		callBack(err);
		
    }

});

module.exports = ResetView;
