let canvas = this.document.getElementById('canvas');
let engine = new BABYLON.Engine(canvas, true);

// This creates a basic Babylon Scene object (non-mesh)
let scene = new BABYLON.Scene(engine);

let forwardMovementSpeed = 0.09;
let horizontalMovementSpeed = 1;
let frameCount = 0;
let boxNumber = 0;
let boxSize = 0.5;
let boxGenerationRate = 0.5;


// helpers
function degreesToRadians(degrees) {
    return degrees / 360 * 2 * 3.141592
}

function createBox(red, green, blue, xPosition, zPosition) {
    let boxName = "box" + boxNumber;
    let box = BABYLON.MeshBuilder.CreateBox(boxName, {size: boxSize}, scene);
    box.position.x = xPosition;
    box.position.z = zPosition;

    let diffuseMultiplier = 0.8
    let specularMultiplier = 0.6
    let ambientMultiplier = 0.6

    let materialName = "boxMaterial" + boxNumber;
    let material = new BABYLON.StandardMaterial(materialName, scene);
    material.diffuseColor = new BABYLON.Color3(red * diffuseMultiplier, green * diffuseMultiplier, blue * diffuseMultiplier);
    material.specularColor = new BABYLON.Color3(red * specularMultiplier, green * specularMultiplier, blue * specularMultiplier);
    material.ambientColor = new BABYLON.Color3(red * ambientMultiplier, green * ambientMultiplier, blue * ambientMultiplier);
    box.material = material;

    box.rotation.x = degreesToRadians(45);
    box.rotation.y = degreesToRadians(45);

    boxNumber += 1;

    return box
}


// Set the color of the background to white
scene.clearColor = new BABYLON.Color3(1, 1, 1);

// This creates and positions a free camera (non-mesh)
let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -50), scene);
camera.inputs.clear();

// This targets the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 50, 20), scene);

// Default intensity is 1.
light.intensity = 0.8;

// Creating an arrow
const player = BABYLON.MeshBuilder.CreateDisc("disc", {radius: 0.2, tessellation: 3});
player.position.z = -48;
player.position.y = -0.5;
player.rotation.z = degreesToRadians(-30);

// create boxes
let box1 = createBox(1, 0, 0, -15, 0);
let box2 = createBox(1, 0.6, 0, -10, 0);
let box3 = createBox(1, 1, 0, -5, 0);
let box4 = createBox(0, 1, 0, 5, 0);
let box5 = createBox(0, 1, 1, 10, 0);
let box6 = createBox(0, 0, 1, 15, 0);

window.addEventListener("resize", function () {
    engine.resize();
});

function movePlayerAndCamera(x,z) {
    player.position.x += x;
    player.position.z += z;

    camera.position.x += x;
    camera.position.z += z;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function createRandomBox() {
    let colorPossibilities = [0.5, 0.7, 1];
    let positionPossibilities = [-15, -10, -5, 0, 5, 10, 15];

    let randomRed = getRandomElement(colorPossibilities);
    let randomGreen = getRandomElement(colorPossibilities);
    let randomBlue = getRandomElement(colorPossibilities);

    let randomX = getRandomElement(positionPossibilities) + player.position.x;
    let Zposition = player.position.z + 10;
    createBox(randomRed, randomGreen, randomBlue, randomX, Zposition);
}



scene.onKeyboardObservable.add(function(eventData) {
    if (eventData.type == BABYLON.KeyboardEventTypes.KEYDOWN) {
        switch (eventData.event.key) {
            case "ArrowLeft":
                movePlayerAndCamera(-horizontalMovementSpeed, 0);
                break;
            case "ArrowRight":
                movePlayerAndCamera(horizontalMovementSpeed, 0);
                break;
        }
    }
})


function getFrameTime() {
    return frameCount / 60;
}


engine.runRenderLoop(function() {
    movePlayerAndCamera(0, forwardMovementSpeed);
    if (getFrameTime() % boxGenerationRate == 0) {
        createRandomBox();
    }

    frameCount += 1;
    scene.render();
})

// engine.runRenderLoop(function() {
    

//     let speedUpFactor = 1 + Math.round(frameCount / 60 / 60) / 10

//     sphere.position.z += travelSpeed * speedUpFactor
//     sphere2.position.z += travelSpeed * speedUpFactor
//     scene.render();
//     frameCount += 1;
// })