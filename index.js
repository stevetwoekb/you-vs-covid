const ENAMY_WIDTH = 63;
const ENAMY_HEIGHT = 53;
const canvas = document.querySelector('.canvas');
const menu = document.querySelector(".game-menu");
const background = document.querySelector('.game-bg');
const scoreBlock = document.querySelector('.score');
const ctx = canvas.getContext("2d");
const test = []
const progressBar = document.querySelector('.progress-bar__progress');
let progress = 0;
let bgMusic = null;
let enamy = null;
let musicPlay = false;
let score = 0;
let interval = 1000;

window.addEventListener('load', (event) => {
    enamy = new Image();
    enamy.src = 'assets/img/enamy.gif';
});

function checkProgress() {
    if (progress === 0) {
        progressBar.style.width = `${0}px`;
    } else {
        progressBar.style.width = `${progress}px`;
    }
}

function killEnamy(event) {
    const enamy = test.filter((item) => {
        const currPositionX = item.positionX + ENAMY_WIDTH;
        const currPositionY = item.positionY + ENAMY_HEIGHT;
        if (event.layerX >= item.positionX && event.layerX <= currPositionX && event.layerY >= item.positionY && event.layerY <= currPositionY) {
            return item
        }
    });

    if (enamy.length) {
        var index = test.findIndex(e => e === enamy[0]);
        test.splice(index, 1);
        ctx.clearRect(enamy[0].positionX, enamy[0].positionY, ENAMY_WIDTH, ENAMY_HEIGHT)
        let totalScore = score += 5;
        scoreBlock.innerHTML = 'Score: ' + totalScore;
        progress -= 5;
        checkProgress();
    }
}

function playMainThemeMusic() {
    bgMusic = document.createElement("audio");
    bgMusic.src = "assets/music/main-theme.mp3";
    bgMusic.volume = .03;
    bgMusic.play();
}

function start() {
    menu.style.display = 'none';
    playMainThemeMusic();
    canvas.addEventListener('click', killEnamy)
    updete();
    addEnamy(getRandomIntInclusive(3, 6));
    startEndStopInterval();
}

function getRandomIntInclusive(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
function updete() {
    setInterval(() => {
        for (i of test) {
            if (i.color !== null) {
                ctx.drawImage(enamy, i.positionX, i.positionY, ENAMY_WIDTH, ENAMY_HEIGHT);
            }
        }
    }, 1);
}

function startEndStopInterval() {
    let startInterval = setInterval(() => {
        if(progress >= 200) {
            clearInterval(startInterval)
        } else {
            addEnamy();
        }
    }, 2000)
}

function addEnamy(count) {
    if (count) {
        for (i = 0; i < count; i++) {
            randomSpawn()
            progress += 5;
        }
    } else {
        const spawnCount = getRandomIntInclusive(3, 7);
        for (i = 0; i < spawnCount; i++) {
            randomSpawn()
            progress += 5;
        }
    }

    checkProgress();
}

function randomSpawn() {
    const enamy = { color: 'blue', positionY: getRandomIntInclusive(0, (canvas.height - 64)), positionX: getRandomIntInclusive(0, (canvas.width - 64)) };
    test.push(enamy);
}