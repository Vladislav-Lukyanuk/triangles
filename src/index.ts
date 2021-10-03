import {BoxGeometry, Euler, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer} from 'three';
import {UserController} from "./controllers/userController";

let camera: PerspectiveCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let mesh: Mesh<BoxGeometry, MeshNormalMaterial>;

var keysPressed = {};

// document.addEventListener('keyup', (event) => {
//     delete keysPressed[event.key];
// });
//
// document.addEventListener('pointermove', ({x, y}) => {
//     const verticalDegree = -0.1 * ((y - (window.innerHeight / 2)) / 45);
//     const horizontalDegree = -0.1 * ((x - (window.innerWidth / 2)) / 45);
//
//     camera.rotation.x = verticalDegree;
//     camera.rotation.y = horizontalDegree;
// })

function animation( time ) {
    renderer.render( scene, camera );

}

(function () {
    camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 1;

    scene = new Scene();

    const controller = new UserController(camera, document.body);

    scene.add(controller.detObject())

    const geometry = new BoxGeometry( 0.5, 0.2, 0.2 );
    const material = new MeshNormalMaterial();

    mesh = new Mesh( geometry, material );
    scene.add( mesh );

    renderer = new WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );

    document.body.appendChild( renderer.domElement );
})();