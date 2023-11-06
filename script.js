const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startGameButton = document.getElementById("startGame");
const newGameButton = document.getElementById("newGame");
const message = document.getElementById("message");

let currentPlayer = "X";
let player1Name = "Player 1";
let player2Name = "Player 2";
let gameActive = false;
const board = ["", "", "", "", "", "", "", "", ""];

document.getElementById("background-audio").play();

startGameButton.addEventListener("click", () => {
    if (player1Input.value !== "" && player2Input.value !== "") {
        player1Name = player1Input.value;
        player2Name = player2Input.value;
        player1Input.disabled = true;
        player2Input.disabled = true;
        startGameButton.disabled = true;
        gameActive = true;
        initializeBoard();
        message.textContent = `${player1Name}'s turn (X)`;
    } else {
        message.textContent = "Please enter both player names.";
    }
});

function initializeBoard() {
    const boardElements = document.querySelector(".board");
    boardElements.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => cellClick(cell, i));
        boardElements.appendChild(cell);
    }
    board.fill("");
}

function cellClick(cell, index) {
    if (!gameActive || cell.textContent !== "") {
        return;
    }

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    board[index] = currentPlayer;

    if (checkWin()) {
        const winnerMessage = document.createElement("div");
        winnerMessage.textContent = `${currentPlayer === "X" ? player1Name : player2Name} wins!`;
        winnerMessage.classList.add("winner");
        message.innerHTML = "";
        message.appendChild(winnerMessage);

        // Add a "New Game" button
        newGameButton.style.display = "block";
        newGameButton.addEventListener("click", startNewGame);

        gameActive = false;
    } else if (checkDraw()) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn (${currentPlayer})`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !board.includes("");
}

function startNewGame() {
    gameActive = true;
    player1Input.disabled = false;
    player2Input.disabled = false;
    startGameButton.disabled = false;
    player1Input.value = "";
    player2Input.value = "";
    currentPlayer = "X";
    board.fill("");
    message.textContent = "";
    newGameButton.style.display = "none"; // Hide the "New Game" button
    initializeBoard();
}
