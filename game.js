var canvas = this.document.getElementById('canvas');
var engine = new BABYLON.Engine(canvas, true);

let playerSpeed = 1
let travelSpeed = 0.3
let frameCount = 0


console.log("started")

// This creates a basic Babylon Scene object (non-mesh)
var scene = new BABYLON.Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 50), scene);
camera.inputs.clear();

// This targets the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 50, 0), scene);

// Default intensity is 1.
light.intensity = 0.5;

let lightMaterial = new BABYLON.StandardMaterial("light", scene);
lightMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);

let darkMaterial = new BABYLON.StandardMaterial("dark", scene);
darkMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);

var player = BABYLON.MeshBuilder.CreateCylinder("cyclinder", {diameterTop: 0, diameterBottom: 1}, scene);
player.position = new BABYLON.Vector3(0, -1, 47)
player.material = darkMaterial
player.rotation.x = -70

// Our built-in 'sphere' shape.
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
sphere.material = lightMaterial
var sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere2", {diameter: 2, segments: 32}, scene);
sphere2.position = new BABYLON.Vector3(0, 5, 0);
sphere2.material = lightMaterial

var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://anamaziluu.github.io/test-assets/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

// myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
// myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
// myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

sphere.material = darkMaterial;

scene.onKeyboardObservable.add(function(eventData) {
    if (eventData.type == BABYLON.KeyboardEventTypes.KEYDOWN) {
        switch (eventData.event.key) {
            case "w":
                sphere.position.y -= playerSpeed
                sphere2.position.y -= playerSpeed
                break;
            case "s":
                sphere.position.y += playerSpeed
                sphere2.position.y += playerSpeed
                break;
            case "a":
                sphere.position.x -= playerSpeed
                sphere2.position.x -= playerSpeed
                break;
            case "d":
                sphere.position.x += playerSpeed
                sphere2.position.x += playerSpeed
                break;
            case "o":
                sphere.material = lightMaterial;
                break;
            case "p":
                sphere.material = darkMaterial;
                break;
        }
    }
})

engine.runRenderLoop(function() {
    console.log("render")
    if (player.intersectsMesh(sphere, true) || player.intersectsMesh(sphere2, true)) {
        player.material = lightMaterial
    } else {
        player.material = darkMaterial
    }

    let speedUpFactor = 1 + Math.round(frameCount / 60 / 60) / 10

    sphere.position.z += travelSpeed * speedUpFactor
    sphere2.position.z += travelSpeed * speedUpFactor
    scene.render();
    frameCount += 1;
})

clickEvent.initEvent("pointerdown", true, true);

window.addEventListener("resize", function () {
    engine.resize();
});