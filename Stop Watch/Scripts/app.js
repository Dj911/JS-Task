const disp = document.getElementById('disp');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const lapBtn = document.getElementById('lap-btn');


//let ms = 00;
let ss = 00;
let mn = 00;
let hr = 00;
//localStorage.setItem('milesecond', ms);
let strtInterval;

let d = new Date();

const setVal = () => {
    ms = localStorage.getItem('milesecond');
    ss = localStorage.getItem('second');
    mn = localStorage.getItem('minute');
    hr = localStorage.getItem('hour');    
    console.log('Page loaded');
    let str = `${hr.toString()}:${mn.toString()}:${ss.toString()}`
    disp.innerHTML = str2                                                           
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
    let str = `${hr.toString()}:${mn.toString()}:${ss.toString()}:${ms.toString()}`;
}


// Start the watch
startBtn.addEventListener('click', () => {
    strtInterval = setInterval(startTimmer, 1000);
});

// Stopping the interval
stopBtn.addEventListener('click', stopTimmer);

window.addEventListener('load', setVal)