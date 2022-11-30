// import setHighScore from '../loginPage/login.js';

let canvas = this.document.getElementById('canvas');
let engine = new BABYLON.Engine(canvas, true);

// Materials for coins

const TEXTURE_FLOOR = "textures/floor_bump.png";
const TEXTURE_ROCK  = "textures/rockn.png";

// This creates a basic Babylon Scene object (non-mesh)
let scene = new BABYLON.Scene(engine);

// This should help with the loading
scene.getAnimationRatio();

// scene.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
let score = 0;
let displayedBoxes = [];
let displayedCoins = [];

let forwardMovementSpeed = 0.09;
let horizontalMovementSpeed = 1;
let frameCount = 0;
let boxNumber = 0;
let boxSize = 0.6;
let coinSize = 0.2;
let boxGenerationRate = 0.5;
let coinGenerationRate = 0.5;
let coinRotationSpeed = 0.3;


// helpers
function degreesToRadians(degrees) {
    return degrees / 360 * 2 * 3.141592
}


const makeCoinMesh = (coinType) => {
    // Physically Based Materials - Measured BaseColors for metals:
    // https://docs.unrealengine.com/5.0/en-US/physically-based-materials-in-unreal-engine/
    const params = {
        "GOLD":   { metalic:1.0, roughness:0.2, color:[1.000, 0.766, 0.336], texture:TEXTURE_FLOOR, height:0.05, diameter: 0.5 },
        "SILVER": { metalic:1.0, roughness:0.4, color:[0.972, 0.960, 0.915], texture:TEXTURE_ROCK, height:0.05, diameter:0.8 },
        "COPPER": { metalic:1.0, roughness:0.2, color:[0.955, 0.637, 0.538], texture:TEXTURE_ROCK, height:0.05, diameter:0.6 },
    };

    const param = params[coinType];
    const mat = new BABYLON.PBRMaterial("material", scene);
    mat.metallic = param.metalic;
    mat.roughness = param.roughness;
    mat.forceIrradianceInFragment = true;
    mat.albedoColor = new BABYLON.Color3(param.color[0], param.color[1], param.color[2]);
    mat.bumpTexture = new BABYLON.Texture(param.texture, scene);

    // var randomColor = BABYLON.Color3.Random()
    // mat.emissiveColor = randomColor

    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0, 1.00, 1);
    faceUV[1] =	new BABYLON.Vector4(1, 0, 0.32, 1);
    faceUV[2] = new BABYLON.Vector4(0, 0, 1.00, 1);

    mesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height:param.height, diameter:param.diameter, faceUV: faceUV}, scene);
    mesh.material = mat;

    displayedCoins.push(mesh);
    return mesh;
};


function createBox(red, green, blue, xPosition, zPosition) {
    let boxName = "box" + boxNumber;
    let box = BABYLON.MeshBuilder.CreateBox(boxName, {size: boxSize}, scene);
    box.position.x = xPosition;
    box.position.z = zPosition;
    box.position.y = -0.5;

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
    displayedBoxes.push(box);
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

function createRandomCoin() {
    let coin = makeCoinMesh("GOLD");
    let positionPossibilities = [-17, -12, -7, 2, 7, 12, 17];
    let randomX = getRandomElement(positionPossibilities) + player.position.x;
    let randomZ = player.position.z + 10;
    coin.position.x = randomX;
    coin.position.z = randomZ;
    coin.position.y = -0.3;
    coin.rotation.x = degreesToRadians(110);
    coin.rotation.y = degreesToRadians(45);
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



// var  anotherLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-200, -10, 200), scene);
// anotherLight.position = new BABYLON.Vector3(0, 150, -250);
// anotherLight.intensity = 3;	

// Default intensity is 1.
light.intensity = 0.8;

// Creating an arrow
const player = BABYLON.MeshBuilder.CreateDisc("disc", {radius: 0.15, tessellation: 3});
player.position.z = -48;
player.position.y = -0.5;
player.rotation.z = degreesToRadians(-30);

// create boxes
// let box1 = createBox(1, 0, 0, -15, 0);
// let box2 = createBox(1, 0.6, 0, -10, 0);
// let box3 = createBox(1, 1, 0, -5, 0);
// let box4 = createBox(0, 1, 0, 5, 0);
// let box5 = createBox(0, 1, 1, 10, 0);
// let box6 = createBox(0, 0, 1, 15, 0);

window.addEventListener("resize", function () {
    engine.resize();
});

function movePlayerAndCamera(x,z) {
    player.position.x += x;
    player.position.z += z;

    camera.position.x += x;
    camera.position.z += z;
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
            case "P":
            console.log("s-a apasat P")
            break;
        }
    }
})


function getFrameTime() {
    return frameCount / 60;
}

function updatePlayerPosition() {
    movePlayerAndCamera(0, forwardMovementSpeed);
}

function checkIntersections() {
    for (let box of displayedBoxes) {
        if (player.intersectsMesh(box, false)) {
            return true;
        }
    }
    return false;
}

function checkCoinsIntersections() {
    let lightMaterial = new BABYLON.StandardMaterial("light", scene);
    lightMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);

    let darkMaterial = new BABYLON.StandardMaterial("dark", scene);
    darkMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);

    let intersects = false;
    for (let coin of displayedCoins) {
        if (player.intersectsMesh(coin, false)) {
            intersects = true;
        }
    }
    if (intersects) {
        player.material = lightMaterial;
        score += 1;
    } else {
        player.material = darkMaterial;
    }
}

function filterPassedBoxes() {
    for (let box of displayedBoxes) {
        if ((box.position.z + boxSize / 2) < player.position.z) {
            let index = displayedBoxes.indexOf(box);
            if (index > -1) { // only splice array when item is found
                displayedBoxes.splice(index, 1);
            }
        }
    }
}

function filterPassedCoins() {
    for (let coin of displayedCoins) {
        if ((coin.position.z + boxSize / 2) < player.position.z) {
            let index = displayedCoins.indexOf(coin);
            if (index > -1) { // only splice array when item is found
                displayedCoins.splice(index, 1);
            }
        }
    }
}

function updatesHighScore() {
    const userLocalStorageKey = "users_key";
    let loggedInUser = localStorage.getItem('loggedInUser');
    let returnedUsers = localStorage.getItem(userLocalStorageKey);
    if (returnedUsers) {
        users = JSON.parse(returnedUsers);
    }

    let previousScore = users[loggedInUser].highScore;

    if (previousScore < score) {
        users[loggedInUser].highScore = score;
    }

    localStorage.setItem(userLocalStorageKey, JSON.stringify(users));
    
    
}

function clickOnPlayAgain() {
    console.log("s-a apasat butonul");
    window.location.href='../gamePage/gamePage.php';
}

function gameOver() {
    engine.stopRenderLoop();
    let canvas = document.querySelector('.main-page-wrap');
    canvas.innerHTML = `
    // justify-content: center; 
        <div style="margin-left: 50%; transform: translate(-50%); margin-top: 10px; margin-bottom: 10px; background-color: white; width: 20%; border: 3px solid black; padding: 10px; text-align: center;"> Game over!<br> Your score is: ${score}</div>
        <button id="play-again-button" style="color: red; width: 20%; margin-left: 50%; transform: translate(-50%); border: 3px solid black; padding: 10px; text-align: center;"> Play again! </button>
    `;

    let btn = document.getElementById("play-again-button");
    btn.addEventListener('click', event => {
        clickOnPlayAgain();
      });
    updatesHighScore();
}


function rotateCoins() {
    for (let coin of displayedCoins) {
        coin.rotation.y += coinRotationSpeed;
    }
}

engine.runRenderLoop(function() {
    updatePlayerPosition()
    let secondsPassed = getFrameTime()
    if (secondsPassed % boxGenerationRate == 0 && !secondsPassed == 0) {
        createRandomBox();
        createRandomCoin();
    }
    
    if (checkIntersections()) {
        gameOver();
    }
    checkCoinsIntersections()
    filterPassedBoxes()
    filterPassedCoins()
    rotateCoins()
    frameCount += 1;

    console.log(score);
    // Tried to put the score on canvas -- not working
    // let canvas = document.querySelector('#canvas');
    // canvas.innerHTML += `
    // something `;

    scene.render();
})