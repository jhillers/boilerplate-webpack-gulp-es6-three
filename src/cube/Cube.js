/**
 * Created by jose.hillers on 07/06/2016.
 */
var THREE = require("three");

module.exports = function () {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var loader = new THREE.TextureLoader();
    loader.setPath('textures/');

    var imageURL = 'checked-checkbox-512.png';

    var texture = loader.load(imageURL);
    var material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
    return new THREE.Mesh(geometry, material);

};