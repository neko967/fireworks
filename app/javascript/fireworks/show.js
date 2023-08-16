//前のページから変数valueを受け取って、表示する
const value = sessionStorage.getItem('value');
document.getElementById('click-count').textContent = value

///////////////////////////////ここから花火のシステム////////////////////////////////////////////
//縦横の大きさとして、スクリーンの大きさを取得
const SCREEN_W = window.screen.width;
const SCREEN_H = window.screen.height;

//canvasの大きさをスクリーンの大きさに合わせる
let can = document.getElementById("canvas");
let con = can.getContext("2d");
can.width = SCREEN_W;
can.height = SCREEN_H;

//花火の色：パールホワイト・レモンイエロー・ライトレモン・ワインレッド・赤・紅葉色・スカイブルー・ツイッターブルー・ライムグリーン・桜色・アメジスト・紫
const colors = ["#fffef7", "#FFF450", "#FFFCBF", "#932e44", "#C7000B","#a61017","a0d8ef", "#1DA1F2", "#32CD32","#fdeeef", "#9E76B4","#884898"];
const hanabi_color = colors[Math.floor(Math.random() * colors.length)];
const zanzo_color  = colors[Math.floor(Math.random() * colors.length)];

//60fpsで花火の処理を更新する
setInterval(mainLoop, 1000/60);
function mainLoop() 
{
    update();
    draw();
}

//花火の配列
let hanabi = [];
let zanzo  = [];

//更新の関数を定義
function update()
{
    for(let i= hanabi.length-1; i >= 0; i--)
    {
        hanabi[i].update();
        if(hanabi[i].kill)hanabi.splice(i,1);
    }
    for(let i= zanzo.length-1; i >= 0; i--)
    {
        zanzo[i].update();
        if(zanzo[i].kill)zanzo.splice(i,1);
    }
}

//描画の関数を定義
function draw()
{
    con.fillStyle="#222222";
    con.fillRect(0, 0, SCREEN_W, SCREEN_H);

    for(let i= zanzo.length-1; i >= 0; i--)
    {
        zanzo[i].draw();
    }

    for(let i= hanabi.length-1; i >= 0; i--)
    {
        hanabi[i].draw();
    }
}

//rand関数を定義
function rand(min, max)
{
    return Math.floor(
        (Math.random()*(max-min+1))+min
    );
}

////花火の先端のやつのクラスを定義
class Hanabi
{
    constructor(x, y, vx, vy, gv, hp)
    {
        this.x  = x<<8;
        this.y  = y<<8;
        this.vx = vx;
        this.vy = vy;
        this.gv = gv;
        this.kill = false;
        
        if(hp==undefined)
        {
            this.hp=value*4;
            this.type = 0;
        }
        else
        {
            this.hp = hp;
            this.type = 1;
        }
    }

    //更新
    update()
    {
        if(this.kill)return;
        this.x  += this.vx;
        this.y  += this.vy;
        this.vy += this.gv;

        if(this.y>>8 > SCREEN_H) this.kill = true;
        if(this.type==0)
        {
            if(this.vy>0)
            {
                this.kill=true;
                
                for(let i=0; i<value*10; i++)
                {
                    let r = rand(0, 360);
                    let s = rand(10, 400);
                    let vx = Math.cos(r*Math.PI/180)*s;
                    let vy = Math.sin(r*Math.PI/180)*s;

                    hanabi.push(
                        new Hanabi(this.x>>8, this.y>>8, vx, vy, 1, value*4)
                    );
                }
            }
        }
        else
        {
            if( --this.hp==0 )this.kill=true;
        }
    }

    draw()
    {
        if(this.kill)return;

        con.globalAlpha= 1.0;
        con.fillStyle = hanabi_color;
        con.fillRect(this.x>>8, this.y>>8,2,2);
        zanzo.push(
            new Zanzo(this.x, this.y)
        );
    }
}

////花火の残像のクラスを定義
class Zanzo
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.c = 10;
        this.kill = false;
    }
    update()
    {
        if(this.kill)return;
        if(--this.c==0)this.kill=true;
    }
    draw()
    {
        if(this.kill)return;

        con.globalAlpha= 1.0 * this.c/10;
        con.fillStyle = zanzo_color;
        con.fillRect(this.x>>8, this.y>>8,2,2);
    }
}

//"手動で打ち上げる"ボタンを押した時の挙動
document.getElementById('manual-launch').addEventListener('click', function() {
    hanabi.push(
        new Hanabi(SCREEN_W/2, SCREEN_H, rand(-60, 60), rand(-1800, -1900), 10)
    );
});

//"自動で打ち上げる"ボタンを押した時の挙動
document.getElementById('auto-launch').addEventListener('click', function() {
    hanabi.push(
        new Hanabi(SCREEN_W/2, SCREEN_H, rand(-60, 60), rand(-1800, -1900), 10)
    );

    setInterval(function() {
        hanabi.push(
          new Hanabi(SCREEN_W/2, SCREEN_H, rand(-60, 60), rand(-1800, -1900), 10)
        );
    }, 6500);

    document.getElementById('auto-launch').style.display = "none"
});
///////////////////////////////////ここまで花火のシステム/////////////////////////////////////////

////////////////////////////////ここから背景の星空のアニメーション//////////////////////////////////
window.addEventListener("DOMContentLoaded", () => {
    // 星を表示するための親要素を取得
    const stars = document.querySelector(".stars");

    // 星を生成する関数
    const createStar = () => {
        const starEl = document.createElement("span");
        starEl.className = "star";
        const minSize = 1; // 星の最小サイズを指定
        const maxSize = 2; // 星の最大サイズを指定
        const size = Math.random() * (maxSize - minSize) + minSize;
        starEl.style.width = `${size}px`;
        starEl.style.height = `${size}px`;
        starEl.style.left = `${Math.random() * 100}%`;
        starEl.style.top = `${Math.random() * 100}%`;
        starEl.style.animationDelay = `${Math.random() * 10}s`;
        stars.appendChild(starEl);
    };

    // for文で星を生成する関数を指定した回数呼び出す
    for (let i = 0; i <= 500; i++) {
        createStar();
    }
});
//////////////////////////////////ここまで背景の星空のアニメーション//////////////////////////////////

//////////////////////////////////ここからシェアボタンの挙動//////////////////////////////////////////////
var shareUrl  = 'https://twitter.com/intent/tweet';
    shareUrl += '?text='+encodeURIComponent(`${value}kgの花火を打ち上げました！`);
    shareUrl += '&url='+encodeURIComponent('https://fireworks-svqb.onrender.com');
    shareUrl += '&hashtags='+encodeURIComponent('ミニアプリWeek,打ち上げ花火');
 
var shareArea = document.getElementById('fa-twitter');
var shareLink = '<a href="' + shareUrl + '" target="_blank" rel="nofollow noopener noreferrer"><i class="fa-brands fa-twitter"></i></a>';
shareArea.innerHTML = shareLink;
//////////////////////////////////ここまでシェアボタンの挙動//////////////////////////////////////////////