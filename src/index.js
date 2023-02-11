import {
    allRegions,
    startBtn,
    player2losses,
    player1wins,
    player2wins,
    player2Title,
    playAgainBtn,
    setStart,
    player1Title,
    player1losses,
    firstPlayer,
    secondPlayer,
    warning,
    btnCloseWarning,
    btnResetGame,
} from "./variables.js";

import {
    player1Wins,
    player2Wins,
    setImages,
} from "./functions.js";

let startedGame = false;

let [player1won, player1lost, player2won, player2lost] = [
    0, 0, 0, 0,
];

let playerInput;
let vBoard = [];

firstPlayer.addEventListener("click", () => {
    playerInput = "player1";
    setStart.style.display = "none";
    allRegions.forEach((region) => {
        region.classList.add("cursor-pointer");
        region.classList.remove("cursor-default");
        region.addEventListener(
            "click",
            handleBoardRegions
        );
    });
});

secondPlayer.addEventListener("click", () => {
    playerInput = "player2";
    setStart.style.display = "none";
    allRegions.forEach((region) => {
        region.classList.add("cursor-pointer");
        region.classList.remove("cursor-default");
        region.addEventListener(
            "click",
            handleBoardRegions
        );
    });
});

const setNames = () => {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;

    if (playerInput == "player1") {
        player1Title.innerText = `It's your turn, ${player1}!`;
        player2Title.innerText = `Wait a minute, ${player2}.`;
    } else {
        player1Title.innerText = `Wait a minute, ${player1}.`;
        player2Title.innerText = `It's your turn, ${player2}!`;
    }
    startedGame = true;
    playAgainBtn.removeEventListener("click", playAgain);

    allRegions.forEach((region) => {
        region.classList.add("cursor-pointer");
        region.classList.remove("cursor-default");
        region.addEventListener(
            "click",
            handleBoardRegions
        );
    });
};

const updateTitle = () => {
    setNames();
    document.getElementById("start-btn").innerHTML =
        "Started!";
};

const startGame = () => {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;

    if (!player1 || !player2) {
        warning.style.display = "block";
        return;
    }

    if (startedGame) {
        return;
    }

    vBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    setStart.style.display = "block";
    setStart.addEventListener("click", () => {
        setStart.style.display = "none";
        setNames();
    });
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

const playersScore = () => {
    if (playerInput == "player1") {
        player1won++;
        player2lost++;
        player1Wins();
    } else {
        player2won++;
        player1lost++;
        player2Wins();
    }

    [player1wins.innerText, player1losses.innerText] = [
        player1won,
        player1lost,
    ];
    [player2wins.innerText, player2losses.innerText] = [
        player2won,
        player2lost,
    ];
};

const handleWin = (regions) => {
    regions.forEach((region) => {
        document
            .querySelector(
                "[data-region=" + '"' + region + '"]'
            )
            .classList.add("win");
    });

    playersScore();

    allRegions.forEach((region) => {
        region.removeEventListener(
            "click",
            handleBoardRegions
        ),
            region.classList.remove("cursor-pointer");
    });
    playAgainBtn.addEventListener("click", playAgain);
};

const handleDraw = () => {
    allRegions.forEach((region) => {
        region.removeEventListener(
            "click",
            handleBoardRegions
        ),
            region.classList.remove("cursor-pointer"),
            region.classList.add("draw");
    });

    [player1Title.innerText, player2Title.innerText] = [
        `It's a draw!`,
        `It's a draw!`,
    ];

    playAgainBtn.addEventListener("click", playAgain);
};

const disableRegion = (span) => {
    span.removeEventListener("click", handleBoardRegions);
    span.classList.remove("cursor-pointer");
    span.classList.add("cursor-default");
};

const handleBoardRegions = (ev) => {
    const span = ev.target;
    const region = span.dataset.region;
    const rowColumnPair = region.split(".");
    const row = rowColumnPair[0];
    const column = rowColumnPair[1];

    if (playerInput == "player1") {
        vBoard[row][column] = "X";
        span.innerText = "X";
    } else {
        vBoard[row][column] = "O";
        span.innerText = "O";
    }

    disableRegion(span);
    const winRegions = getWinRegions();

    if (winRegions.length > 0) {
        handleWin(winRegions);
    } else if (vBoard.flat().includes("")) {
        if (playerInput == "player1") {
            playerInput = "player2";
        } else {
            playerInput = "player1";
        }
        updateTitle();
    } else {
        handleDraw();
    }
};

startBtn.addEventListener("click", startGame);

const playAgain = () => {
    {
        vBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];

        allRegions.forEach((region) => {
            region.classList.add("cursor-pointer");
            region.classList.remove(
                "draw",
                "win",
                "cursor-default"
            );
            region.innerText = "";
        });

        let player1 =
            document.getElementById("player1").value;
        let player2 =
            document.getElementById("player2").value;

        player1Title.innerText = `${player1}, you play with X`;
        player2Title.innerText = `${player2}, you play with O`;

        setImages();

        setStart.style.display = "block";
        setStart.addEventListener("click", setNames);
    }
};

btnResetGame.addEventListener("click", () => {
    location.reload();
});

btnCloseWarning.addEventListener(
    "click",
    () => (warning.style.display = "none")
);
