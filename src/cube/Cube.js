/**
 * Created by jose.hillers on 07/06/2016.
 */
import {Mesh,MeshBasicMaterial,TextureLoader,BoxGeometry} from "three"

export default class Cube extends Mesh {

    constructor() {
        var geometry = new BoxGeometry(1, 1, 1);
        var loader = new TextureLoader();
        loader.setPath('textures/');
        var imageURL = 'checked-checkbox-512.png';
        var texture = loader.load(imageURL);
        var material = new MeshBasicMaterial({color: 0xffffff, map: texture});
        super(geometry, material);
    }
}
