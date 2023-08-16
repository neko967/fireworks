//top画面でのボタンのあれこれ
document.addEventListener('DOMContentLoaded', function() {
  var clickCount = 0;
  var clickCountElement = document.getElementById('click-count');
  var timeLeft = 10;
  var timerElement = document.getElementById('timer');
  var startButton = document.getElementById('start-button');
  var countdownInterval;
  var size = 50;

  //花火の玉の画像を押すごとにカウントが1ずつ増え、大きさが5px大きくなる
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
  
  //スタートボタンを押すと花火の玉とやり直すボタンが出現し、スタートボタンは消える
  startButton.addEventListener('click', function() {
    document.getElementById('click-button').style.display = "block"
    document.getElementById('reset-button').style.display = "block"
    startButton.style.display = 'none';

    //カウントダウンを始める
    countdownInterval = setInterval(function() {
      timeLeft--;
      timerElement.textContent = timeLeft;

      //0秒になったらカウントダウンを止めて、ボタンを消したり表示したりする
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

  //"もう一度"ボタンを押した時の挙動
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

  //"花火を打ち上げにいく"ボタンを押すと、クリック数を変数valueに入れて、次のページに持ち越す
  document.getElementById('launch-fireworks').addEventListener('click', function() {
    const value = clickCount;
    sessionStorage.setItem('value', value);
  });
});



//ただのひさじゅ校長の隠しコマンドなので気にしないで（スタート画面で"hisaju"と打つと校長が現れます）
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
