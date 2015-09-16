(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Config = {};
    
    Config.host = "localhost";
    Config.port = 8080;
    Config.urlPrefix = '/user';
    Config.dbCollectionPrefix = '';
    
    Config.databaseUrl = "mongodb://localhost/user";

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);
