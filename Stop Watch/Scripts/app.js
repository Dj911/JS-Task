const disp = document.getElementById('disp');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const lapBtn = document.getElementById('lap-btn');
const lapDisp = document.getElementById('lap-disp');
const resetBtn = document.getElementById('reset-btn');

let dispType = 'no-lap';
let timmerCounter;

//let ms = 00;
let ss = 00;
let mn = 00;
let hr = 00;
let tmp_ss = 0;
let tmp_mn = 0;
let tmp_hr = 0;

let cnt = 0;
let lapCtn = 0;
let lapT = 0;

let lapLabel = document.getElementById('lap');
let totalTime = document.getElementById('total-time');
let lapTime = document.getElementById('lap-time');
//localStorage.setItem('milesecond', ms);
let strtInterval;
let startBtnCnt = 0;
let ltime;
let str = `${hr}${mn}${ss}`;

let closeTime;   // Storing the last date when browser is closed
let openTime;
let timeDiff = 0;


const setVal = () => {
    ms = localStorage.getItem('milesecond');
    ss = localStorage.getItem('second');
    mn = localStorage.getItem('minute');
    hr = localStorage.getItem('hour');
    console.log('Page loaded');
    str = `${hr}:${mn}:${ss}`;
    disp.innerHTML = str;
    totalTime.innerHTML = localStorage.getItem('totalTime');
    lapTime.innerHTML = localStorage.getItem('lapTime');
    lapCtn = localStorage.getItem('lapCtn');
    lapLabel.innerHTML = lapCtn;
    //logHistory(ss, mn, hr, lapCtn)
}

const startTimmer = () => {
    localStorage.setItem('second', ss);
    localStorage.setItem('minute', mn);
    localStorage.setItem('hour', hr);
    localStorage.setItem('timmerCnt', 'start');
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
    //clearInterval(strtInterval);
}

// Will stop the startInterval function on  the "Start" btn
const stopTimmer = () => {
    //startBtn.hidden = false;
    // timmerCounter = 'stop'
    localStorage.setItem('timmerCnt', 'stop');
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
    //lapTime.innerText = 'Lap Time:';
    totalTime.innerText = '';
    lapTime.innerHTML = '';
    // timmerCounter = 'stop';
    localStorage.setItem('second', ss);
    localStorage.setItem('minute', mn);
    localStorage.setItem('hour', hr);
    localStorage.setItem('timmerCnt', 'stop');
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
    dispType = 'lap';
    //ltime = `${hr - tmp_hr}:${mn - tmp_mn}:${ss - tmp_ss}`;
    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
    lapCtn++;
    let lap = document.getElementById('lap');
    //let lapTag = document.createElement('br');
    //lapTag.id = 'lap-time';
    tmp_ss = ss;
    tmp_mn = mn;
    tmp_hr = hr;
    console.log(tmp_hr, tmp_mn, tmp_ss);
    lap.innerHTML = lapCtn;
    // lapT = str;
    totalTime.innerHTML = str;
    let text = `${str} Lap: ${lapCtn} <br />`;
    //lapTime.insertAdjacentText('beforeend', text);
    lapTime.insertAdjacentHTML("beforeend", text);
    localStorage.setItem('totalTime', totalTime.innerHTML);
    localStorage.setItem('lapCtn', lapCtn);
    //console.log(strtInterval);    
    //lapTime.appendChild(lapTag);
    localStorage.setItem('lapTime', lapTime.innerHTML.toString());
    //console.log(localStorage.getItem('lapTime'))
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
        //startBtn.hidden = true;
        //startBtn.classList.toggle('visibility');
    }
});

// Stopping the interval
stopBtn.addEventListener('click', stopTimmer);

//Lapping the time
lapBtn.addEventListener('click', lapping);

// Reset button
resetBtn.addEventListener('click', resetTimmer);

window.addEventListener('load', () => {
    setVal()
})
/* let test = `${}:${tmp_mn}:${tmp_ss}`; */

// window.onclose = ()=>{
//     let d = new Date();
//     console.log("Page closed!!");
//     str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
//     closeTime = 
//     localStorage.setItem('closeTime',d.getTime());
//     /* test = `${tmp_hr}:${tmp_mn}:${tmp_ss}`; */
//     console.log(str);
//     alert(closeTime);
// }

window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    let d = new Date();
    console.log("Page closed!!");
    console.log('sec:', d.getSeconds());
    console.log('min:', d.getMinutes());
    console.log('hr:', d.getHours())
    str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`;
    let clt = `${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
    localStorage.setItem('closeTime', clt);
    // closeTime = d.getTime();
    // if(ss != 0){
    //     console.log(hr,mn,d.getSeconds() - parseInt(ss));
    //     if(mn != 0){
    //         console.log(hr,d.getMinutes() - parseInt(mn),d.getSeconds() - parseInt(ss));
    //         if(hr != 0){
    //             console.log(d.getHours() - parseInt(hr),d.getMinutes() - parseInt(mn),d.getSeconds() - parseInt(ss));
    //         }
    //     }
    // }
    /* test = `${tmp_hr}:${tmp_mn}:${tmp_ss}`; */
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
    timeDiff = openTime - localStorage.getItem('closeTime');
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
    //console.log(openTime - localStorage.getItem('closeTime'), hr, mn, ss);
    localStorage.setItem('second', ss);
    localStorage.setItem('minute', mn);
    localStorage.setItem('hour', hr);
    setVal();
    /* if (ss != 0) {
        console.log(hr, mn, d.getSeconds() - parseInt(ss));
        if (mn != 0) {
            console.log(hr, d.getMinutes() - parseInt(mn), d.getSeconds() - parseInt(ss));
            if (hr != 0) {
                console.log(d.getHours() - parseInt(hr), d.getMinutes() - parseInt(mn), d.getSeconds() - parseInt(ss));
            }
        }
    } */
    /* console.log(test); */
    //console.log(str);
}