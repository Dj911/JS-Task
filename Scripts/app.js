// Constant DOM declaration
const disp = document.getElementById('disp');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const lapBtn = document.getElementById('lap-btn');
const lapDisp = document.getElementById('lap-disp');
const resetBtn = document.getElementById('reset-btn');

// Variable DOM declaration
let lapLabel = document.getElementById('lap');
let totalTime = document.getElementById('total-time');
let lapTime = document.getElementById('lap-time');
let history = document.getElementById('history');

// Variable Declaration
let dispType = 'no-lap';
let timmerCounter;

//let ms = 00;
let ss = 00;
let mn = 00;
let hr = 00;
let tmp_ss = 00;
let tmp_mn = 00;
let tmp_hr = 00;

let cnt = 0;
let lapCtn = 0;
let lapT = 0;

//localStorage.setItem('milesecond', ms);
let strtInterval;
let startBtnCnt = 0;
let ltime;
let str = `${hr}${mn}${ss}`;

let closeTime;   // Storing the last date when browser is closed
let openTime;
let timeDiff = 0;

const getItem = (name) => {
    return localStorage.getItem(name);
}
const setItem = (name, value) => {
    return localStorage.setItem(name, value);
}

// Setting Value
const setVal = () => {
    //ms = localStorage.getItem('milesecond');
    ss = (getItem('second') === 'null') ? 0 : getItem('second');
    mn = (getItem('minute') === 'null') ? 0 : getItem('minute');
    hr = (getItem('hour') === 'null') ? 0 : getItem('hour');
    cnt = getItem('cnt');
    console.log('Page loaded');
    str = `${hr}:${mn}:${ss}`;
    disp.innerHTML = str;
    totalTime.innerHTML = getItem('totalTime');
    lapTime.innerHTML = getItem('lapTime');
    lapCtn = getItem('lapCtn');
    lapLabel.innerHTML = lapCtn;

    history.innerHTML = getItem('history');
}

const startTimmer = () => {
    setItem('second', ss);
    setItem('minute', mn);
    setItem('hour', hr);
    setItem('timmerCnt', 'start');
    // let ctc = 0
    // ctc = Date.prototype.getSeconds()*0+1
    let str = `${hr}:${mn}:${ss}`;
    if (dispType === 'l') {
        lapDisp.innerHTML = str + timeDiff;
    } else {
        disp.innerHTML = str
    }
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
    //startBtn.hidden = false;
    // timmerCounter = 'stop'
    setItem('timmerCnt', 'stop');
    startBtnCnt = 0;
    clearInterval(strtInterval);
    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
}

const resetTimmer = () => {
    logHistory(ss, mn, hr, lapLabel);
    ss = 00;
    mn = 00;
    hr = 00;
    tmp_ss = 0;
    tmp_mn = 0;
    tmp_hr = 0;
    lapCtn = 0;
    lapLabel.innerHTML = 0;
    totalTime.innerText = '';
    lapTime.innerHTML = '';
    setItem('second', ss);
    setItem('minute', mn);
    setItem('hour', hr);
    setItem('tmp_ss', tmp_ss);
    setItem('tmp_mn', tmp_mn);
    setItem('tmp_hr', tmp_hr);
    setItem('timmerCnt', 'stop');
    stopTimmer();
    disp.innerHTML = str
    console.log(str);
}

// History
let i = 0;
const logHistory = (ss, mn, hr, lapLabel) => {
    //localStorage.setItem('cnt', cnt);
    let p = document.getElementById('history');
    //let pLi = document.getElementById('lap-list');

    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
    //let li = document.getElementById('history-list');
    let li = document.createElement('p');
    li.innerHTML = `${str} lap: ${lapCtn}`;
    if (cnt < 10) {
        p.appendChild(li);
    } else {
        if (i >= 10) {
            i = 0;
        }
        p.replaceChild(li, p.childNodes[i]);
        i++;
        //alert('Only 10 history allowed!!');
    }
    setItem('history', p.innerHTML);
    cnt++;
}

//Lapping the time
const lapping = () => {
    dispType = 'lap';
    //ltime = `${hr - tmp_hr}:${mn - tmp_mn}:${ss - tmp_ss}`;
    str = `${hr}:${mn}:${ss}`;
    lapCtn++;
    let lap = document.getElementById('lap');
    let totalSec = 0;
    let tmp_totalSec = 0;
    //let lapTag = document.createElement('br');
    //lapTag.id = 'lap-time';
    tmp_ss = getItem('tmp_ss');
    tmp_mn = getItem('tmp_mn');
    tmp_hr = getItem('tmp_hr');
    totalSec = ss + mn * 60 + hr * 3600;
    tmp_totalSec = parseInt(tmp_ss) + parseInt(tmp_mn) + parseInt(tmp_hr);
    let total = totalSec - tmp_totalSec;
    if (total > 3600) {
        tmp_hr = parseInt(total / 3600);
        tmp_mn = parseInt((total - 3600) / 60);
        tmp_ss = parseInt(total - 3660)
        //console.log("tmp_hr: ", tmp_hr, ' tmp_mn: ', tmp_mn, ' tmp_ss: ', tmp_ss);
    } else if (total < 3600) {
        tmp_mn = parseInt(total / 60);
        tmp_ss = total % 60;
    }
    //console.log(total);
    lap.innerHTML = lapCtn;
    // lapT = str;
    console.log("tmp_hr: ", tmp_hr, ' tmp_mn: ', tmp_mn, ' tmp_ss: ', tmp_ss);
    totalTime.innerHTML = str;
    let text = `${tmp_hr}:${tmp_mn}:${tmp_ss} Lap: ${lapCtn} Overall Time: ${str} <br />`;
    //lapTime.insertAdjacentText('beforeend', text);
    lapTime.insertAdjacentHTML("beforeend", text);
    tmp_ss = ss;
    tmp_mn = mn * 60;
    tmp_hr = hr * 3600;
    // localStorage.setItem('totalTime', totalTime.innerHTML);
    // localStorage.setItem('lapCtn', lapCtn);
    //console.log(strtInterval);    
    //lapTime.appendChild(lapTag);
    // localStorage.setItem('lapTime', lapTime.innerHTML.toString());
    //console.log(localStorage.getItem('lapTime'))
    setItem('tmp_ss', tmp_ss);
    setItem('tmp_mn', tmp_mn);
    setItem('tmp_hr', tmp_hr);
    lapLabel.innerHTML = lapCtn;
}

// Start the watch
startBtn.addEventListener('click', () => {
    if (startBtnCnt === 0) {
        timmerCounter = 'start'
        startBtnCnt++;
        ss++;
        disp.innerHTML = str;
        strtInterval = setInterval(startTimmer, 999);
    }
});

// Stopping the interval
stopBtn.addEventListener('click', stopTimmer);

//Lapping the time
lapBtn.addEventListener('click', () => {
    // setItem('tmp_ss', tmp_ss);
    // setItem('tmp_mn', tmp_mn);
    // setItem('tmp_hr', tmp_hr);
    lapping()
});

// Reset button
resetBtn.addEventListener('click', resetTimmer);

window.addEventListener('load', () => {
    setVal()
    //cnt = 0;
})

window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    let d = new Date();
    console.log("Page closed!!");
    console.log('sec:', d.getSeconds());
    console.log('min:', d.getMinutes());
    console.log('hr:', d.getHours())
    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
    let clt = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
    setItem('tmp_ss', tmp_ss);
    setItem('tmp_mn', tmp_mn);
    setItem('tmp_hr', tmp_hr);
    setItem('closeTime', clt);
    setItem('cnt', cnt);
    setItem('lapCtn', lapCtn);
    setItem('totalTime', totalTime.innerHTML);
    setItem('lapTime', lapTime.innerHTML.toString());
    console.log(str);
    console.log(localStorage.getItem('closeTime') - openTime);
    e.returnValue = closeTime;
})
if (window.open) {
    let d = new Date();
    let clt = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
    openTime = clt;
    setVal();
    console.log("Page opened!!");
    timeDiff = openTime - getItem('closeTime');
    let tmp_ss = timeDiff.toString().slice(-2);
    let tmp_mn = timeDiff.toString().slice(-4, -2);
    let tmp_hr = timeDiff.toString().slice(-6, -4);
    let tmp_ss60 = 0;
    let tmp_mn60 = 0;
    let tmp_hr24 = 0;
    if (tmp_ss === 6) {
        tmp60 = tmp_ss - 60;
        // if (tmp_mn >)
    }
    console.log('tmps_ss ', tmp_ss, ' tmp_mn ', tmp_mn, ' tmp_hr ', tmp_hr);
    console.log(ss, mn, hr);
    if (localStorage.getItem('timmerCnt') === 'start') {
        if (timeDiff.toString().length <= 2) {
            ss = parseInt(ss) + parseInt(tmp_ss);
            if (ss >= 60) {
                ss = ss - 60;
                mn++;
            }
            //console.log('ss ', ss);
            if (timeDiff.toString().length > 2 && timeDiff.toString().length <= 4) {
                ss = parseInt(ss) + parseInt(tmp_ss);
                mn = parseInt(mn) + parseInt(tmp_mn);
                //console.log('ss ', ss, ' mn ', mn);
                if (timeDiff.toString().length > 4 && timeDiff.toString().length <= 6) {
                    ss = parseInt(ss) + parseInt(tmp_ss);
                    mn = parseInt(mn) + parseInt(tmp_mn);
                    hr = parseInt(hr) + parseInt(tmp_hr);
                    //console.log('ss ', ss, ' mn ', mn, ' hr ', hr);
                }
            }
        }
        strtInterval = setInterval(startTimmer, 999);
    }
    if (history.childElementCount != 10) {
        setItem('cnt', history.childElementCount);
        console.log('cnt: ', cnt);
    }


    //console.log(openTime - localStorage.getItem('closeTime'), hr, mn, ss);
    setItem('second', ss);
    setItem('minute', mn);
    setItem('hour', hr);
    setVal();
}