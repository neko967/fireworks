document.addEventListener('DOMContentLoaded', function() {
  var clickCount = 0;
  var clickCountElement = document.getElementById('click-count');
  var timeLeft = 10;
  var timerElement = document.getElementById('timer');
  var startButton = document.getElementById('start-button');
  var countdownInterval;
  var size = 50;

  document.getElementById('click-button').addEventListener('click', function() {
    if (timeLeft > 0) {
      clickCount = clickCount + 1;
      clickCountElement.textContent = clickCount;
      size += 5;
      document.getElementById('click-button').style.width = size + 'px';
      document.getElementById('click-button').style.height = size + 'px';
      document.getElementById('hisaju').style.transform += "rotate(5deg)";
    }
  });
  
  startButton.addEventListener('click', function() {
    document.getElementById('click-button').style.display = "block"
    document.getElementById('reset-button').style.display = "block"
    startButton.style.display = 'none';

    countdownInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(countdownInterval);
        timerElement.textContent = 'Time\'s up!';
        document.getElementById('reset-button').style.display = "none"
        document.getElementById('again-button').style.display = "block"
        document.getElementById('launch-fireworks').style.display = "block" 
      }
    }, 1000);

    document.getElementById('reset-button').addEventListener('click', function() {
      clickCount = 0;
      clickCountElement.textContent = clickCount;

      startButton.style.display = 'block';
      document.getElementById('click-button').style.display = "none"
      document.getElementById('reset-button').style.display = "none"
      document.getElementById('launch-fireworks').style.display = "none"

      clearInterval(countdownInterval);
      timeLeft = 10;
      timerElement.textContent = timeLeft;

      size = 50;
      document.getElementById('click-button').style.width = size + 'px';
      document.getElementById('click-button').style.height = size + 'px';
      document.getElementById('start-button').style.width = "";
      document.getElementById('start-button').style.height = "";
    });
  });

  document.getElementById('again-button').addEventListener('click', function() {
    clickCount = 0;
    clickCountElement.textContent = clickCount;

    startButton.style.display = 'block';
    document.getElementById('click-button').style.display = "none"
    document.getElementById('again-button').style.display = "none"
    document.getElementById('launch-fireworks').style.display = "none"

    clearInterval(countdownInterval);
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    size = 50;
    document.getElementById('click-button').style.width = size + 'px';
    document.getElementById('click-button').style.height = size + 'px';
    document.getElementById('start-button').style.width = "";
    document.getElementById('start-button').style.height = "";
  });

  document.getElementById('launch-fireworks').addEventListener('click', function() {
    const value = clickCount;
    sessionStorage.setItem('value', value);
    window.location.href = '/fireworks';
  });
});



function targetAppear() {
  const target = document.querySelector('.hisaju')
  target.style.display = "block"
}
 
const keyArr = []
 
function onKeyDown(e) {
  keyArr.push(e.code)
  if (keyArr.length > 6) {
    keyArr.shift()
  }
  const konamiCommand = [
    'KeyH',
    'KeyI',
    'KeyS',
    'KeyA',
    'KeyJ',
    'KeyU',
  ]
  console.log(keyArr)
 
  if (String(keyArr) === String(konamiCommand)) {
    targetAppear()
  }
}
 
document.addEventListener('keydown', onKeyDown)
