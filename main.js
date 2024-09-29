const huPlayer = "O";
const aiPlayer = "X";
let turn = true;
let gameActive = true;
let cells = document.querySelectorAll(".cell");

function checkWinner() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (let combo of winCombos) {
        if (
            cells[combo[0]].innerText !== '' &&
            cells[combo[0]].innerText === cells[combo[1]].innerText &&
            cells[combo[1]].innerText === cells[combo[2]].innerText
        ) {
            return cells[combo[0]].innerText;
        }
    }
    return null;
}

function restartGame() {
    console.log("Button a basildi.. Oyun yeniden baslatiliyor.");
    cells.forEach(function (cell) {
        cell.innerText = '';
        cell.style.color = '';
    });
    turn = true;
    gameActive = true;
}

function endGame(result) {
    gameActive = false;
    if (result === 'berabere') {
        console.log('Oyun berabere bitti');
        alert('Oyun berabere bitti!');
    } else {
        console.log('Oyun bitti! Kazanan:', result);
        alert(`Oyunu ${result} kazandı!`);
    }
}

function play(e) {
    if (!gameActive || e.target.innerText !== '') {
        return;
    }
    
    const currentPlayer = turn ? "X" : "O";
    e.target.innerText = currentPlayer;
    e.target.style.color = turn ? "fe8b09" : "";

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        setTimeout(() => endGame(winner), 50); 
        return;
    }

    if ([...cells].every(cell => cell.innerText !== '')) {
        gameActive = false;
        setTimeout(() => endGame('berabere'), 50);
        return;
    }

    turn = !turn;
}

cells.forEach(function (value) {
    value.addEventListener('click', play);
});

document.getElementById('replay').addEventListener('click', restartGame);


document.getElementById('replay').removeAttribute('disabled');
