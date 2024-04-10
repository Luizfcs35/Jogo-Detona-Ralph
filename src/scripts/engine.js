const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    startGame: document.querySelector(".start"),
    continueGame: document.querySelector(".continue"),
    messageToPlay: document.querySelector(".messageToPlay"),
    messageRound: document.querySelector(".messageRound"),
    messageScreen: document.querySelector(".gameOver"),
    life: document.querySelector("#life-contador"),
  },
  values: {
    hitPosition: 0,
    result: 0,
    curretTime: 30,
    lifeCount: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimer: setInterval(countDown, 1000),
  },
};

state.view.life.textContent = 3;
state.view.timeLeft.textContent = 0;
state.view.score.textContent = 0;

function lifeCount() {
  playSound("mixkit-video-game-win-2016");
  let life = state.view.life.textContent;
  messageRound(1, "Easy", "flex");

  if (life >= 3) {
    state.view.score.textContent = 0;
    state.values.curretTime = 30;
    state.actions.countDownTimer = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 800);
    life--;
  } else if (life >= 2) {
    messageRound(2, "Medium", "flex");

    state.view.score.textContent = 0;
    state.values.curretTime = 20;
    state.actions.countDownTimer = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 600);
  } else if (life >= 1) {
    messageRound(3, "Hard", "flex");

    state.view.score.textContent = 0;
    state.values.curretTime = 10;
    state.actions.countDownTimer = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 450);
  } else {
    state.view.messageScreen.innerHTML = `<h2>Game Over!</h2>`;
    gameOverScreen();
  }
  
}

function gameOverScreen() {
  messageRound("", "", "none");

  state.view.messageScreen.innerHTML = `<h2>Resultado!</h2>
  <h3>Score:${state.values.result} pontos totais!</h3>
  <h2>Parabens!</h2>`;


}

// contagem de pontos;
function countPoint() {

  // Limpar os quadrados de inimigos
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  const result = state.values.result;
  const score = state.view.score.textContent;

  // Determinar a mensagem com base na pontuação
  if (result < 25 && life >= 1) {
    state.view.messageScreen.innerHTML = `<h3>Score:${result} pontos </h3>`;
  } else if (score <= 45) {
    state.view.messageScreen.innerHTML = `<h3>Score:${result} pontos </h3>`;
  } else if (score >= 60) {
    state.view.messageScreen.innerHTML = `<h3>Uau! ${result} pontos </h3>`;
  } else {
    ;
  }

  
}

function countDown() {
  // contador regressivo do tempo.
  state.view.timeLeft.textContent = state.values.curretTime--;
  let time = state.view.timeLeft.textContent;
  let life = state.view.life.textContent;
  btnContinue("none");
  timeSound();
  // Verificando se o tempo chegou ao fim e chamando as funções correspondentes.
   if(time <= "0"){
    // Pausar a contagem de pontos (se necessário);
    clearPoint();

    countPoint();

    // habilita botao next nivel.
    btnContinue("flex");

    life = state.view.life.textContent--;
    messageRound("", "", "none");
  }
}

function timeSound() {
  const time = state.view.timeLeft.textContent;
  //contagem regressiva com audio;
  if (time < 10) {
    playSound("mixkit-game-quick-warning-notification-268");
  }
  if (time <= 0) {
    // Audio game over;
    playSound("mixkit-funny-game-over-2878");
  }
}

function btnContinue(select) {
  // esconde ou mostr botão
  document.querySelector(".continue").style.display = `${select}`;
}

function clearPoint() {
  // limpa as contagens do tempo e dos square do ralph;
  clearInterval(state.actions.timerId);
  clearInterval(state.actions.countDownTimer);
}

// Gera a imagem do Ralph no square;
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

// Adiciona os pontos ao acertar o Ralph;
function addListenerHitBox() {
  document.addEventListener("mousedown", (event) => {
    const square = event.target.closest(".square");
    if (square && square.id === state.values.hitPosition) {
      state.values.result++;
      state.view.score.textContent = state.values.result;
      state.values.hitPosition = null;
      playSound("mixkit-casino-bling-achievement-2067");
    }
  });
}

function playSound(audioName) {
  let audio = new Audio(`src/sounds/${audioName}.wav`);
  audio.volume = 0.15;
  audio.play();
}

function messageToPlay() {
  let learnPlay = state.view.messageToPlay;
  learnPlay.style.display = "flex";
  let btnFechar = document.querySelector(".btnFechar");
  btnFechar.addEventListener("click", () => {
    learnPlay.style.display = "none";
  });
}

function messageRound(round, nivel, select) {
  let msnRound = document.querySelector(".messageRound");
  msnRound.style.display = `${select}`;
  msnRound.innerHTML = `<h3>${round}º Rodada</h3>
  <h4>Nível:${nivel}</h4>`;
}

//  Função para Resetar o Game;
function resetGame() {
  window.location.reload();
};

// Função que inicia um novo jogo;
function newGame() {
  playSound("mixkit-video-game-win-2016");
  addListenerHitBox();
  lifeCount();
}

clearPoint();
messageToPlay();

