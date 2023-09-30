const villainImages = [
   "./images/enchantress.png",
   "./images/hela.png",
   "./images/loki.png",
   "./images/mangog.png",
   "./images/melekith.png",
   "./images/surtur.png"
];


let currVillainTile;
let currWifeTile;
let score = 0;
let gameOver = false;
let timer; // Variable to store the timer
let timeLeft = 90; // Time left in seconds (1 minute and 30 seconds)

// Function to update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById("timer").innerText = `Time Remaining: ${formattedTime}`;
}


// Function to start the game
function startGame() {
    setGame();
    document.getElementById("startButton").style.display = "none"; // Hide the Start button
    document.getElementById("reset").style.display = "inline"; // Show the Reset button

    // Update the timer display every second
    updateTimerDisplay();
    timer = setInterval(() => {
        if (gameOver) {
            clearInterval(timer); // Stop the timer
            return;
        }

        timeLeft--;

        // Update the timer display
        updateTimerDisplay();

        if (timeLeft <= 0) {
            // Game over when time runs out
            gameOver = true;
            clearInterval(timer); // Stop the timer
            document.getElementById("score").innerText = "GAME OVER: " + score.toString(); // Update score HTML
        }
    }, 1000); // Update every 1 second

    // Create a new villain every 25 seconds
    setInterval(createVillain, 25000); // 25000 milliseconds = 25 seconds
}

// Function to restart the game
function restartGame() {
    // Clear the timer when restarting the game
    clearInterval(timer);

    // Clear the intervals for setVillain and setWife
    clearInterval(villainInterval);
    clearInterval(wifeInterval);

    // Reset game variables
    currVillainTile = undefined;
    currWifeTile = undefined;
    score = 0;
    gameOver = false;
    timeLeft = 90; // Reset the time to 1 minute and 30 seconds

    // Clear the board
    document.getElementById("board").innerHTML = "";

    // Reset the score and timer display
    document.getElementById("score").innerText = "Score: 0";
    updateTimerDisplay();

    // Start the game again
    startGame();
}


window.onload = function () {
    // Add a click event listener to the Start button
    document.getElementById("startButton").addEventListener("click", startGame);

    // Add a click event listener to the Reset button
    document.getElementById("reset").addEventListener("click", restartGame);
};





function setGame() {
    //set up the grid in html
    for (let i = 0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setVillain, 1000); // 1000 miliseconds = 1 second, every 1 second call setVillain
    setInterval(setWife, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setWife
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}
function getRandomImageSource() {
    // Generate a random index to select a random image source
    const randomIndex = Math.floor(Math.random() * villainImages.length);
    return villainImages[randomIndex];
}
function setVillain() {
    if (gameOver) {
        return;
    }
    if (currVillainTile) {
        currVillainTile.innerHTML = "";
    }
    
    const num = getRandomTile(); // Generate a random tile number
    let villain = document.createElement("img");
    villain.src = getRandomImageSource(); // Call the function to get a random image source
    currVillainTile = document.getElementById(num);
    currVillainTile.appendChild(villain);
}

function setWife() {
    if (gameOver) {
        return;
    }
    if (currWifeTile) {
        currWifeTile.innerHTML = "";
    }
    let Wife = document.createElement("img");
    Wife.src = "./images/sif.png";

    let num = getRandomTile();
    if (currVillainTile && currVillainTile.id == num) {
        return;
    }
    currWifeTile = document.getElementById(num);
    currWifeTile.appendChild( Wife);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currVillainTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score html
    }
    else if (this == currWifeTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //update score html
        gameOver = true;
    }
}