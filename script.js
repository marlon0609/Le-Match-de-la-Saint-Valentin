const startButton = document.getElementById('startGame');
const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');

let score = 0;
let gameInterval;

// Start the game
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    gameArea.style.display = 'block';
    score = 0;
    scoreDisplay.textContent = `Score : ${score}`;

    // Start moving the target
    gameInterval = setInterval(moveTarget, 1000);
});

// Move the target to a random position
function moveTarget() {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 150);
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

// Increment score on target click
target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score : ${score}`;
});

// End the game after 30 seconds
setTimeout(() => {
    clearInterval(gameInterval);
    alert(`Temps écoulé ! Votre score est de : ${score}`);
    gameArea.style.display = 'none';
    startButton.style.display = 'block';
}, 30000);
