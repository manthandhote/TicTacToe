const gameContainer = document.getElementById("game");
    const statusText = document.getElementById("status");
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];

    function createBoard() {
      gameContainer.innerHTML = "";
      board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", index);
        cell.addEventListener("click", handleClick);
        gameContainer.appendChild(cell);
      });
      updateStatus();
    }

    function handleClick(e) {
      const index = e.target.getAttribute("data-index");
      if (!gameActive || board[index] !== "") return;

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatus();
    }

    function checkWin() {
      return winningCombos.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
      });
    }

    function updateStatus() {
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function restartGame() {
      currentPlayer = "X";
      board = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      createBoard();
    }

    createBoard();