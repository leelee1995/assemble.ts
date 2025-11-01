// ... (Place this inside the <script> tag in the HTML)

const gameGrid = document.getElementById("game-grid");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const gameMessage = document.getElementById("game-message");

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

// 1. Setup the 9 game holes
for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.className = "game-hole";
    hole.dataset.id = i;
    hole.innerHTML = '<div class="game-item" id="item-' + i + '"></div>';

    // Add click listener for 'whacking'
    hole.addEventListener("click", whack);
    gameGrid.appendChild(hole);
}

const gameItems = document.querySelectorAll(".game-item");

function randomPopUp() {
    // Hide all items
    gameItems.forEach((item) => item.classList.remove("up"));

    // Select a random item to show
    const randomIndex = Math.floor(Math.random() * 9);
    const randomItem = gameItems[randomIndex];
    randomItem.classList.add("up");
    randomItem.dataset.isUp = "true"; // Mark it as being up

    // Clear the mark after the pop-up duration for safety
    setTimeout(() => {
        randomItem.dataset.isUp = "false";
    }, 500); // Should be less than the game interval
}

function whack(event) {
    const item = event.currentTarget.querySelector(".game-item");

    if (item.classList.contains("up") && item.dataset.isUp === "true") {
        score++;
        scoreDisplay.textContent = score;
        item.classList.remove("up");
        item.dataset.isUp = "false"; // Ensure it can't be whacked again instantly
    }
}

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    startButton.textContent = "Game Running...";
    startButton.disabled = true;
    gameMessage.classList.add("hidden");

    // Start the game logic (moles popping up)
    gameInterval = setInterval(randomPopUp, 750); // Moles pop every 0.75 seconds

    // Start the timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            gameItems.forEach((item) => item.classList.remove("up")); // Hide all
            startButton.textContent = "RESTART GAME";
            startButton.disabled = false;
            gameMessage.textContent = "Time's Up! Final Score: " + score;
            gameMessage.classList.remove("hidden");
        }
    }, 1000); // Update every 1 second
}

// Start the game when the button is clicked
startButton.addEventListener("click", startGame);

// Initialize all items as 'down'
gameItems.forEach((item) => (item.dataset.isUp = "false"));
