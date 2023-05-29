import Stopwatch from './stopwatch.js';

const stopwatch = new Stopwatch();

let $minLap, $maxLap;

let isRunning = false;
let interval;

const $timer = document.getElementById('timer');
const $lapResetBtnLabel = document.getElementById('lap-reset-btn-label');
const $startStopBtnLabel = document.getElementById('start-stop-btn-label');
const $startStopBtn = document.getElementById('start-stop-btn');

// 버튼 색상 변경
const toggleBtnStyle = () => {
    $startStopBtn.classList.toggle('bg-red-600');
    $startStopBtn.classList.toggle('bg-green-600');
};

// 시작 버튼 클릭 기능
const onClickStartBtn = () => {
    // 스탑워치 시작
    stopwatch.start();
    // 화면에 표시해주는 interval
    setInterval(() => {
        updateTime(stopwatch._centisecond);
    }, 10);
    // 버튼 글자 변경
    $startStopBtnLabel.innerText = '중단';
    $lapResetBtnLabel.innerText = '랩';
};

// 중단 버튼 클릭 기능
const onClickStopBtn = () => {
    // 스탑워치 주지
    stopwatch.pause();
    // 화면에 표시 interval clear
    clearInterval(interval);
    // 버튼 글자 변경
    $startStopBtnLabel.innerText = '시작';
    $lapResetBtnLabel.innerText = '리셋';
};

// 시작, 중단 버튼 클릭 시 실행
const onClickStartStopBtn = () => {
    if (isRunning === false) {
        onClickStartBtn();
    } else {
        onClickStopBtn();
    }
    toggleBtnStyle(); // 스타일 변경
    isRunning = !isRunning; // 실행중인지 확인해주는 변수
};

$startStopBtn.addEventListener('click', onClickStartStopBtn);

// 요구사항 2
// 시간 포매팅
const formatString = (num) => (num < 10 ? '0' + num : num);

const formatTime = (centisecond) => {
    let formattedString = '';
    const min = parseInt(centisecond / 6000);
    const sec = parseInt((centisecond - 6000 * min) / 100);
    const centisec = centisecond % 100;
    formattedString = `${formatString(min)}:${formatString(sec)}.${formatString(
        centisec
    )}`;
    return formattedString;
};

const formattingTime = (time) => {
    const minutes = `0${Math.floor(time / 6000)}`;
    const seconds = `0${Math.floor((time - 6000 * minutes) / 100)}`;
    const centiseconds = `0${time % 100}`;

    return `${minutes.slice(-2)}:${seconds.slice(-2)}.${centiseconds.slice(
        -2
    )}`;
};

const updateTime = (time) => {
    $timer.innerText = formattingTime(time);
};

// 요구사항 3
// 랩 기능

// 랩, 리셋 버튼
const $labResetBtn = document.getElementById('lap-reset-btn');
// 랩이 표시되는 곳
const $laps = document.getElementById('laps');

const colorMinMax = () => {
    $minLap.classList.add('text-green-600');
    $maxLap.classList.add('text-red-600');
};

// 랩버튼 클릭시 실행
const onClickLapBtn = () => {
    const [lapCount, lapTime] = stopwatch.createLap();
    const $lap = document.createElement('li');
    $lap.setAttribute('data-time', lapTime);
    $lap.classList.add('flex', 'justify-between', 'py-2', 'px-3', 'border-b-2');
    $lap.innerHTML = `<span>랩 ${lapCount}</span><span>${formatTime(
        lapTime
    )}</span>`;
    $laps.prepend($lap);

    if ($minLap === undefined) {
        $minLap = $lap;
        return;
    }

    if ($maxLap === undefined) {
        if (lapTime < $minLap.dataset.time) {
            $maxLap = $minLap;
            $minLap = $lap;
        } else {
            $maxLap = $lap;
        }
        colorMinMax();
        return;
    }

    if (lapTime < $minLap.dataset.time) {
        $minLap.classList.remove('text-green-600');
        $minLap = $lap;
    } else if (lapTime > $maxLap.dataset.time) {
        $maxLap.classList.remove('text-red-600');
        $maxLap = $lap;
    }

    colorMinMax();
};

const onClickResetBtn = () => {
    stopwatch.reset();
    $laps.innerHTML = '';
    $minLap = undefined;
    $maxLap = undefined;
};

const onClickLapResetBtn = () => {
    if (isRunning) {
        onClickLapBtn();
    } else {
        onClickResetBtn();
    }
};

$labResetBtn.addEventListener('click', onClickLapResetBtn);
// 요구사항5
// 키보드 조작
window.addEventListener('keydown', (e) => onkeyPress(e));

const onkeyPress = (e) => {
    switch (e.code) {
        case 'KeyL':
            onClickLapResetBtn();
            break;
        case 'KeyS':
            onClickStartStopBtn();
            break;
    }
};
