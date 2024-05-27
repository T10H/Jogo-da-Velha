document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.getElementById('resetButton');
  const message = document.getElementById('message');
  let isXTurn = true;
  let gameActive = true;
  let gameState = Array(9).fill(null);

  const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

      if (gameState[clickedCellIndex] !== null || !gameActive) {
          return;
      }

      gameState[clickedCellIndex] = isXTurn ? 'X' : 'O';
      clickedCell.textContent = gameState[clickedCellIndex];

      if (checkWin()) {
          message.textContent = `Jogador ${isXTurn ? 'X' : 'O'} venceu!`;
          gameActive = false;
      } else if (!gameState.includes(null)) {
          message.textContent = 'Empate!';
          gameActive = false;
      } else {
          isXTurn = !isXTurn;
          message.textContent = `Vez do Jogador ${isXTurn ? 'X' : 'O'}`;
      }
  }

  function checkWin() {
      return winningCombinations.some(combination => {
          return combination.every(index => {
              return gameState[index] !== null && gameState[index] === gameState[combination[0]];
          });
      });
  }

  function resetGame() {
      gameState = Array(9).fill(null);
      isXTurn = true;
      gameActive = true;
      cells.forEach(cell => cell.textContent = '');
      message.textContent = 'Vez do Jogador X';
  }

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);

  resetGame();
});
