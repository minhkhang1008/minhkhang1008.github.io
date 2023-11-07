document.getElementById('replayButton').addEventListener('click', function() {
    // Load the game time and score from local storage
    gameTime = localStorage.getItem('gameTime');
    score = localStorage.getItem('score');
  
    // Reset the game state
    carX = canvasWidth / 2 - carWidth / 2;
    obstacles = [];
    isGameOver = false;
  
    score = 0;
    obstacleSpeed = 10; // Reset the obstacle speed
  
    // Start the game loop again
    updateGameArea();
  });
  