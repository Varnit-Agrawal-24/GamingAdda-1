let lastRender = 0;
let snakeSpeed = 8;
let inputDirection = { x: 0, y: 0 };
let lastDirection = { x: 0, y: 0 };

let gameboard = document.getElementById("gameBoard");
let snakeBody = [{ x: 11, y: 11 }];

let foodPosition = randomFood();

const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");

let scoreBox = document.getElementById("score");
let hiscoreBox = document.getElementById("highScore");
let points = 0;

let overlay = document.getElementById("overlay");
let overlayCard = document.getElementById("card");
let overlayScore = document.getElementById("Afterscore");
let overlayHiscore = document.getElementById("AfterhighScore");

// Game loop
function main(currentTime) {
  window.requestAnimationFrame(main);
  const secsinceLastRender = (currentTime - lastRender) / 1000;
  if (secsinceLastRender < 1 / snakeSpeed) {
    return;
  }
  lastRender = currentTime;
  update();
  draw();
}
window.requestAnimationFrame(main);

function update() {
  updateSnake();
}

function draw() {
  gameboard.innerHTML = "";
  drawSnake(gameboard);
  drawFood(gameboard);
}

// for snake body

function updateSnake() {
  let inputDir = getDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDir.x;
  snakeBody[0].y += inputDir.y;

  if (isCollide(snakeBody)) {
    gameoverSound.play();
    inputDirection = { x: 0, y: 0 };
    // alert("Game Over");
    snakeBody = [{ x: 11, y: 11 }];
    points = 0;
    scoreBox.innerHTML =
      "<img src='./img/food.png' style='width: 5vmin' />" + points;
    setTimeout(() => {
      overlayCard.style.display = "flex";
      overlay.classList.remove("hide");
    }, 1000);

    overlayCard.classList.add("hidden");
  }
}

function isCollide(snakeBody) {
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[i].x === snakeBody[0].x &&
      snakeBody[i].y === snakeBody[0].y
    ) {
      return true;
    }
  }

  if (
    snakeBody[0].x > 21 ||
    snakeBody[0].x <= 0 ||
    snakeBody[0].y > 21 ||
    snakeBody[0].y <= 0
  ) {
    return true;
  }
}

function drawSnake(gameboard) {
  snakeBody.forEach((segment, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    gameboard.appendChild(snakeElement);
  });
}

// for direction input
window.addEventListener("keydown", (e) => {
  if (overlayCard.classList.contains("hidden")) {
    return;
  }
  switch (e.key) {
    case "ArrowUp":
      if (lastDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowRight":
      if (lastDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
    case "ArrowLeft":
      if (lastDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
  }
});

function getDirection() {
  lastDirection = inputDirection;
  return inputDirection;
}

// for food
function updateFood() {}

function drawFood(gameboard) {
  let foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = foodPosition.x;
  foodElement.style.gridRowStart = foodPosition.y;
  foodElement.classList.add("food");
  gameboard.appendChild(foodElement);
  // when food is eaten
  if (snakeBody[0].x === foodPosition.x && snakeBody[0].y == foodPosition.y) {
    points += 1;
    foodSound.play();
    snakeBody.unshift({
      x: snakeBody[0].x + inputDirection.x,
      y: snakeBody[0].y + inputDirection.y,
    });

    foodPosition = randomFood();
    //for score
    scoreBox.innerHTML =
      "<img src='./img/food.png' style='width: 5vmin' />" + points;
    overlayScore.innerHTML =
      "<img src='./img/food.png' style='width: 5vmin' />" + points;

    //for highscore
    if (points > hiscoreval) {
      hiscoreval = points;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML =
        "<img src='./img/trophy.png' style='width: 5vmin' />" + hiscoreval;
      overlayHiscore.innerHTML =
        "<img src='./img/trophy.png' style='width: 5vmin' />" + hiscoreval;
    }
  }
}
// storing highScore in local storage
let hiscoreval = 0;
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML =
    "<img src='./img/trophy.png' style='width: 5vmin' />" + hiscoreval;
  overlayHiscore.innerHTML =
    "<img src='./img/trophy.png' style='width: 5vmin' />" + hiscoreval;
}
// putting food on random places
function randomFood() {
  return {
    x: Math.floor(Math.random() * 21 + 1),
    y: Math.floor(Math.random() * 21 + 1),
  };
}

// getting speed from player

function getSpeed() {
  let level = document.getElementsByName("speed");

  for (let i = 0; i < level.length; i++) {
    if (level[0].checked) {
      snakeSpeed = 8;
    } else if (level[1].checked) {
      snakeSpeed = 18;
    } else if (level[2].checked) {
      snakeSpeed = 28;
    }
  }
}
// for overlay score card

function startbtn() {
  overlayCard.style.display = "none";
  overlayCard.classList.remove("hidden");
  overlay.classList.add("hide");
}
