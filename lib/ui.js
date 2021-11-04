// TODO hér þarf að sækja viðeigandi föll sem nota þarf
import { isValidBestOf } from './rock-paper-scissors.js';
import { playAsText }    from './rock-paper-scissors.js';
import { round }         from '../main.js';

export function createButtons(max, onClick) {

  for (let i = 0; i < max; i++) {
      
    if (isValidBestOf(i, max)){
      let btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("button");

      btn.addEventListener('click', () => {
      show(onClick);
      round(parseInt(i));
      });
  
      document
      .querySelector('.rounds__buttons')
      .appendChild(btn);
    }
  }
}

export function show(part) {
  
  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start  = document.querySelector('.start');
  const rounds = document.querySelector('.rounds');
  const play   = document.querySelector('.play');
  const result = document.querySelector('.result');

  // Felum allt
  start. classList.add('hidden');
  rounds.classList.add('hidden');
  play.  classList.add('hidden');
  result.classList.add('hidden');

  // og sýnum það sem beðið er um
  switch (part) {
    case 'start':
      start.classList.remove('hidden');
      break;
    case 'rounds':
      rounds.classList.remove('hidden');
      break;
    case 'play':
      play.classList.remove('hidden');
      break;
    case 'result':
      result.classList.remove('hidden');
      break;
    default:
      console.warn(`${part} óþekkt`);
  }
}

export function updateResultScreen({ player, computer, result, currentRound, totalRounds, playerWins, computerWins }) {

  const resultPlayer   = document.querySelector('.result__player');
  const resultComputer = document.querySelector('.result__computer');
  const resultResult   = document.querySelector('.result__result');

  const statusCurrentRound = document.querySelector('.result__currentRound');
  const statusTotalRounds  = document.querySelector('.result__totalRounds');

  resultPlayer.textContent   = playAsText(player);
  resultComputer.textContent = playAsText(computer);

  statusCurrentRound.textContent = currentRound;
  statusTotalRounds.textContent = totalRounds;

  if      (result === 1) resultResult.textContent = "Þú sigrar.";
  else if (result === 0) resultResult.textContent = "Jafntefli.";
  else                   resultResult.textContent = "Tölva sigrar.";

  document
  .querySelector('.result__status')
  .textContent = 'Staðan er ' + playerWins + '-' + computerWins + '.';
}
