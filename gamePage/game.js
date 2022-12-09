// import setHighScore from '../loginPage/login.js';
let loggedInUser = localStorage.getItem('loggedInUser');

function logOut() {
    localStorage.removeItem('loggedInUser');
}

function updateNavigationBar() {
    if(loggedInUser) {
        let signIn = document.getElementById('signIn');
        signIn.textContent = 'Sign out';
        signIn.onclick = logOut;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    updateNavigationBar();
});


let canvas = this.document.getElementById('canvas');

window.onload = function() {
    canvas.focus();
}

let scoreElement = this.document.getElementById('score');
let engine = new BABYLON.Engine(canvas, true);

// Materials for coins

const TEXTURE_FLOOR = "textures/floor_bump.png";

// This creates a basic Babylon Scene object (non-mesh)
let scene = new BABYLON.Scene(engine);

// This should help with the loading
scene.getAnimationRatio();

// scene.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5);
let score = 0;
let boxSpawnDistance = 40;
let displayedBoxes = [];
let displayedCoins = [];

let forwardMovementSpeed = 0.1;
let horizontalMovementSpeed = 1;
let frameCount = 0;
let boxNumber = 0;
let boxSize = 0.6;
let coinSize = 0.2;
let boxGenerationRate = 0.3;
let coinGenerationRate = 0.4;
let coinRotationSpeed = 0.1;
let defaultCameraZRotation = 0;
let defaultPlayerZRotation = -30;
let tilt = 3;
let playerTilt = 20;
let gameOverDelay = 1000;
let pointsPerFrame = 1;
let pointsPerCoin = 3000;

let coinEffect = new BABYLON.Sound("coin", "sounds/coin.ogg", scene);
let boxEffect = new BABYLON.Sound("box", "sounds/box.ogg", scene);

// helpers
function degreesToRadians(degrees) {
    return degrees / 360 * 2 * 3.141592
}

function unmuteAudio() {
    BABYLON.Engine.audioEngine.unlock();
}

function makeCoinMesh() {
    const mat = new BABYLON.PBRMaterial("material", scene);
    mat.metallic = 1.0;
    mat.roughness = 0.4;
    mat.forceIrradianceInFragment = true;
    mat.albedoColor = new BABYLON.Color3(1.000, 0.766, 0.336);
    mat.bumpTexture = new BABYLON.Texture(TEXTURE_FLOOR, scene);

    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0, 1.00, 1);
    faceUV[1] =	new BABYLON.Vector4(1, 0, 0.32, 1);
    faceUV[2] = new BABYLON.Vector4(0, 0, 1.00, 1);

    mesh = BABYLON.MeshBuilder.CreateCylinder("cylinder", {height:0.03, diameter:0.5, faceUV: faceUV}, scene);
    mesh.material = mat;

    displayedCoins.push(mesh);
    return mesh;
};


function createBox(red, green, blue, xPosition, zPosition) {
    let boxName = "box" + boxNumber;
    let box = BABYLON.MeshBuilder.CreateBox(boxName, {size: boxSize}, scene);
    box.position.x = xPosition;
    box.position.z = zPosition;
    box.position.y = 0;

    let diffuseMultiplier = 0.8
    let specularMultiplier = 0.6
    let ambientMultiplier = 0.6


    let materialName = "boxMaterial" + boxNumber;
    let material = new BABYLON.StandardMaterial(materialName, scene);
    material.diffuseColor = new BABYLON.Color3(red * diffuseMultiplier, green * diffuseMultiplier, blue * diffuseMultiplier);
    material.specularColor = new BABYLON.Color3(red * specularMultiplier, green * specularMultiplier, blue * specularMultiplier);
    material.ambientColor = new BABYLON.Color3(red * ambientMultiplier, green * ambientMultiplier, blue * ambientMultiplier);
    box.material = material;

    boxNumber += 1;
    displayedBoxes.push(box);
}

function getRandomElement(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function createRandomBox() {
    let colorPossibilities = [0.5, 0.7, 1];
    let positionPossibilities = [-15, -12.5, -10, -7.5, -5, -2.5, 0, 2.5, 5, 7.5, 10, 12.5, 15];

    let randomRed = getRandomElement(colorPossibilities);
    let randomGreen = getRandomElement(colorPossibilities);
    let randomBlue = getRandomElement(colorPossibilities);

    let randomX = getRandomElement(positionPossibilities) + player.position.x;
    let Zposition = player.position.z + boxSpawnDistance;
    createBox(randomRed, randomGreen, randomBlue, randomX, Zposition);
}

function createRandomCoin() {
    let coin = makeCoinMesh();
    let positionPossibilities = [-17, -11, -7, 2, 7, 11, 17];
    let randomX = getRandomElement(positionPossibilities) + player.position.x;
    let randomZ = player.position.z + boxSpawnDistance;
    coin.position.x = randomX;
    coin.position.z = randomZ;
    coin.position.y = 0.2;
    coin.rotation.x = degreesToRadians(90);
}

// Set the color of the background to white
scene.clearColor = new BABYLON.Color3(1, 1, 1);

// This creates and positions a free camera (non-mesh)
let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -50), scene);
camera.rotation.x = degreesToRadians(-20);
camera.inputs.clear();

// This targets the camera to scene origin
camera.setTarget(BABYLON.Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 20, -50), scene);

// var  anotherLight = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-200, -10, 200), scene);
// anotherLight.position = new BABYLON.Vector3(0, 150, -250);
// anotherLight.intensity = 3;	

// Default intensity is 1.
light.intensity = 0.8;

// Creating an arrow
const player = BABYLON.MeshBuilder.CreateDisc("disc", {radius: 0.25, tessellation: 3});
player.position.z = -47;
player.position.y = 0;
player.rotation.z = degreesToRadians(defaultPlayerZRotation);
player.rotation.x = degreesToRadians(90);

window.addEventListener("resize", function () {
    engine.resize();
});

function movePlayerAndCamera(x,z) {
    player.position.x += x;
    player.position.z += z;
    

    camera.position.x += x;
    camera.position.z += z;
}

function rotateRight() {
    player.rotation.z = degreesToRadians(defaultPlayerZRotation - playerTilt);
    camera.rotation.z = degreesToRadians(defaultCameraZRotation + tilt);
}

function rotateLeft() {
    player.rotation.z = degreesToRadians(defaultPlayerZRotation + playerTilt);
    camera.rotation.z = degreesToRadians(defaultCameraZRotation - tilt);
}

function resetRotation() {
    player.rotation.z = degreesToRadians(defaultPlayerZRotation);
    camera.rotation.z = degreesToRadians(defaultCameraZRotation);
}

scene.onKeyboardObservable.add(function(eventData) {
    if (eventData.type == BABYLON.KeyboardEventTypes.KEYDOWN) {

        switch (eventData.event.key) {
            case "ArrowLeft":
                rotateLeft();
                movePlayerAndCamera(-horizontalMovementSpeed, 0);
                break;
            case "ArrowRight":
                rotateRight();
                movePlayerAndCamera(horizontalMovementSpeed, 0);
                break;
        }
        // Unmuting the sound when the user interacts with the game
        unmuteAudio();
    }

    if (eventData.type == BABYLON.KeyboardEventTypes.KEYUP) {
        switch (eventData.event.key) {
            case "ArrowLeft":
                resetRotation();
                break;
            case "ArrowRight":
                resetRotation();
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
            let index = displayedCoins.indexOf(coin);
            if (index > -1) { // only splice array when item is found
                displayedCoins.splice(index, 1);
                coin.dispose();
            }
        }
    }
    if (intersects) {
        player.material = lightMaterial;
        coinEffect.play();
        score += pointsPerCoin;
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
                box.dispose();
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
                coin.dispose();
            }
        }
    }
}

function updatesHighScore() {
    const userLocalStorageKey = "users_key";
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
    window.location.href='../gamePage/gamePage.php';
}

function gameOver() {
    engine.stopRenderLoop();

    setTimeout(function() {
        let canvas = document.querySelector('.main-page-wrap');
        canvas.innerHTML = `
        <div id="canvas">
            <div style="position: relative; z-index: 1; margin-left: 50%; margin-bottom: 40px; box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; transform: translate(-50%); margin-top: 30px; margin-bottom: 10px; background-color: white; opacity: 0.8; border-radius: 10px; width: 20%; font-size: 50px; border: 3px solid black; padding: 10px; text-align: center;"> Game over, ${loggedInUser}! <br> Your score is: ${score}</div>
            <button id="play-again-button" style="cursor: pointer; background-color: #adb5bd; box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; font-weight: bold; width: 20%; margin-left: 50%; margin-top: 30px; transform: translate(-50%); border: 3px solid black; padding: 10px; text-align: center; border-radius: 10px;"> Play again! </button>
        </div>
        `;

        let btn = document.getElementById("play-again-button");
        btn.addEventListener('click', event => {
            clickOnPlayAgain();
        });
        updatesHighScore();
    }, gameOverDelay);

}


function rotateCoins() {
    for (let coin of displayedCoins) {
        coin.rotation.y += coinRotationSpeed;
    }
}

function checkDifficulty() {
    let timePassed = getFrameTime();
    if (timePassed > 120) {
        forwardMovementSpeed = 0.5;
        pointsPerCoin = 5000;
        boxGenerationRate = 0.10;
    } else if (timePassed > 90) {
        forwardMovementSpeed = 0.4;
        pointsPerCoin = 4000;
        boxGenerationRate = 0.13;
    } else if (timePassed > 60) {
        forwardMovementSpeed = 0.3;
        pointsPerCoin = 3000;
        boxGenerationRate = 0.17;
    } else if (timePassed > 30) {
        forwardMovementSpeed = 0.2;
        pointsPerCoin = 2000;
        boxGenerationRate = 0.20;
    }
}

// render once to stop intersection bug
scene.render();

// create initial box in center
createBox(1,0.5,0.5,0,0);

engine.runRenderLoop(function() {
    updatePlayerPosition()
    let secondsPassed = getFrameTime();
    if (Math.floor(frameCount % (boxGenerationRate * 60)) == 0 && secondsPassed > 1) {
        createRandomBox();
    }
    
    if (Math.floor(frameCount % (coinGenerationRate * 60)) == 0 && secondsPassed > 1) {
        createRandomCoin();
    }
    
    if (checkIntersections()) {
        boxEffect.play();
        gameOver();
    }
    checkCoinsIntersections()
    filterPassedBoxes()
    filterPassedCoins()
    rotateCoins()
    checkDifficulty()
    score += pointsPerFrame;
    frameCount += 1;

    scoreElement.innerHTML = `Score: ${score}`;
    scene.render();
})