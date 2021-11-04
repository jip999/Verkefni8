const MAX_BEST_OF = 10;
let wins = 0;
let losses = 0;

export function isValidBestOf(bestOf, maxBestOf) {
  
  var n = parseInt(bestOf);

  if ((0 < n) && (n % 2 !== 0) && (n < MAX_BEST_OF)) return true;

  return false;
}
//console.assert(isValidBestOf(1) === true, '1 er valid best of');
//console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
//console.assert(isValidBestOf(9) === true, '9 er valid best of');

export function playAsText(play) {

  if      (play === '1') return "Skæri";
  else if (play === '2') return "Blað";
  else if (play === '3') return "Steinn";

  return "Óþekkt";
}
console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
console.assert(playAsText('2') === 'Blað', '2 táknar blað');
console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

export function checkGame(player, computer) {

  if  (playAsText(player) === "Óþekkt") return -1;

  player   = parseInt(player);
  computer = parseInt(computer);

  if      (player === computer)          return 0;
  else if ((player % 3) + 1 === computer) return 1;
  
  return -1;
}
//console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
//console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
//console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
//console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
//console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

export function computerPlay() {

  return (Math.floor(Math.random() * 3) + 1).toString();
}
