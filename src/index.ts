import {
    BoxGeometry,
    Color,
    Euler, Float32BufferAttribute, Fog, HemisphereLight,
    Mesh, MeshBasicMaterial,
    MeshNormalMaterial,
    PerspectiveCamera, PlaneGeometry, Raycaster,
    Scene,
    Vector3,
    WebGLRenderer
} from 'three';
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
    camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 10;

    const raycaster = new Raycaster( new Vector3(), new Vector3( 0, - 1, 0 ), 0, 10 );

    // floor

    let floorGeometry = new PlaneGeometry( 2000, 2000, 100, 100 );
    floorGeometry.rotateX( - Math.PI / 2 );

    // vertex displacement

    let position = floorGeometry.attributes.position;

    for ( let i = 0, l = position.count; i < l; i ++ ) {

        const vertex = new Vector3().fromBufferAttribute( position, i );

        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

        position.setXYZ( i, vertex.x, vertex.y, vertex.z );

    }

    // floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    const colorsFloor = [];

    for ( let i = 0, l = position.count; i < l; i ++ ) {

        const color = new Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
        colorsFloor.push( color.r, color.g, color.b );

    }

    floorGeometry.setAttribute( 'color', new Float32BufferAttribute( colorsFloor, 3 ) );

    const floorMaterial = new MeshBasicMaterial( { vertexColors: true } );

    const floor = new Mesh( floorGeometry, floorMaterial );


    const light = new HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );

    scene = new Scene();

    scene.add( floor );
    scene.add( light );


    const controller = new UserController(camera, document.body);

    scene.add(controller.detObject());
    scene.background = new Color( 0xffffff );
    scene.fog = new Fog( 0xffffff, 0, 750 );

    const geometry = new BoxGeometry( 0.5, 0.2, 0.2 );
    const material = new MeshNormalMaterial();

    mesh = new Mesh( geometry, material );
    scene.add( mesh );

    renderer = new WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );

    document.body.appendChild( renderer.domElement );
})();