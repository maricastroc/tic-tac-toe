const mainContent = document.querySelector(".main-content");
const startContent = document.querySelector(
    ".start-content"
);

const allRegions = document.querySelectorAll(
    ".cursor-pointer"
);
const reloadBtn = document.getElementById("reload-btn");
const quitBtn = document.getElementById("quit-btn");
const nextRoundBtn = document.getElementById(
    "next-round-btn"
);

const restartBtn = document.getElementById("restart-btn");
const cancelBtn = document.getElementById("cancel-btn");

const currentPlayerIcon = document.getElementById(
    "current-player-icon"
);

const startBtn = document.getElementById("start-btn");
const startX = document.getElementById("start-x");
const startO = document.getElementById("start-o");

let winnerSubtitle = document.getElementById(
    "winner-subtitle"
);
let scoreLabelX = document.getElementById("score-label-X");
let scoreLabelO = document.getElementById("score-label-O");

let root = document.querySelector(":root");
let restartText = document.getElementById("restart-text");
let winnerPlayer = document.getElementById("winner-player");
let winnerText = document.getElementById("winner-text");
let winnerPlayerImg = document.getElementById(
    "winner-player-img"
);

let vBoard = [];
let player = "";
let scoreX = 0;
let scoreO = 0;
let scoreTies = 0;
let firstPlayer = "";
let gameStarted = false;

mainContent.classList.add("hide");
cancelBtn.classList.add("hide");
restartBtn.classList.add("hide");
restartText.classList.add("hide");
scoreLabelX.innerText = "";
scoreLabelO.innerText = "";

startX.addEventListener("click", () => {
    startO.style = "background-color: #b6cfd9";
    document.getElementById("start-o-img").src =
        "./assets/icon-o-dark.svg";

    startX.style = "background-color: #1f3640";
    document.getElementById("start-x-img").src =
        "./assets/icon-x-gray.svg";

    firstPlayer = "playerX";
    scoreLabelX.innerText = "PLAYER 1";
    scoreLabelO.innerText = "PLAYER 2";
    startBtn.addEventListener("click", startGame);
});

startO.addEventListener("click", () => {
    startX.style = "background-color: #b6cfd9";
    document.getElementById("start-x-img").src =
        "./assets/icon-x-dark.svg";
    startO.style = "background-color: #1f3640";
    document.getElementById("start-o-img").src =
        "./assets/icon-o-gray.svg";
    firstPlayer = "playerX";
    scoreLabelX.innerText = "PLAYER 2";
    scoreLabelO.innerText = "PLAYER 1";
    startBtn.addEventListener("click", startGame);
});

const restoreBoard = () => {
    gameStarted = false;
    let regions = [
        "0.0",
        "0.1",
        "0.2",
        "1.0",
        "1.1",
        "1.2",
        "2.0",
        "2.1",
        "2.2",
    ];
    for (let i = 0; i < regions.length; i++) {
        document.getElementById(
            `img-span-${regions[i]}`
        ).src = "";
    }

    startGame();
};

const startGame = () => {
    startContent.classList.add("hide");
    mainContent.classList.remove("hide");
    if (gameStarted) {
        return;
    }
    vBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    player = firstPlayer;
    if (firstPlayer === "playerX") {
        currentPlayerIcon.src = "./assets/icon-x-gray.svg";
    } else {
        currentPlayerIcon.src = "./assets/icon-o-gray.svg";
    }
    allRegions.forEach((region) => {
        region.addEventListener(
            "click",
            handleBoardRegions
        );
        region.classList.add("cursor-pointer");
    });

    gameStarted = true;
};

const getWinRegions = () => {
    const winRegions = [];
    if (
        vBoard[0][0] !== "" &&
        vBoard[0][0] === vBoard[0][1] &&
        vBoard[0][0] === vBoard[0][2]
    )
        winRegions.push("0.0", "0.1", "0.2");
    if (
        vBoard[1][0] &&
        vBoard[1][0] === vBoard[1][1] &&
        vBoard[1][0] === vBoard[1][2]
    )
        winRegions.push("1.0", "1.1", "1.2");
    if (
        vBoard[2][0] &&
        vBoard[2][0] === vBoard[2][1] &&
        vBoard[2][0] === vBoard[2][2]
    )
        winRegions.push("2.0", "2.1", "2.2");
    if (
        vBoard[0][0] &&
        vBoard[0][0] === vBoard[1][0] &&
        vBoard[0][0] === vBoard[2][0]
    )
        winRegions.push("0.0", "1.0", "2.0");
    if (
        vBoard[0][1] &&
        vBoard[0][1] === vBoard[1][1] &&
        vBoard[0][1] === vBoard[2][1]
    )
        winRegions.push("0.1", "1.1", "2.1");
    if (
        vBoard[0][2] &&
        vBoard[0][2] === vBoard[1][2] &&
        vBoard[0][2] === vBoard[2][2]
    )
        winRegions.push("0.2", "1.2", "2.2");
    if (
        vBoard[0][0] &&
        vBoard[0][0] === vBoard[1][1] &&
        vBoard[0][0] === vBoard[2][2]
    )
        winRegions.push("0.0", "1.1", "2.2");
    if (
        vBoard[0][2] &&
        vBoard[0][2] === vBoard[1][1] &&
        vBoard[0][2] === vBoard[2][0]
    )
        winRegions.push("0.2", "1.1", "2.0");
    return winRegions;
};

const disableRegion = (span) => {
    span.removeEventListener("click", handleBoardRegions);
    span.classList.remove("cursor-pointer");
};

const handleWin = () => {
    if (player === "playerX") {
        scoreX++;
        winnerSubtitle.innerText = "TAKES THE ROUND";
        winnerPlayer.innerText = "PLAYER X WINS!";
        winnerPlayerImg.src = "./assets/icon-x.svg";
        root.style.setProperty("--winner-color", "#31c4be");
    } else if (player === "playerO") {
        scoreO++;
        winnerSubtitle.innerText = "TAKES THE ROUND";
        winnerPlayer.innerText = "PLAYER O WINS!";
        winnerPlayerImg.src = "./assets/icon-o.svg";
        root.style.setProperty("--winner-color", "#f1b331");
    }
    document.getElementById("score-X").innerText = scoreX;
    document.getElementById("score-O").innerText = scoreO;

    firstPlayer === "playerX"
        ? (firstPlayer = "playerO")
        : (firstPlayer = "playerX");
};

const handleDraw = () => {
    scoreTies++;
    winnerPlayer.innerText = "";
    winnerPlayerImg.src = "";
    document.getElementById("score-ties").innerText =
        scoreTies;

    winnerSubtitle.innerText = "ROUND TIED!";

    root.style.setProperty("--winner-color", "#a8bfc8");

    firstPlayer === "playerX"
        ? (firstPlayer = "playerO")
        : (firstPlayer = "playerX");
};

const handleBoardRegions = (ev) => {
    startBtn.removeEventListener("click", startGame);
    const span = ev.target;
    const region = span.dataset.region;
    const rowColumnPair = region.split(".");
    const row = rowColumnPair[0];
    const column = rowColumnPair[1];

    if (player === "playerX") {
        currentPlayerIcon.src = "./assets/icon-o-gray.svg";
        vBoard[row][column] = "X";

        document.getElementById(`img-span-${region}`).src =
            "./assets/icon-x.svg";
    } else if (player === "playerO") {
        currentPlayerIcon.src = "./assets/icon-x-gray.svg";
        vBoard[row][column] = "O";
        document.getElementById(`img-span-${region}`).src =
            "./assets/icon-o.svg";
    }

    disableRegion(span);
    const winRegions = getWinRegions();

    if (winRegions.length > 0) {
        handleWin(winRegions);
        OpenBootstrapPopup();
    } else if (vBoard.flat().includes("")) {
        if (player == "playerX") {
            player = "playerO";
        } else {
            player = "playerX";
        }
    } else {
        handleDraw();
        OpenBootstrapPopup();
    }
};

nextRoundBtn.addEventListener("click", () => {
    restoreBoard();
    CloseBootstrapPopup();
});

reloadBtn.addEventListener("click", () => {
    root.style.setProperty("--winner-color", "#a8bfc8");
    restartText.classList.remove("hide");
    cancelBtn.classList.remove("hide");
    restartBtn.classList.remove("hide");
    OpenBootstrapPopup2();

    cancelBtn.addEventListener("click", () => {
        CloseBootstrapPopup2();
    });

    restartBtn.addEventListener("click", () => {
        location.reload();
    });
});

quitBtn.addEventListener("click", () => {
    location.reload();
});
