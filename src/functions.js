import {
    player1Title,
    player2Title,
} from "./variables.js";

const player1Wins = () => {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    player1Title.innerText = `Yay, you won, ${player1}!`;
    player2Title.innerText = `Oh, you lost, ${player2}...`;
    document.getElementById(
        "player1-winner"
    ).style.display = "block";
    document.getElementById("player1-img").style.display =
        "none";
};

const player2Wins = () => {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    document.getElementById(
        "player2-winner"
    ).style.display = "block";
    document.getElementById("player2-img").style.display =
        "none";
    player1Title.innerText = `Oh, you lost, ${player1}...`;
    player2Title.innerText = `Yay, you won, ${player2}!`;
};

const setImages = () => {
    document.getElementById(
        "player1-img"
    ).style.display = "block";
    document.getElementById(
        "player2-img"
    ).style.display = "block";
    document.getElementById(
        "player1-winner"
    ).style.display = "none";
    document.getElementById(
        "player2-winner"
    ).style.display = "none";
}



export { player1Wins, player2Wins, setImages };
