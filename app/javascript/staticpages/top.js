console.log("staticpages/top.jsを読み込みました");

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

    let seventy_counts = window.setTimeout(function(){
      if (clickCount >= 70) {
        alert('実績を解除しました🏆[連打の鬼]\n\nすごいね!!  そういえばRUNTEQって何周年を迎えたっけ？');
      }
    }, 10500);

    let four_counts = window.setTimeout(function(){
      if (clickCount === 4) {
        alert('実績を解除しました🏆[I♡RUNTEQ]\n\n4回か〜〜そういえばRUNTEQも4周年だったね!!');
      }
    }, 10500);

    let ten_seconds = window.setTimeout(function(){
        alert('ちょっと〜〜〜何してんのよ〜〜〜！!');
    }, 10500);

    let thirty_seconds = window.setTimeout(function(){
        alert('さっさとやり直しなさいよ！!');
    }, 30000);

    let fourty_seconds = window.setTimeout(function(){
        alert('...');
    }, 40000);

    let one_minute = window.setTimeout(function(){
        alert('実績が解除されました 🏆[暇人]\n\nR,U,N,T,E,Q → Start ？');
    }, 60000);

    document.getElementById('click-button').addEventListener('click', function() {
      window.clearTimeout(ten_seconds);
      window.clearTimeout(thirty_seconds);
      window.clearTimeout(fourty_seconds);
      window.clearTimeout(one_minute);

    });

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

      window.clearTimeout(seventy_counts);
      window.clearTimeout(four_counts);
      window.clearTimeout(ten_seconds);
      window.clearTimeout(thirty_seconds);
      window.clearTimeout(fourty_seconds);
      window.clearTimeout(one_minute);
    });

    document.getElementById('again-button').addEventListener('click', function() {
      window.clearTimeout(ten_seconds);
      window.clearTimeout(thirty_seconds);
      window.clearTimeout(fourty_seconds);
      window.clearTimeout(one_minute);
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
});

function targetRotate() {
  document.getElementById('start-button').animate([
    {
      transform: 'rotate(1800deg)',
    },
  ], {
    duration: 1000,
  })
  document.getElementById('start-button').style.width = "200px";
  document.getElementById('start-button').style.height = "200px";
}
 
const keyArr = []
 
function onKeyDown(e) {

  keyArr.push(e.code)
  if (keyArr.length > 6) { keyArr.shift()}
  const runteqCommand = ['KeyR', 'KeyU', 'KeyN', 'KeyT', 'KeyE', 'KeyQ']
  console.log(keyArr)
  
  if (String(keyArr) === String(runteqCommand)) {
    targetRotate()
  }
}

document.addEventListener('keydown', onKeyDown)

