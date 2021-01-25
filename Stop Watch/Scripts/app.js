const disp = document.getElementById('disp');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');


//let ms = 00;
let ss = 00;
let mn = 00;
let hr = 00;
let cnt = 0;
let lapCtn = 0;
let lapT = 0;
let lapLabel = document.getElementById('lap');
let totalTime = document.getElementById('total-time');
let lapTime = document.getElementById('lap-time');
//localStorage.setItem('milesecond', ms);
let strtInterval;
let str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
/* let d = new Date(); */

const setVal = () => {
    ms = localStorage.getItem('milesecond');
    ss = localStorage.getItem('second');
    mn = localStorage.getItem('minute');
    hr = localStorage.getItem('hour');
    console.log('Page loaded');
    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
    disp.innerHTML = str;
}

const startTimmer = () => {
    localStorage.setItem('second', ss);
    localStorage.setItem('minute', mn);
    localStorage.setItem('hour', hr);
    let str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`
    disp.innerHTML = str
    ss++;
    if (ss === 60) {
        ss = 0;
        mn++;
        if (mn === 60) {
            hr++;
            if (hr === 24) {
                hr = 0;
            }
            mn = 0;
        }
    }

}

// Will stop the startInterval function on  the "Start" btn
const stopTimmer = () => {
    clearInterval(strtInterval);
    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
}

const resetTimmer = () => {
    logHistory(ss, mn, hr, lapLabel);
    ss = 00;
    mn = 00;
    hr = 00;
    lapLabel = 0;
    stopTimmer();
    disp.innerHTML = str
    console.log(str);
}

// History
const logHistory = (ss, mn, hr, lapLabel) => {
    let p = document.getElementById('history');
    //let pLi = document.getElementById('lap-list');

    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
    //let li = document.getElementById('history-list');
    let li = document.createElement('p');
    li.innerHTML = `${str} lap: ${lapCtn}`;
    if (cnt < 10) {
        p.appendChild(li);
    } else {
        p.insertBefore(li, p.childNodes[0]);
        //alert('Only 10 history allowed!!');
    }
    cnt++;
}

//Lapping the time
const lapping = () => {
    lapCtn++;
    let tmp_ss = 00;
    let tmp_mn = 00;
    let tmp_hr = 00;
    let lap = document.getElementById('lap');
    lap.innerHTML = lapCtn;
    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
    // lapT = str;
    lapTime.innerHTML = str;
    lapLabel.innerHTML = lapCtn;
}

// Start the watch
startBtn.addEventListener('click', () => {
    ss++;
    disp.innerHTML = str;
    strtInterval = setInterval(startTimmer, 1000);
});

// Stopping the interval
stopBtn.addEventListener('click', stopTimmer);

//Lapping the time
lapBtn.addEventListener('click', lapping);

// Reset button
resetBtn.addEventListener('click', resetTimmer);

window.addEventListener('load', setVal)