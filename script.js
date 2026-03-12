const validWords = new Set(["BOAT", "TAB", "BAT"]);
const hiddenWord = "BAT";

const attemptEl = document.getElementById("attempt");
const statusEl = document.getElementById("status");
const hiddenCells = [...document.querySelectorAll('[data-word="BAT"]')];

let attempt = "";

const updateAttempt = () => {
  attemptEl.textContent = attempt;
};

const clearAttempt = () => {
  attempt = "";
  updateAttempt();
};

const markSolved = () => {
  hiddenCells.forEach((cell, i) => {
    cell.textContent = hiddenWord[i];
    cell.classList.add("revealed");
    cell.classList.remove("hidden");
  });
};

document.querySelectorAll(".letter").forEach((button) => {
  button.addEventListener("click", () => {
    attempt += button.dataset.letter;
    updateAttempt();
  });
});

document.getElementById("clear").addEventListener("click", () => {
  clearAttempt();
  statusEl.textContent = "Cleared.";
});

document.getElementById("shuffle").addEventListener("click", () => {
  const letters = [...document.querySelectorAll(".letter")];
  const values = letters.map((el) => el.dataset.letter);
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  letters.forEach((el, index) => {
    el.dataset.letter = values[index];
    el.textContent = values[index];
  });
  statusEl.textContent = "Letters shuffled.";
});

document.getElementById("submit").addEventListener("click", () => {
  const word = attempt.toUpperCase();

  if (!word) {
    statusEl.textContent = "Pick letters first.";
    return;
  }

  if (!validWords.has(word)) {
    statusEl.textContent = `\"${word}\" is not in this puzzle.`;
    clearAttempt();
    return;
  }

  if (word === hiddenWord) {
    markSolved();
    statusEl.textContent = "Great! You solved the hidden word.";
  } else {
    statusEl.textContent = `Nice! ${word} is valid.`;
  }

  clearAttempt();
});
