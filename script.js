// we store our game status element here to allow us to more easily use it later on 
const statusDisplay = document.querySelector('.game_status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winingMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn=()=>`It's ${currentPlayer}'s turn`;


// we set the initial message to let the Player know whose turn it is

statusDisplay.innerHTML = currentPlayerTurn();

  //handle Cell Played
  function handleCellPlayed(clickedCell, clickedCellIndex) {
    //We update our inner game state to reflect the played move, as well as update the user interface to reflect the played move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
  }



  //HandlePlayerChange
  function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
  }



  //handleResultValidation
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusDisplay.innerHTML = winingMessage();
      gameActive = false;
      return;
    }

    //We will check weather there are any value in our game state array that are still nor populated with a player sign
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      return;
    }

    //If we get to here we know that the no one own the game yet, and that there are still moves to be played, so we continue by changing the current player.
    handlePlayerChange();
  }



  // handleCellClick
  function handleCellClick(clickedCellEvent) {
    // we will save the clicked html element in a variable for easier further use
    const clickedCell = clickedCellEvent.target;

    // Here we will grab the 'data-cell-index' attribute from thr clicked cell to identify where that cell is in our grid.
    // Please note that the getAttribute will return a string CSSMathValue. Since we need a actual number we will parse it to an integer(number)
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-cell-index")
    );

    // Next up we need to check weather the cell has already been played or if the game is paused.if either of those is true we will simply ignore the click.
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
    }

    // If everything is in order we will proceed with the game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }



  //handleRestartGame
  function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  }


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game_restart').addEventListener('click', handleRestartGame);










