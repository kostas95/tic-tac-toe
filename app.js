const symbolsA = document.querySelector('#symbolsA');
const symbolsB = document.querySelector('#symbolsB');
const form = document.querySelector('.players-info');
const cells = document.getElementsByClassName('grid-item');
const message = document.querySelector('.message-container');
const formContainer = document.getElementsByClassName('form-container')[0];
//grid cells, player1 name, player2 name
const scoreCells = document.getElementsByClassName('scoreboard-name'), 
inputNames = document.getElementsByClassName('inpt'), 
playerAName = inputNames[0].value, 
playerBName = inputNames[1].value;
//Give id to grid items-cells
for(i=0; i < 9; i++){
    cells[i].id = `${i}`
}

let symbolA, symbolB;
//stop game flag
let stopGame = 0;
//counter for a draw
let counterDraw = 0;
//grid
const grid = document.querySelector('.grid');
//player turn and arrays that will contain every move each player has made
let playerTurn = 0, 
playerOneMoves = [], 
playerTwoMoves= [];

// player points
let player1points = 0,
player2points = 0

//total scores cells
const player1TotalScoreCell = document.getElementsByClassName('total-score')[0], player2TotalScoreCell = document.getElementsByClassName('total-score')[1];

//Set initial score for each player
player1TotalScoreCell.innerText = player1points;
player2TotalScoreCell.innerText = player2points;

// replay button
replayBtn = document.querySelector('#replayBtn');
//reset button
resetBtn = document.querySelector('#resetBtn');

//hamburger button
hamBtn = document.querySelector('#hamBtn');

//container
cont = document.querySelector('.container');

// hamburger click count
let hamClickCnt = 0;

//counter of how many times replay has been clicked in order to determine who makes the first move
let clickNum = 0;


//Set new scoreboard cell if player1 wins
function createScoreCellP1(){
    const div = document.createElement('div');
    div.className = 'row'
    for(i=0; i<2;i++){
        const scoreCell = document.createElement('div')
        scoreCell.className = 'scoreboard-item';
        div.appendChild(scoreCell);
        document.querySelector('.scoreboard').appendChild(div)
        if(i===0){
            scoreCell.innerText = '1'
        }
        else{
            scoreCell.innerText = '0'
        }
    }
}
//Set new scoreboard cell if player2 wins
function createScoreCellP2(){
    const div = document.createElement('div');
    div.className = 'row';
    for(i=0; i<2;i++){
        const scoreCell = document.createElement('div')
        scoreCell.className = 'scoreboard-item';
        div.appendChild(scoreCell);
        document.querySelector('.scoreboard').appendChild(div)
        if(i===0){
            scoreCell.innerText = '0'
        }
        else{
            scoreCell.innerText = '1'
        }
    }
}
// Set bg colors if a 3 strike happens. Works for both players
function bgColorCellWin() {
    cells[i].style.transition = 'background 1s ease-in-out';
    if(cells[i].style.color === 'red'){
        cells[i].style.background = 'rgb(255, 242, 242)'
        if(i%2 !== 0){
            cells[i].style.background = 'rgb(255, 237, 237)'
        }
    }
    else if(cells[i].style.color === 'green'){
        cells[i].style.background = 'rgb(245, 255, 242)'
        if(i%2 !== 0){
            cells[i].style.background = 'rgb(235, 250, 230)'
        }
    }
}

function winCombinationsCheck(){
    //player1
    //Winning combinations: 0,1,2 & 0,4,8 & 0,3,6
    if(playerOneMoves.includes(0)){
        if(playerOneMoves.includes(1)){
            if(playerOneMoves.includes(2)){
                for(i=0; i<=2; i++){
                    bgColorCellWin()
                }
            }
        }
        if(playerOneMoves.includes(3)){
            if(playerOneMoves.includes(6)){
                for(i=0; i<=6; i+=3){
                    bgColorCellWin()
                }
            }
        }
        if(playerOneMoves.includes(4)){
            if(playerOneMoves.includes(8)){
                for(i=0; i<=8; i+=4){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 1,4,7
    if(playerOneMoves.includes(1)){
        if(playerOneMoves.includes(4)){
            if(playerOneMoves.includes(7)){
                for(i=1; i<=7; i+=3){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 2,5,8
    if(playerOneMoves.includes(2)){
        if(playerOneMoves.includes(5)){
            if(playerOneMoves.includes(8)){
                for(i=2; i<=8; i+=3){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 3,4,5
    if(playerOneMoves.includes(3)){
        if(playerOneMoves.includes(4)){
            if(playerOneMoves.includes(5)){
                for(i=3; i<=5; i+=1){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 2,4,6 & 6,7,8
    if(playerOneMoves.includes(6)){
        if(playerOneMoves.includes(4)){
            if(playerOneMoves.includes(2)){
                for(i=2; i<=6; i+=2){
                    bgColorCellWin()
                }
            }
        }
        if(playerOneMoves.includes(7)){
            if(playerOneMoves.includes(8)){
                for(i=6; i<=8; i+=1){
                    bgColorCellWin()
                }
            }
        }
    }
//player2
//Winning combinations: 0,1,2 & 0,4,8 & 0,3,6
    if(playerTwoMoves.includes(0)){
        if(playerTwoMoves.includes(1)){
            if(playerTwoMoves.includes(2)){
                for(i=0; i<=2; i++){
                    bgColorCellWin()
                }
            }
        }
        if(playerTwoMoves.includes(3)){
            if(playerTwoMoves.includes(6)){
                for(i=0; i<=6; i+=3){
                    bgColorCellWin()
                }
            }
        }
        if(playerTwoMoves.includes(4)){
            if(playerTwoMoves.includes(8)){
                for(i=0; i<=8; i+=4){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 1,4,7
    if(playerTwoMoves.includes(1)){
        if(playerTwoMoves.includes(4)){
            if(playerTwoMoves.includes(7)){
                for(i=1; i<=7; i+=3){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 2,5,8
    if(playerTwoMoves.includes(2)){
        if(playerTwoMoves.includes(5)){
            if(playerTwoMoves.includes(8)){
                for(i=2; i<=8; i+=3){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 3,4,5
    if(playerTwoMoves.includes(3)){
        if(playerTwoMoves.includes(4)){
            if(playerTwoMoves.includes(5)){
                for(i=3; i<=5; i+=1){
                    bgColorCellWin()
                }
            }
        }
    }
    //Winning combinations: 2,4,6 & 6,7,8
    if(playerTwoMoves.includes(6)){
        if(playerTwoMoves.includes(4)){
            if(playerTwoMoves.includes(2)){
                for(i=2; i<=6; i+=2){
                    bgColorCellWin()
                }
            }
        }
        if(playerTwoMoves.includes(7)){
            if(playerTwoMoves.includes(8)){
                for(i=6; i<=8; i+=1){
                    bgColorCellWin()
                }
            }
        }
    }
}

function createScoreCellDraw(){
    const div = document.createElement('div');
    div.className = 'row'
    for(i=0; i<2;i++){
        const scoreCell = document.createElement('div')
        scoreCell.className = 'scoreboard-item';
        div.appendChild(scoreCell);
        document.querySelector('.scoreboard').appendChild(div)
        scoreCell.innerText = '0.5'
    }
}


// Transition from info form to the game section when submission
form.addEventListener(
    'submit', function(e){
        if(symbolsA.value === symbolsB.value){
            alert("Must choose different symbols");
        }
        else if(inputNames[0].value === '' || inputNames[1].value === ''){
            alert("Fill in Players nicknames");
        }
        else{
            symbolA = symbolsA.value;
            symbolB = symbolsB.value;
            formContainer.style.transition = 'all 2s ease-in-out';
            //Hambtn
            hamBtn.style.display = 'block';
            //Display message that player1's turn to play is now
            message.innerText = `${inputNames[0].value.toUpperCase()}'s turn`;
            //Set form container height
            formContainer.style.height = '30vh';
            formContainer.style.position = 'relative';
            //Display players' names on scoreboard
            scoreCells[0].innerText =  `${inputNames[0].value}`;
            scoreCells[1].innerText =  `${inputNames[1].value}`;
            //Disable input fields
            inputNames[0].disabled = true;
            inputNames[1].disabled = true;
            symbolsA.disabled = true;
            symbolsB.disabled = true;
            //Style disabled fields
            document.querySelector("input[type='submit']").style.display = 'none';
            //Reset transition style of form container because transition isn't needed from now on and it damages the styling if the windows is resized
            setTimeout(function() {
                formContainer.style.transition = 'none';
              }, 2000);
        }
        e.preventDefault()
    }
);
// function that checks if player1 won
function checkArrayA(){
    if((playerOneMoves.includes(0) && playerOneMoves.includes(3) && playerOneMoves.includes(6)) || (playerOneMoves.includes(1) && playerOneMoves.includes(4) && playerOneMoves.includes(7)) || (playerOneMoves.includes(2) && playerOneMoves.includes(5) && playerOneMoves.includes(8)) || (playerOneMoves.includes(0) && playerOneMoves.includes(4) && playerOneMoves.includes(8)) || (playerOneMoves.includes(2) && playerOneMoves.includes(4) && playerOneMoves.includes(6)) || (playerOneMoves.includes(0) && playerOneMoves.includes(1) && playerOneMoves.includes(2)) || (playerOneMoves.includes(3) && playerOneMoves.includes(4) && playerOneMoves.includes(5)) || (playerOneMoves.includes(6) && playerOneMoves.includes(7) && playerOneMoves.includes(8))) {
        player1points += 1;
        player1TotalScoreCell.innerText = player1points;
        stopGame = 1;
        winCombinationsCheck();
        createScoreCellP1();
        setTimeout(function() {
            message.innerText = `${inputNames[0].value.toUpperCase()} wins!`;
        }, 500);
    }
}
// function that checks if player2 won
function checkArrayB(){
    if((playerTwoMoves.includes(0) && playerTwoMoves.includes(3) && playerTwoMoves.includes(6)) || (playerTwoMoves.includes(1) && playerTwoMoves.includes(4) && playerTwoMoves.includes(7)) || (playerTwoMoves.includes(2) && playerTwoMoves.includes(5) && playerTwoMoves.includes(8)) || (playerTwoMoves.includes(0) && playerTwoMoves.includes(4) && playerTwoMoves.includes(8)) || (playerTwoMoves.includes(2) && playerTwoMoves.includes(4) && playerTwoMoves.includes(6)) || (playerTwoMoves.includes(0) && playerTwoMoves.includes(1) && playerTwoMoves.includes(2)) || (playerTwoMoves.includes(3) && playerTwoMoves.includes(4) && playerTwoMoves.includes(5)) || (playerTwoMoves.includes(6) && playerTwoMoves.includes(7) && playerTwoMoves.includes(8))) {
        player2points += 1;
        player2TotalScoreCell.innerText = player2points;
        stopGame = 1;
        winCombinationsCheck()
        createScoreCellP2()
        setTimeout(function() {
            message.innerText = `${inputNames[1].value.toUpperCase()} wins!`;
        }, 500);
    }
}

//Execute when draw
function draw(){
    if(!((playerTwoMoves.includes(0) && playerTwoMoves.includes(3) && playerTwoMoves.includes(6)) || (playerTwoMoves.includes(1) && playerTwoMoves.includes(4) && playerTwoMoves.includes(7)) || (playerTwoMoves.includes(2) && playerTwoMoves.includes(5) && playerTwoMoves.includes(8)) || (playerTwoMoves.includes(0) && playerTwoMoves.includes(4) && playerTwoMoves.includes(8)) || (playerTwoMoves.includes(2) && playerTwoMoves.includes(4) && playerTwoMoves.includes(6)) || (playerTwoMoves.includes(0) && playerTwoMoves.includes(1) && playerTwoMoves.includes(2)) || (playerTwoMoves.includes(3) && playerTwoMoves.includes(4) && playerTwoMoves.includes(5)) || (playerTwoMoves.includes(6) && playerTwoMoves.includes(7) && playerTwoMoves.includes(8))) && (!((playerOneMoves.includes(0) && playerOneMoves.includes(3) && playerOneMoves.includes(6)) || (playerOneMoves.includes(1) && playerOneMoves.includes(4) && playerOneMoves.includes(7)) || (playerOneMoves.includes(2) && playerOneMoves.includes(5) && playerOneMoves.includes(8)) || (playerOneMoves.includes(0) && playerOneMoves.includes(4) && playerOneMoves.includes(8)) || (playerOneMoves.includes(2) && playerOneMoves.includes(4) && playerOneMoves.includes(6)) || (playerOneMoves.includes(0) && playerOneMoves.includes(1) && playerOneMoves.includes(2)) || (playerOneMoves.includes(3) && playerOneMoves.includes(4) && playerOneMoves.includes(5)) || (playerOneMoves.includes(6) && playerOneMoves.includes(7) && playerOneMoves.includes(8))))) {
        stopGame = 1;
        setTimeout(function() {
            message.innerText = `It's a draw`;
        }, 500);
        player2points += 0.5;
        player1points += 0.5;
        player1TotalScoreCell.innerText = player1points;
        player2TotalScoreCell.innerText = player2points;
        createScoreCellDraw()
    }
}

function replay(){
    clickNum += 1;
    if(clickNum%2 !== 0){
        playerTurn = 1;
        message.innerText = `${inputNames[1].value.toUpperCase()}'s turn`;
    }
    else{
        message.innerText = `${inputNames[0].value.toUpperCase()}'s turn`;
        playerTurn = 0;
    }
    for(i=0; i < 9; i++){
        cells[i].innerText = ``
    }
    stopGame = 0;
    counterDraw = 0;
    playerOneMoves = [];
    playerTwoMoves = [];
    replayBtn.style.visibility = 'hidden';
    for(i=0; i<9; i++){
        cells[i].style.background = null
        cells[i].style.transition = null;
    }
}

function moves(e){
        if(playerTurn === 0){
            e.target.innerText = symbolA;
            e.target.style.color  = 'red';
            let cellId = e.target.id;
            playerOneMoves.push(parseInt(cellId));
            message.style.opacity = '0';
            message.style.transition = 'all 0.5s ease-in-out';
            setTimeout(function() {
                message.style.opacity = '1';
              }, 500);
            //Display message that it's player2 turn
            setTimeout(function() {
            message.innerText = `${inputNames[1].value.toUpperCase()}'s turn`;
            }, 500);
            // This function checks if player1 has won
            checkArrayA();
            //One more cell counted as filled
            counterDraw += 1;
            //Change the player's turn
            playerTurn = 1;
        }
        // Check if playerTurn is 1 then display the symbol that belongs to player2 selection
        else if(playerTurn === 1){
            e.target.innerText = symbolB;
            e.target.style.color  = 'green';
            let cellId = e.target.id;
            playerTwoMoves.push(parseInt(cellId));
            message.style.opacity = '0';
            message.style.transition = 'all 0.5s ease-in-out';
            setTimeout(function() {
                message.style.opacity = '1';
              }, 500);
            //Display message that it's player1 turn
            setTimeout(function() {
            message.innerText = `${inputNames[0].value.toUpperCase()}'s turn`;
            }, 500);
            // This function checks if player2 has won
            checkArrayB();
            //One more cell counted as filled
            counterDraw += 1;
            //Change the player's turn
            playerTurn = 0;
        }
}

//Function when a grid cell clicked
function tictac(e){
    if(stopGame === 0){
        //Do something if clcked area is the grid area
        if(e.target.parentElement === grid){
            //Display symbol when cell clicked if the cell is empty
            if(e.target.innerText === ""){
                // Check if playerTurn is 0 then display the symbol that belongs to player1 selection
                if(counterDraw < 8){
                    moves(e);
                }
                else{
                    moves(e);
                    draw();
                }
            }
            //if clicked cell is not empty then alert
            else{
                alert("You can't do that!");
            }
        }
        if(stopGame === 1){
            replayBtn.style.visibility = 'visible';
        }
    }
}

//When click a grid cell call function tictac

hamBtn.addEventListener(
    'click', function(){
        if (hamClickCnt % 2 === 0){
            hamBtn.style.position = 'fixed';
            setTimeout(function() {
                cont.insertBefore(hamBtn, cont.gridContainer);
            }, 1000);
            setTimeout(function() {
            formContainer.style.transition = '1s transform ease-in-out';
            formContainer.style.transform = 'translateY(-30vh)';
            cont.style.transition = '1s transform ease-in-out';
            cont.style.transform = 'translateY(-30vh)';
            const lines = document.getElementsByClassName('line');
            for(i=0; i < lines.length; i++){
                lines[i].style.background = 'rgb(71, 75, 114)';
                lines[i].style.transition = '1s ease-in-out background';
            }
            hamClickCnt ++;
            }, 1);
        }
        else{
            document.querySelector('body').insertBefore(hamBtn, formContainer);
            formContainer.style.transform = 'translateY(0vh)';
            cont.style.transform = 'translateY(0vh)';
            hamBtn.style.position = null;
            const lines = document.getElementsByClassName('line');
            for(i=0; i < lines.length; i++){
                lines[i].style.background = null;
            }
            hamClickCnt ++;
        }
    }
)

grid.addEventListener(
    'mousedown', tictac
);

replayBtn.addEventListener(
    'click', replay
);

resetBtn.addEventListener(
    'click', function(){
        location.reload(true);
    }
);

console.log(document.styleSheets[0].href)
console.log(document.title)
