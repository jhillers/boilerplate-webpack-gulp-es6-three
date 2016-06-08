/**
 * Created by jose.hillers on 08/06/2016.
 */
module.exports = {
    load: function (url, handler) {
        var request = new XMLHttpRequest();
        request.addEventListener("load", handler);
        request.open("GET", url);
        request.send();
    }
};