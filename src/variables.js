
const allRegions = document.querySelectorAll(
    ".cursor-pointer"
);

let setStart = document.getElementById("set-start");
let btnClose = document
    .getElementById("btn-close-start")
    .addEventListener(
        "click",
        () => (myModal.style.display = "none")
    );

const startBtn = document.getElementById("start-btn");

let playAgainBtn = document.getElementById("play-again");

let player1Title = document.getElementById("player1-title");
let player2Title = document.getElementById("player2-title");

let player1wins = document.getElementById("player1-wins");
let player1losses = document.getElementById(
    "player1-losses"
);
let player2wins = document.getElementById("player2-wins");
let player2losses = document.getElementById(
    "player2-losses"
);

let player1 = document.getElementById("player1").value;
let player2 = document.getElementById("player2").value;

let firstPlayer = document.getElementById("first-player");
let secondPlayer = document.getElementById("second-player");

const warning = document.getElementById("warning-box");
const btnCloseWarning = document
.getElementById("btn-close-warning")

const btnResetGame = document
.getElementById("reset-game")

export {
    allRegions,
    startBtn,
    btnClose,
    player2losses,
    player1wins,
    player2Title,
    playAgainBtn,
    setStart,
    player1Title,
    player1losses,
    player1,
    player2,
    player2wins,
    firstPlayer,
    secondPlayer,
    warning,
    btnCloseWarning,
    btnResetGame
};
