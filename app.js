/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, newGame;
var pointsToWin = 100;

init();

document.querySelector(".btn-roll").addEventListener('click', function() {
    //1. Create random variable, dice.
    //2. Display dice and add the rolled number to the active player's current score IF not 1
    if(gamePlaying){
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log('playeer: ' + (activePlayer+1) + " rolled: " + dice);
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        if(dice === 6 && previousRoll === 6){
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if(dice === 1){
            nextPlayer();
        }else{
            //add the current score to round score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            previousRoll = dice;
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //change player if less than winning points
        if(scores[activePlayer] < pointsToWin){
            nextPlayer();
        } else {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            document.querySelector('.dice').style.display = 'none';

            gamePlaying = false;
        }
    }
});

function nextPlayer(){
    roundScore = 0;
    previousRoll = 0;
    document.querySelector('#current-' + activePlayer).textContent = 0;
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.getElementById('newGame').addEventListener('click', function(){
    newGame = document.getElementById('newGame').checked;
    console.log(newGame);
});

document.querySelector('.btn-settings').addEventListener('click', function(){
    gamePlaying = false;
    document.querySelector('.show-settings').style.display = 'block';
    console.log(pointsToWin);
    // document.querySelector('.dice').style.display = 'none';
});

document.querySelector('.btn-apply-changes').addEventListener('click', function(){
    pointsToWin = document.getElementById('pointsToWin').value;
    console.log('Changes applied: ' + pointsToWin + " points to win");
    if(newGame){
        init();
    } else {
        gamePlaying = true;
        document.querySelector('.show-settings').style.display = 'none';
    }
});

document.querySelector('.btn-cancel-changes').addEventListener('click', function(){
    document.getElementById('pointsToWin').value = pointsToWin;
    gamePlaying = true;
    document.querySelector('.show-settings').style.display = 'none';
    console.log('Changes canceled');
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = scores[1];
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#name-0').textContent = 'Player 1'    
    document.querySelector('#name-1').textContent = 'Player 2'    
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.show-settings').style.display = 'none';

    document.getElementById('newGame').checked = true;
}











// if(dice !== 1){
        //     //add the current score to round score
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        //     if(previousRoll === 6 && dice === 6){
        //         nextPlayer();
        //     } else {
        //         previousRoll = dice;
        //     }
        // } else {
        //     // next player
        //     nextPlayer();
        // }
        // console.log(dice);


