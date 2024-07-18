const X_CLASS = 'x';
const O_CLASS = 'o';
let userName1 = "";
let userName2 = "";
let current=X_CLASS;
let currentPlayerClass = userName1;
const board = document.getElementById('board');
const statusMessage=document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const cellElements = document.querySelectorAll('.cell');
let gameActive = true;
document.querySelector(".container").style.display = "none";


let PLAYBTN = document.querySelector(".userInformationPage #play");

PLAYBTN.addEventListener("click", function () {
  userName1 = document.querySelector("#name1").value;
  userName2 = document.querySelector("#name2").value;
  if (userName1.length == 0 || userName2.length == 0) {
    swal("ERROR", "Please fill Every Details", "error");
  } else{
        document.querySelector(".container").style.display = "block";
        document.querySelector(".userInformationPage").style.display = "none";
    }
});

function handleCellClick(e) {
    const cell = e.target;
    const currentClass = current;
    if (!gameActive || cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
        return;
    }
    cell.classList.add(currentClass);
    cell.innerText = current.toUpperCase();
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        statusMessage.innerText = 'Draw!';
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleCellClick);
        });
        swal('Draw, Please restart game');
    } else {
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleCellClick);
        });
        
        statusMessage.innerText = `${currentPlayerClass.toUpperCase()} Wins!`;
        swal(` Congratulations ${currentPlayerClass.toUpperCase()} Win`);
    }
    gameActive = false;
}


function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function swapTurns() {
    currentPlayerClass = currentPlayerClass === userName1 ? userName2 : userName1;
    current = current === X_CLASS? O_CLASS : X_CLASS; 
    statusMessage.innerText = `${currentPlayerClass.toUpperCase()}'s turn`;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    board.classList.add(current);
}

function checkWin(currentClass) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.innerText = '';
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    setBoardHoverClass();
    statusMessage.innerText = `${currentPlayerClass.toUpperCase()}'s turn`;
    gameActive = true;
}

restartButton.addEventListener('click', startGame);

startGame();




