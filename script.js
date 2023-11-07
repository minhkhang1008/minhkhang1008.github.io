const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 960;
const canvasHeight = 600;
const carWidth = 50;
const carHeight = 80;
const obstacleWidth = 50;
const obstacleHeight = 50;

let carX = canvasWidth / 2 - carWidth / 2;
const carY = canvasHeight - carHeight - 10;
const carSpeed = 5;
const obstacleSpeed = 10;
let obstacleX = Math.random() * (canvasWidth - obstacleWidth);
let obstacleY = -obstacleHeight;
const maxObstacles = 5;
let obstacles = [];
const scorePerSecond = 1; // Score counted per second
let score = 0;
let isGameOver = false;
let gameTime = 0; // Variable to track game time in seconds

const carImage = new Image();
carImage.src = 'myCar.png';

const backgroundImage = new Image();
backgroundImage.src = 'background.jpg';

const obstacleImages = [
    'obstacle1.png',
    'obstacle2.png',
    'obstacle3.png',
    'obstacle4.png',
    'obstacle5.png'
];
let isMousePressed = false;

canvas.addEventListener('mousedown', function(event) {
    isMousePressed = true;
    
    document.addEventListener('mousemove', onMouseMove);
    
    document.addEventListener('mouseup', function() {
        isMousePressed = false;
        document.removeEventListener('mousemove', onMouseMove);
    });
});

function onMouseMove(event) {
    if (isMousePressed) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        carX = mouseX - carWidth / 2;
        carY = mouseY - carHeight / 2;

        // Ensure the car stays within the canvas boundaries
        if (carX < 0) {
            carX = 0;
        }
        if (carX > canvasWidth - carWidth) {
            carX = canvasWidth - carWidth;
        }
        if (carY < 0) {
            carY = 0;
        }
        if (carY > canvasHeight - carHeight) {
            carY = canvasHeight - carHeight;
        }
    }
}

let isLeftArrowPressed = false;
let isRightArrowPressed = false;


document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        isLeftArrowPressed = true;
    }
    if (event.key === 'ArrowRight') {
        isRightArrowPressed = true;
    }

    
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft') {
        isLeftArrowPressed = false;
    }
    if (event.key === 'ArrowRight') {
        isRightArrowPressed = false;
    }
});

function updateCarPosition() {
    if (isLeftArrowPressed && carX > 0) {
        carX -= carSpeed;
    }
    if (isRightArrowPressed && carX < canvasWidth - carWidth) {
        carX += carSpeed;
    }
}


function drawCar() {
    ctx.drawImage(carImage, carX, carY, carWidth, carHeight);
}

function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    }
}

function updateGameArea() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

    drawCar();
    drawObstacles();

    if (!isGameOver) {
        gameTime++; // Increment game time in seconds
        score++
        localStorage.setItem('gameTime', gameTime);
        localStorage.setItem('score', score);

        if (obstacles.length < maxObstacles && Math.random() < 0.02) {
            const obstacle = {
                x: Math.random() * (canvasWidth - obstacleWidth),
                y: -obstacleHeight,
                image: new Image()
            };
            obstacle.image.src = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
            obstacles.push(obstacle);
        }

        for (let obstacle of obstacles) {
            obstacle.y += obstacleSpeed;
            if (
                carX < obstacle.x + obstacleWidth &&
                carX + carWidth > obstacle.x &&
                carY < obstacle.y + obstacleHeight &&
                carY + carHeight > obstacle.y
            ) {
                isGameOver = true;
            }
        }

        obstacles = obstacles.filter(obstacle => obstacle.y < canvasHeight);
        if (score === undefined) {
            score = 0;
          }
          score += scorePerSecond;
          score = Math.floor(gameTime * scorePerSecond / 100);
    } else {
        // Calculate text width for centering
        const text = `Bạn đã lái an toàn trong: ${score} giây`;
        const textWidth = ctx.measureText(text).width;
        const textX = 1080 / 2 - 720 / 2;

        // Draw centered text
        ctx.fillStyle = 'black';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over', canvasWidth / 2 - 120, canvasHeight / 2 - 50);
        ctx.fillText(`Bạn đã lái an toàn trong: ${score} giây`, textX, canvasHeight / 2 + 50);
    }


    
    requestAnimationFrame(updateGameArea);
}
updateGameArea();
setInterval(() => {
    updateCarPosition();
}, 10);


