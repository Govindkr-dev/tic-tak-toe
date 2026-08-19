let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetbtn");
let msgContainer = document.querySelector(".msg-container");
let newbtn = document.querySelector("#new");
let msg = document.querySelector("#msg");

let turn = true;
let gameOver = false;

let winning = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


/* =========================
   BOX CLICK
========================= */

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        // Stop if game is over
        if (gameOver) return;

        // X turn
        if (turn) {
            box.innerText = "X";
            turn = false;
        }

        // O turn
        else {
            box.innerText = "O";
            turn = true;
        }

        // Disable clicked box
        box.disabled = true;

        // Check winner
        checkWinner();
    });

});


/* =========================
   SHOW WINNER
========================= */

const showWinner = (winner) => {

    msg.innerText = `Congratulations! Winner is ${winner}`;

    msgContainer.classList.remove("hide");

    gameOver = true;
};


/* =========================
   SHOW DRAW
========================= */

const showDraw = () => {

    msg.innerText = "Game Draw!";

    msgContainer.classList.remove("hide");

    gameOver = true;
};


/* =========================
   CHECK WINNER
========================= */

const checkWinner = () => {

    for (let pattern of winning) {

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        // Make sure all 3 boxes are filled
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {

            // Check same value
            if (pos1 === pos2 && pos2 === pos3) {

                showWinner(pos1);

                return;
            }
        }
    }

    // Check for draw
    let allFilled = true;

    boxes.forEach((box) => {

        if (box.innerText === "") {
            allFilled = false;
        }

    });

    if (allFilled) {
        showDraw();
    }
};


/* =========================
   RESET GAME
========================= */

const resetGame = () => {

    turn = true;
    gameOver = false;

    boxes.forEach((box) => {

        box.innerText = "";

        box.disabled = false;

    });

    msgContainer.classList.add("hide");
};


/* =========================
   RESET BUTTON
========================= */

reset.addEventListener("click", resetGame);


/* =========================
   NEW GAME BUTTON
========================= */

newbtn.addEventListener("click", resetGame);