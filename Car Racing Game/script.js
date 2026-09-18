const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const finalScoreElement = document.getElementById('final-score');

// Game State
let isGameRunning = false;
let score = 0;
let animationId;
let gameSpeed = 5;

// Player Car
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 100,
    width: 50,
    height: 80,
    speed: 5,
    dx: 0,
    dy: 0,
    color: '#3498db'
};

// Opponents
let obstacles = [];
const obstacleColors = ['#e74c3c', '#9b59b6', '#f1c40f', '#e67e22', '#2ecc71'];

function generateObstacle() {
    // Generate a new obstacle
    const width = 50;
    const height = 80;
    const x = Math.random() * (canvas.width - width);
    const y = -height;
    const color = obstacleColors[Math.floor(Math.random() * obstacleColors.length)];
    const speed = gameSpeed - 2 + Math.random() * 4; // Varying speeds around base game speed

    obstacles.push({ x, y, width, height, color, speed });
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function endGame() {
    isGameRunning = false;
    cancelAnimationFrame(animationId);
    gameOverScreen.classList.remove('hidden');
    finalScoreElement.innerText = Math.floor(score / 10);
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        obs.y += obs.speed;

        // Check for collision with player
        if (checkCollision(player, obs)) {
            endGame();
            return;
        }

        // Draw obstacle (opponent car)
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        // Roof
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(obs.x + 10, obs.y + 20, obs.width - 20, obs.height - 40);

        // Wheels
        ctx.fillStyle = '#333';
        ctx.fillRect(obs.x - 5, obs.y + 10, 5, 15);
        ctx.fillRect(obs.x + obs.width, obs.y + 10, 5, 15);
        ctx.fillRect(obs.x - 5, obs.y + obs.height - 25, 5, 15);
        ctx.fillRect(obs.x + obs.width, obs.y + obs.height - 25, 5, 15);

        // Remove obstacles that are off screen
        if (obs.y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

// Controls
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false
};

// Event Listeners for Controls
document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
    }
});

// Update Player Position
function updatePlayer() {
    if (keys.ArrowLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (keys.ArrowUp && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
}

// Draw Player Car
function drawPlayer() {
    ctx.fillStyle = player.color;
    // Draw main body
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // Draw roof
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(player.x + 10, player.y + 20, player.width - 20, player.height - 40);

    // Draw wheels
    ctx.fillStyle = '#333';
    ctx.fillRect(player.x - 5, player.y + 10, 5, 15); // Top left
    ctx.fillRect(player.x + player.width, player.y + 10, 5, 15); // Top right
    ctx.fillRect(player.x - 5, player.y + player.height - 25, 5, 15); // Bottom left
    ctx.fillRect(player.x + player.width, player.y + player.height - 25, 5, 15); // Bottom right
}

// Draw Road Lines
let roadOffset = 0;
function drawRoad() {
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center dashed line
    ctx.strokeStyle = '#ecf0f1';
    ctx.lineWidth = 5;
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, -20 + roadOffset);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Update road offset for animation
    roadOffset += gameSpeed;
    if (roadOffset >= 40) {
        roadOffset = 0;
    }
}

// Main Game Loop
function gameLoop() {
    if (!isGameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();
    updatePlayer();
    drawPlayer();

    // Spawn new obstacles randomly
    if (Math.random() < 0.02) {
        generateObstacle();
    }

    updateObstacles();

    // Increment score over time simply for now
    score += 1;
    scoreElement.innerText = Math.floor(score / 10);

    animationId = requestAnimationFrame(gameLoop);
}

// Start Game Logic
function startGame() {
    isGameRunning = true;
    score = 0;
    scoreElement.innerText = score;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Reset game state
    obstacles = [];
    player.x = canvas.width / 2 - 25;
    player.y = canvas.height - 100;

    gameLoop();
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// Initial Draw (just background)
drawRoad();
