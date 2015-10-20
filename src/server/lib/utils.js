var nodemailer = require('nodemailer');
var init = require('../lib/init');

(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    function Utils() {
    };

    // Header -----------------------------------------------
    Utils.prototype.getRandomString = getRandomString;
    Utils.prototype.now = now;
    Utils.prototype.sendEmail = sendEmail;
    
    // Implementation ---------------------------------------
    function getRandomString(){
    
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < 32; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }
    
    function now(){
        Date.now = Date.now || function() { return +new Date; }; 
        
        return Date.now();
        
    }

    function now(){
        Date.now = Date.now || function() { return +new Date; }; 
        
        return Date.now();
        
    }
    
    function sendEmail(to,subject,body){
        
        var transporter = nodemailer.createTransport({
            service: init.emailService,
            auth: {
                user: init.emailUserName,
                pass: init.emailPassword
            }
        });
        transporter.sendMail({
            from: init.emailFrom,
            to: to,
            subject: subject,
            text: body
        });
        
    }
    
    // Exports ----------------------------------------------
    module["exports"] = new Utils();

})((this || 0).self || global);