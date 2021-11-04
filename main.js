// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { checkGame, playAsText }          from './lib/rock-paper-scissors.js';
import { computerPlay }       from './lib/rock-paper-scissors.js';
import { createButtons }      from './lib/ui.js';
import { show }               from './lib/ui.js';
import { updateResultScreen } from './lib/ui.js';
import { el }                 from './lib/helpers.js';


const MAX_BEST_OF = 10;
let totalRounds;
let currentRound;
let playerWins    = 0;
let computerWins  = 0;
let totalWins     = 0;
const games       = [];

function playRound(player) {

  // Komumst að því hvað tölva spilaði og athugum stöðu leiks
  let computer = computerPlay();
  let result   = checkGame(player, computer);

  if      (result === 1)  playerWins++;
  else if (result === -1) computerWins++;

  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player: player.toString(),
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil
  if (result !== 0) currentRound++;

  // Ákveðum hvaða takka skuli sýna
  buttonNextRound.classList.add('hidden');
  buttonFinishGame.classList.add('hidden');

  if (currentRound > totalRounds) {
    if (playerWins > computerWins) totalWins++;
    buttonFinishGame.classList.remove('hidden');
  } 

  else if (playerWins > (totalRounds / 2)) {
    totalWins++;
    buttonFinishGame.classList.remove('hidden');
  }

  else if (computerWins > (totalRounds / 2)) {
    buttonFinishGame.classList.remove('hidden');
  }

  else buttonNextRound.classList.remove('hidden');

  // Sýnum niðurstöðuskjá
  show('result');
}

export function round(e) {
  totalRounds = e;
  currentRound = 1;
}

// Takki sem byrjar leik
const startButton = document.querySelector('.start button');
startButton.addEventListener('click', () => show('rounds'));

// Búum til takka
createButtons(MAX_BEST_OF, 'play');

// Event listeners fyrir skæri, blað, steinn takka
document.
querySelector('button.scissor')
.addEventListener('click', () => {
  playRound('1');
  show('result');
});

document.
querySelector('button.paper')
.addEventListener('click', () => {
  playRound('2');
  show('result');
});

document.
querySelector('button.rock')
.addEventListener('click', () => {
  playRound('3');
  show('result');
});

function finishGame() {
  // Bætum við nýjasta leik
  let totalGames = document.querySelector('.games__played');
  let wins       = document.querySelector('.games__wins');
  let winRatio   = document.querySelector('.games__winratio');
  let losses     = document.querySelector('.games__losses');
  let lossRatio  = document.querySelector('.games__lossratio');
  let gamesList  = document.querySelector('.games__list');

  // Uppfærum stöðu
  totalGames.textContent = parseInt(totalGames.textContent) + 1;
  let totalGamesInt      = parseInt(totalGames.textContent);
  
  wins.textContent     = totalWins;
  winRatio.textContent = 
  (100 * totalWins / totalGamesInt).toFixed(2);

  let totalLosses       = parseInt(totalGames.textContent) - totalWins;
  losses.textContent    = totalLosses;
  lossRatio.textContent = 
  (100 * totalLosses / parseInt(totalGames.textContent)).toFixed(2);

  // Bætum leik við lista af spiluðum leikjum
  let winBool;
  let winText;

  if (playerWins > computerWins) {
    winBool = true;
    winText = 'Þú vannst ';
  }

  else {
    winBool = false;
    winText = 'Tölva vann ';
  }

  let newGamesObject = {player: playerWins, computer: computerWins, win: winBool};
  games.push(newGamesObject);

  let newLiElement = 
  el('li', winText + playerWins + '-' + computerWins);
  gamesList.appendChild(newLiElement);

  // Núllstillum breytur
  totalRounds  = 0;
  currentRound = 0;
  playerWins   = 0;
  computerWins = 0;

  // Byrjum nýjan leik!
  show('rounds');
}

function nextRound() {
  show('play');
}

// Næsta umferð og ljúka leik takkar
const buttonFinishGame = document.querySelector('button.finishGame');
buttonFinishGame.addEventListener('click', finishGame);

const buttonNextRound  = document.querySelector('button.nextRound');
buttonNextRound.addEventListener('click', nextRound);
