const playIcon = './src/play.svg';
const pauseIcon = './src/pause.svg';
const stopIcon = './src/stop.svg';

const playPauseButton = document.getElementById('playPauseButton');
let stopWacthSarted = false;

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', stop);

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', reset);

const circleButton = document.getElementById('circleButton');
circleButton.addEventListener('click', () => {
    if (!audio.paused && stopWacthSarted) {
        reset();
    } else if (stopWacthSarted) {
        stopWacthSarted = false;
        playPauseButton.src = playIcon;
        pause();
    } else {
        stopWacthSarted = true;
        playPauseButton.src = pauseIcon;
        resetButton.style.display = "inline";
        start();
    }
});

const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');

const display = document.getElementById('display');
const audio = new Audio('./src/Dj Getdown - Get Your Ass Up.mp3');

const second = 1000;
const minute = 60000;
const hour = 3600000;
let startTime;
let elapsedTime = 0;
let timeInterval;

function start() {
    startTime = Date.now() - elapsedTime;
    timeInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        
        display.innerHTML = printTime(elapsedTime);

        const timeTarget = parseFloat(minutesInput.value) * minute + parseFloat(secondsInput.value) * second;
        if (elapsedTime >= timeTarget) {
            audio.play();
            pause();
            playPauseButton.src = stopIcon;
            stopButton.style.display = "inline";
        }
    }, 10)
}

function pause() {
    clearInterval(timeInterval);
}

function reset() {
    // TODO: sutvarkyt iconų rodymą
    resetButton.style.display = "none";
    stopButton.style.display = "none";
    stopWacthSarted = false;
    playPauseButton.src = playIcon;
    clearInterval(timeInterval);
    elapsedTime = 0;
    display.innerHTML = printTime(elapsedTime);

    audio.pause();
    audio.currentTime = 0;
}

function stop() {
    stopButton.style.display = "none";
    clearInterval(timeInterval);
    stopWacthSarted = false;
    playPauseButton.src = playIcon;
    audio.pause();
    audio.currentTime = 0;
}

function printTime(elapsedTime) {
    let hours = elapsedTime / hour;
    let hh = Math.floor(hours);

    let minutes = (hours - hh) * 60;
    let mm = Math.floor(minutes);
  
    let seconds = (minutes - mm) * 60;
    let ss = Math.floor(seconds);
  
    let miliseconds = (seconds - ss) * 100;
    let ms = Math.floor(miliseconds);
  
    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

const volumeBar = document.getElementById('audioVolume');
volumeBar.addEventListener('change', changeVolume);

function changeVolume() {
    const volume = volumeBar.value; 
    audio.volume = volume/100;
}