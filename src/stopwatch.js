export default class Stopwatch {
    constructor() {
        this._interval;
        this._centisecond = 0;
        this._lapCount = 0;
        this._prevLap = 0;
    }

    // centisecond 가져오기
    get centisecond() {
        return this._centisecond;
    }

    // interval 시작
    start() {
        this._interval = setInterval(() => {
            this._centisecond += 1;
        }, 10);
    }

    // interval 종료
    pause() {
        clearInterval(this._interval);
    }

    // lap 생성
    createLap() {
        this._lapCount += 1; // 랩 카운트 증가
        const lapTime = this._centisecond - this._prevLap; //랩 시간 생성
        this._prevLap = this._centisecond; // 이전 랩 시간
        return [this._lapCount, lapTime];
    }

    // lap 리셋
    reset() {
        this._centisecond = 0;
        this._lapCount = 0;
        this._prevLap = 0;
    }
}
