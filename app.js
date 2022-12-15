// Splash Screen function

const instructions = document.querySelector(".instructions");
// hide instructions by default
instructions.classList.add("hidden");

document.querySelector(".start-btn span").onclick = function () {
  // show instructions
  instructions.classList.remove("hidden");

  const name = prompt("PLEASE ENTER YOUR NAME");
  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }

  document.querySelector(".start-btn").remove();

  // start the timer
  startTimer();
};

const duration = 1000;
const blocksContainer = document.querySelector(".memory-game");
const blocks = Array.from(blocksContainer.children);
// create range of keys
const orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// Add order CSS property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add click event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip the blocks
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flipped");

  // Collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped")
  );

  // If there are two selected blocks
  if (allFlippedBlocks.length === 2) {
    // Stop clicking function
    stopClicking();

    // Check matched blocks
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking function
function stopClicking() {
  // Add class no clicking on container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    // remove class no-clicking after the set duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check matched blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.language === secondBlock.dataset.language) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("match");
    secondBlock.classList.add("match");
    // update the score
    let scoreElement = document.querySelector("#score span");
    scoreElement.innerHTML = parseInt(scoreElement.innerHTML) + 1;
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
  }
}

// Shuffle the blocks

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

// Restart Button
document.querySelector(".restart").onclick = function () {
  resetGame();
};

// function for game reset

function resetGame() {
  // clear the timer interval
  clearInterval(timerInterval);

  // reset the timer
  timer = duration;
  document.querySelector("#timer span").innerHTML = timer;

  // reset the score
  document.querySelector("#score span").innerHTML = 0;

  // reset the tries
  document.querySelector(".tries span").innerHTML = 0;

  // delete all classes from blocks
  blocks.forEach((block) => {
    block.classList.remove("flipped", "match");
  });

  // shuffle the game blocks
  shuffle(orderRange);

  // add order CSS property to game blocks
  blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
  });

  // start the timer again
  startTimer();
}
// Shuffle the game blocks
shuffle(orderRange);

// Add order CSS property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
});

// function for timer
function startTimer() {
  let timer = 60;
  let timerInterval = setInterval(function () {
    timer--;
    document.querySelector("#timer span ").innerHTML = timer;
    if (timer == 0) {
      clearInterval(timerInterval);
      alert("Time is up! Game over.");
    }
  }, 1000);
}
