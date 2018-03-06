var secondsSpan = document.getElementsByClassName('timer__time-unit timer__time-unit--seconds')[0];
var minutesSpan = document.getElementsByClassName('timer__time-unit timer__time-unit--minutes')[0];
var hoursSpan = document.getElementsByClassName('timer__time-unit timer__time-unit--hours')[0];

var BIRTHDAY = new Date(2016, 8, 24);

function timer() {
  var now = new Date();
  var seconds = Math.floor((BIRTHDAY - now) / 1000);

  if (seconds < 0) {
    seconds = 0;
  }

  var hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  var minutes = Math.floor(seconds / 60);
  seconds %= 60;

  secondsSpan.textContent = (seconds < 10) ? "0" + seconds : seconds;
  minutesSpan.textContent = (minutes < 10) ? "0" + minutes : minutes;
  hoursSpan.textContent = (hours < 10) ? "0" + hours : hours;
}

timer();
setInterval(timer, 1000);