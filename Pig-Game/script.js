"use strict";
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");

const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");

const diceimg = document.querySelector(".dice");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let currentscore, activePlayer, playing, scores;

const init = function () {
  currentscore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  diceimg.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

init();

btnroll.addEventListener("click", function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.display dice
    diceimg.classList.remove("hidden");
    diceimg.src = `dice-${dice}.png`;

    // 3. check for rolled 1
    if (dice !== 1) {
      // add dice to current score - so we create a variable currentscore
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // finish the game
      // we will play only when playing var is true{so we do this change in btnroll class eventlistner to make follow this condition}
      playing = false;
      diceimg.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      // remove active player class to remove overlapping of both winner and activeplayer to getrid of overlapping effect
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    // else switch to next player
    else {
      switchPlayer();
    }
  }
});

btnnew.addEventListener("click", init);

// check init funtion for more clarity
// document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
// i didn't remove active player class as below code because when player hits the required score it will be
// automatically removed there
// activePlayer = 0;
// document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
// playing=true;
