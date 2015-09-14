var Backbone = require('backbone');
var template = require('./SignIn.hbs');
var _ = require('lodash');

var Utils = require('../../../lib/utils');
var Const = require('../../../lib/consts');
var Config = require('../../../lib/init');

var SignInView = Backbone.View.extend({

    container: null,
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

    },

    validate: function(){


    }

});

module.exports = SignInView;
