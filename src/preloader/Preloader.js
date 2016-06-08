/**
 * Created by jose.hillers on 08/06/2016.
 */
var THREE = require("three");
var FileLoader = require("../file-loader/FileLoader");

function TextureCache() {
    this.load = function (handler) {
        FileLoader.load("./textures/texture-list.json", function () {
            var json = JSON.parse(this.responseText);
            var files = json.files;
            files = files.filter(filterJSONFiles);
            var totalFiles = files.length;
            var loadedFiles = 0;
            var loader = new THREE.TextureLoader();

            files.forEach(function (item) {
                loader.load(item, function () {
                    loadedFiles++;
                    if (loadedFiles >= totalFiles) {
                        handler();
                    }
                });
            });

        });
    };
    function filterJSONFiles(item) {
        return item.indexOf(".json") < 0;
    }
}
module.exports = TextureCache;