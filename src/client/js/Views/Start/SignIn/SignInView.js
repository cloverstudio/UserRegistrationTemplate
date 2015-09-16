var Backbone = require('backbone');
var template = require('./SignIn.hbs');
var _ = require('lodash');
var sha1 = require('sha1');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

var BaseView = require('../BaseView');
var SignInClient = require('../../../lib/APIClients/SignInClient');

var SignInView = BaseView.extend({

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

		$('#form-signin #btn-signin').unbind().on('click',function(){
			
			self.dismissAlerts();
			
			self.validate(function(err){
				
				self.resetValidationAlert();
				
				if(!_.isEmpty(err.name)){
					$('#form-signin .username').addClass('has-error');
					$('#form-signin .username .help-block').text(err.name);
				}

				
				if(!_.isEmpty(err.password)){
					$('#form-signin .password').addClass('has-error');
					$('#form-signin .password .help-block').text(err.password);
				}
				
				var validationSuccess = _.isEmpty(err.name) && _.isEmpty(err.password);
				
				if(!validationSuccess)
					return;

        		var username = $('#form-signin input[name="username"]').val();
        		var password = $('#form-signin input[name="password"]').val();
                var passwordHashed = hash = sha1(password);
                
                SignInClient.send({
                    
                    username:username,
                    password:passwordHashed
                                        
                },function(data){
                    
                    console.log(data.result.ok);
                    
                    if(data.result.ok){
                        
                        self.showInfo(Utils.l10n("Succeed to signin!!"));
                        
                    }else{
                    
                        self.showError(Utils.l10n("Wrong user name or password"));
        		
                    }
                    
                    
                },function(){
                    
                    self.showError(Utils.l10n("Failed to signin, please try after."));
                    
                })

                
			});
			
		});
		
    },

	resetValidationAlert : function(){
		
		$('#form-signin .username').removeClass('has-error');
		$('#form-signin .username .help-block').text('');

		$('#form-signin .password').removeClass('has-error');
		$('#form-signin .password .help-block').text('');

	},
	
    validate: function(callBack){

		var name = $('#form-signin input[name="username"]').val();
		var password = $('#form-signin input[name="password"]').val();
		
		var err = {
		    general : '',
			name : ''
		}
		
		if(_.isEmpty(name))
			err.name = Utils.l10n("Please input user name.");
		
		if(_.isEmpty(password))
			err.password = Utils.l10n("Please input password.");
		
		callBack(err);
		
    }

});

module.exports = SignInView;
