/**
 * Created by jose.hillers on 06/06/2016.
 */

var app = require("./src/app.js");

module.exports = function(){
    console.log("Initialising application.");
    app.init();
}();