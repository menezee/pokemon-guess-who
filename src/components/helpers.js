function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const AudioFiles = {
  GUESS: require("../audio/guess.mp3")
};

function play(filePath) {
  new Audio(filePath).play();
}

export { randomIntFromInterval, play, AudioFiles };
