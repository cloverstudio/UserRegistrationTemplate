(function(global) {
    "use strict;"

    var Config = {
        APIEndpoint : 'http://localhost:8080/user/api/v1',
        defaultContaier : 'body' // write JQuery style selector
    };

    // Exports ----------------------------------------------
    module["exports"] = Config;

})((this || 0).self || global);