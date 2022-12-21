
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("try").innerHTML = coords;
    console.log(coords)
  }

//   horizontalSpeed: 1.2,
//   verticalSpeed: 1.4,
var origin = new THREE.Vector3(0,0,0);
var camera;
var tick = 0;
var scene;
var renderer;
var clock = new THREE.Clock(true);
var container;
var options;
var spawnerOptions;
var particleSystem;

function init() {
    var winSize = getWindowSize();
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(28,winSize.aspect*0.2,1,10000);

    camera.position.z = 100;
    scene = new THREE.Scene();

    particleSystem = new THREE.GPUParticleSystem({maxParticles: 250000});

    scene.add(particleSystem);

    optionsRed = {
        position: origin,
        positionRandomness: 3,
        velocity: new THREE.Vector3(0,5,0),
        velocityRandomness: 0,
        color: 0xff0000,
        colorRandomness: 0,
        turbulence: 0,
        lifetime: 10,
        size: 2,
        sizeRandomness: 10
    };

    optionsYellow = {
        position: origin,
        positionRandomness: 3,
        velocity: new THREE.Vector3(0,5,0),
        velocityRandomness: 0,
        color: 0xFCE205,
        colorRandomness: 0,
        turbulence: 0,
        lifetime: 10,
        size: 2,
        sizeRandomness: 0
    };
    optionsOrange = {
        position: origin,
        positionRandomness: 3,
        velocity: new THREE.Vector3(0,5,0),
        velocityRandomness: 0,
        color: 0xFFA500,
        colorRandomness: 0,
        turbulence: 0,
        lifetime: 10,
        size: 2,
        sizeRandomness: 0
    };

    
    spawnerOptions = {
        spawnRate: 3260,
        timeScale: 1
    };

    renderer = new THREE.WebGLRenderer();  
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize(){
    var winSize = getWindowSize();
    camera.aspect = winSize.aspect*0.2;
    camera.updateProjectionMatrix();

    renderer.setSize(winSize.width, winSize.height);
}

function getWindowSize(){
    return {
        'width': window.innerWidth,
        'height': window.innerHeight,
        'aspect': (window.innerWidth/window.innerHeight)
    };
}

function animate(){
    requestAnimationFrame(animate);

    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;

    if (tick < 0) tick = 0;

    if (delta > 0){
        
        // optionsRed.position.x = 0;
        // optionsRed.position.y = 0;
        // optionsRed.position.z = 0;

        // optionsYellow.position.x = 0;
        // optionsYellow.position.y = 0;
        // optionsYellow.position.z = 0;

        // optionsOrange.position.x = 0;
        // optionsOrange.position.y = 0;
        // optionsOrange.position.z = 0;

       
        optionsRed.turbulence += delta;
        optionsYellow.turbulence += delta;
        optionsOrange.turbulence += delta;

        for (var x = 0; x < spawnerOptions.spawnRate * delta; x++){
            particleSystem.spawnParticle(optionsRed);
        }
        for (var x = 0; x < 5; x++){
            particleSystem.spawnParticle(optionsYellow);
        }
        for (var x = 0; x < 10; x++){
            particleSystem.spawnParticle(optionsOrange);
        }
    }

    particleSystem.update(tick);
    render();
}

function render(){
    renderer.render(scene, camera);
}

init();
animate();
