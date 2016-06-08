/**
 * Created by jose.hillers on 06/06/2016.
 */
var THREE = require("three");
var Cube = require("./cube/cube");
var Preloader = require("./preloader/Preloader");

module.exports = {
    init: function () {
        var cube;
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        var preloader = new Preloader();

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        camera.position.z = 5;

        preloader.load(function () {
            cube = new Cube();
            scene.add(cube);
            render();
        });

        function render() {
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.02;

            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

    }
};