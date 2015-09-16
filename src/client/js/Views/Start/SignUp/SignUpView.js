var Backbone = require('backbone');
var template = require('./SignUp.hbs');
var _ = require('lodash');
var validator = require('validator');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

var BaseView = require('../BaseView');
var SignUpClient = require('../../../lib/APIClients/SignUpClient');

var SignUpView = BaseView.extend({

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
		
		$('#form-signup #btn-signup').unbind().on('click',function(){
			
			self.dismissAlerts();
			self.validate(function(err){
				
				self.resetValidationAlert();
				
				if(!_.isEmpty(err.name)){
					$('#form-signup .username').addClass('has-error');
					$('#form-signup .username .help-block').text(err.name);
				}
				
				if(!_.isEmpty(err.email)){
					$('#form-signup .email').addClass('has-error');
					$('#form-signup .email .help-block').text(err.email);
				}
				
				if(!_.isEmpty(err.password)){
					$('#form-signup .password').addClass('has-error');
					$('#form-signup .password .help-block').text(err.password);
				}
				
				var validationSuccess = _.isEmpty(err.name) && _.isEmpty(err.email) && _.isEmpty(err.password);
				
				if(!validationSuccess)
					return;

        		var username = $('#form-signup input[name="username"]').val();
        		var email = $('#form-signup input[name="email"]').val();
        		var password = $('#form-signup input[name="password"]').val();
        		var passwordConfirm = $('#form-signup input[name="password-confirm"]').val();
        
                SignUpClient.send({
                    
                    username:username,
                    email:email,
                    password:password,
                    passwordConfirm:passwordConfirm
                    
                },function(data){
                                        
                    if(!_.isEmpty(data.result.validationError)){
                        
                        self.showError(Utils.l10n(data.result.validationError));
                        
                    }else{
                        // succeeeeeeeed!!!!!
                        self.showInfo(Utils.l10n("Succeed to signup. Please login now."));

                        $('#form-signup input[name="username"]').val("");
                        $('#form-signup input[name="email"]').val("");
                        $('#form-signup input[name="password"]').val("");
                        $('#form-signup input[name="password-confirm"]').val("");
        		
                    }
                    
                    
                },function(){
                    
                    self.showError(Utils.l10n("Failed to signup, please try after."));
                    
                })
                
				
			});
			
		});
		
    },
	
	resetValidationAlert : function(){
		
		$('#form-signup .username').removeClass('has-error');
		$('#form-signup .username .help-block').text('');

		$('#form-signup .email').removeClass('has-error');
		$('#form-signup .email .help-block').text('');

		$('#form-signup .password').removeClass('has-error');
		$('#form-signup .password .help-block').text('');

	},
    validate: function(callBack){

		var name = $('#form-signup input[name="username"]').val();
		var email = $('#form-signup input[name="email"]').val();
		var password = $('#form-signup input[name="password"]').val();
		var passwordConfirm = $('#form-signup input[name="password-confirm"]').val();
		
		var err = {
		    general : '',
			name : '',
			email : '',
			password : ''
		}
		
		if(_.isEmpty(name))
			err.name = Utils.l10n("Please input user name.");
		else if(!validator.isAlphanumeric(name)){
			err.name = Utils.l10n("Name must be alphanumerical.");
		} else if(!validator.isLength(name,Const.credentialsMinLength)){
			err.name = Utils.l10n("Name must be at least ") + Const.credentialsMinLength + Utils.l10n(" characters.");
		}
		
		if(_.isEmpty(email))
			err.email = Utils.l10n("Please input email.");
		else if(!validator.isEmail(email)){
			err.email = Utils.l10n("Wrong email address");
		} 
		
		if(_.isEmpty(password))
			err.password = Utils.l10n("Please input password.");
		else if(!validator.isAlphanumeric(password)){
			err.password = Utils.l10n("Password must be alphanumerical.");
		} else if(!validator.isLength(password,Const.credentialsMinLength)){
			err.password = Utils.l10n("Password must be at least ") + Const.credentialsMinLength + Utils.l10n(" characters.");
		} else if(password != passwordConfirm){
			err.password = Utils.l10n("Passwords must be same.");
		}
		
		callBack(err);
		
    }

});

module.exports = SignUpView;
