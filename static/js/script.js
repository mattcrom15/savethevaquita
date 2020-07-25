//content



//countdown
var max = 600;
var cdownElement = document.querySelector('.ten');
var cdown = setInterval(function(){

    if (max ==10){
        cdownElement.innerHTML = 10;
        clearInterval();

    } else{
        cdownElement.innerHTML = --max;

    }


},1);

// mouse 
var cursorX;
var cursorY;

document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}




//canvas 
var canvasElement = document.getElementById('c');
//new three js scene
var scene = new THREE.Scene();

//create camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.aspect = canvasElement.clientWidth / canvasElement.clientHeight;
// camera.updateProjectionMatrix();
//create renderer
var renderer = new THREE.WebGLRenderer({alpha: true, antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
canvasElement.appendChild( renderer.domElement );

renderer.domElement.addEventListener("click", onclick, true);
var selectedObject;
var raycaster = new THREE.Raycaster();

function onclick(){
    console.log('click');
}
//pointlight

var point_light = new THREE.PointLight(0x404040, 4);
point_light.position.set(50,0,100);
point_light.castShadow = true;
scene.add(point_light);

// //axis
// scene.add(new THREE.AxesHelper(500));

//enviroment

var envmap_cubetext = new THREE.CubeTextureLoader();
envmap_cubetext.setPath( 'static/img/cubemap/' );

var textureCube = envmap_cubetext.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

//boat texture

var Bd = new THREE.TextureLoader().load('meshes/boat/boat_Texture.png');
Bd.flipY = false;

var BoatMaterial = new THREE.MeshToonMaterial({
    map: Bd,
    emissive: '#fff',
    emissiveMap: Bd,
    emissiveIntensity: 0.1,
    roughness: 1,
    envMap:textureCube,
    envMapIntensity: 1,


});


//load boatmesh
var boatLoader = new THREE.GLTFLoader();

var boat = boatLoader.load('meshes/boat/fishing_boat.glb',
function ( gltf ) {
    boat_mesh = gltf.scene
    var b_psr = {
        'Rx': 0.3,
        'Ry': -2.5,
        'Rz': 0,
        'x': 5,
        'y':-22.67,
        'z':0

    }
    boat_mesh.position.set(b_psr['x'],b_psr['y'],b_psr['z']);
    boat_mesh.rotation.set(b_psr['Rx'],b_psr['Ry'],b_psr['Rz']);
    boat_mesh.castShadow = true;
    boat_mesh.receiveShadow = true;
    scene.add( boat_mesh );

    //assign boat material
    boat_mesh.traverse((mesh)=>{
        if (mesh.isMesh) mesh.material = BoatMaterial;
    });

},
// called while loading is progressing
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

    console.log( 'An error happened' );

}
);




var Vd = new THREE.TextureLoader().load('meshes/Vaquita_mesh/Vaquita_diffuse.png');
Vd.flipY = false;
var Vr = new THREE.TextureLoader().load('meshes/Vaquita_mesh/Vaquita_roughness.png');
Vr.flipY = false;
VaquitaMaterial = new THREE.MeshStandardMaterial({
    map: Vd,
    roughness: 0.6,
    roughnessMap: Vr,
    envMap:textureCube,
    envMapIntensity: 4,
    metalness: 0,

});


// load Vaquita
var VaquitaLoader = new THREE.GLTFLoader();

var Vaquita = VaquitaLoader.load('meshes/Vaquita_mesh/Vaquita.glb',
function ( gltf ) {
    var v_psr = {
        'Rx': -0.2,
        'Ry': -1.3,
        'Rz': 0,
        'x': 1,
        'y':-0.2,
        'z':7.2

    }

    v_mesh = gltf.scene
    v_mesh.position.set(v_psr['x'],v_psr['y'],v_psr['z']);
    v_mesh.rotation.set(v_psr['Rx'],v_psr['Ry'],v_psr['Rz']);
    v_mesh.castShadow = true;
    v_mesh.receiveShadow = true;
    scene.add(v_mesh);

    //assign Vaquita material
    v_mesh.traverse((mesh)=>{
        if (mesh.isMesh) mesh.material = VaquitaMaterial;
    });

    





},
// called while loading is progressing
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

    console.log( 'An error happened' );


}


);






// earth texture
var earthTexture = new THREE.TextureLoader().load('meshes/earth/2k_earth_daymap_white_blue.jpg');
earthTexture.flipY = false;

var EarthMaterial = new THREE.MeshToonMaterial({
    map: earthTexture,
    roughness: 0.7,
    envMap:textureCube,
    envMapIntensity: 4,
    metalness: 0,

});

var pinTopMaterial = new THREE.MeshToonMaterial({
    color: '#FF7171',
    emissive: '#FF7171',
    emissiveIntensity: 0.4,
    roughness: 0.7,
    envMap:textureCube,
    envMapIntensity: 4,
    metalness: 0,
})

var pinMaterial = new THREE.MeshToonMaterial({
    color: '#000',
    roughness: 0,
    envMap:textureCube,
    envMapIntensity: 4,
    metalness: 1,

})

// load earth
var EarthLoader = new THREE.GLTFLoader();

var Earth = EarthLoader.load('meshes/earth/earth.glb',
function ( gltf ) {
    var e_psr = {
        'Rx': 0,
        'Ry': 0,
        'Rz': 0,
        'x': -1.2,
        'y':-10.65,
        'z':7.6

    }
    // e_mesh = gltf.scene
    earthMesh = gltf.scene;
    pin = earthMesh.children[0].children[0];
    pintop = earthMesh.children[0].children[1];
    earthMesh.position.set(e_psr['x'],e_psr['y'],e_psr['z']);
    earthMesh.rotation.set(e_psr['Rx'],e_psr['Ry'],e_psr['Rz']);
    earthMesh.castShadow = true;
    earthMesh.receiveShadow = true;
    scene.add(earthMesh);

    //assign earth material

    earthMesh.traverse((mesh)=>{
        if (mesh.isMesh) mesh.material = EarthMaterial;
    });

    //assign pnitop material
    pintop.traverse((mesh)=>{
        if (mesh.isMesh) mesh.material = pinTopMaterial;
    });

    //assign pin material
    pin.traverse((mesh)=>{
        if (mesh.isMesh) mesh.material = pinMaterial;
    });





},
// called while loading is progressing
function ( xhr ) {

    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

},
// called when loading has errors
function ( error ) {

    console.log( 'An error happened' );

}
);






camera.position.z = 10;



window.addEventListener('scroll', function() {
    camera.position.y = - window.scrollY / 100;
    console.log(window.scrollY / 100);

});



function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );



    // if (boat_mesh){
    //     boat_mesh.rotation.y = cursorX / 200;
    //     boat_mesh.rotation.x = cursorY / 200;
    // } 
    // if (v_mesh){
    //     v_mesh.rotation.y = cursorX / window.innerWidth / 0.1;
    //     v_mesh.rotation.x = cursorY / window.innerHeight / 0.1;


    // }
    if (earthMesh){
        earthMesh.rotation.y += 0.001;

    }
    if (boat_mesh){
        boat_mesh.rotation.y += 0.005;

    }



    
    
    
}
animate();