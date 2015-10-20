(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Config = {};
    
    Config.host = "localhost";
    Config.port = 8080;
    Config.urlPrefix = '/api/v1';
    
    Config.dbCollectionPrefix = '';
    Config.databaseUrl = "mongodb://localhost/user";

    
    Config.emailService = 'Gmail';
    Config.emailFrom = '';
    Config.emailUserName = '';
    Config.emailPassword = '';
    
    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
