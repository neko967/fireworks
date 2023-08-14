console.log("firewokrs/show.jsを読み込みました");

const value = sessionStorage.getItem('value');
document.getElementById('click-count').textContent = value

const SCREEN_W = window.screen.width;
const SCREEN_H = window.screen.height;

let can = document.getElementById("can");
let con = can.getContext("2d");
const colors = ["#ffee88", "#C7000B", "#CB4829", "#FFFCDB"];
const color1 = colors[Math.floor(Math.random() * colors.length)];
const color2 = colors[Math.floor(Math.random() * colors.length)];

can.width = SCREEN_W;
can.height = SCREEN_H;

setInterval(mainLoop, 1000/60);

function rand(min, max)
{
    return Math.floor(
        (Math.random()*(max-min+1))+min
    );
}

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
        con.fillStyle = color1;
        con.fillRect(this.x>>8, this.y>>8,2,2);
    }
}

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
            this.hp=200;
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
                
                for(let i=0; i<value*9; i++)
                {
                    let r = rand(0, 360);
                    let s = rand(10, 400);
                    let vx = Math.cos(r*Math.PI/180)*s;
                    let vy = Math.sin(r*Math.PI/180)*s;

                    hanabi.push(
                        new Hanabi(this.x>>8, this.y>>8, vx, vy, 1, 200)
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
        con.fillStyle = color2;
        con.fillRect(this.x>>8, this.y>>8,2,2);
        zanzo.push(
            new Zanzo(this.x, this.y)
        );
    }
}

//花火の配列
let hanabi = [];
let zanzo  = [];

//更新
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

//描画
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

//メインループ
function mainLoop() 
{
    update();
    draw();
}

document.getElementById('manual-launch').addEventListener('click', function() {
    hanabi.push(
        new Hanabi(SCREEN_W/2, SCREEN_H, rand(-60, 60), rand(-1700, -1800), 10)
    );
});

document.getElementById('auto-launch').addEventListener('click', function() {
  setInterval(function() {
    hanabi.push(
      new Hanabi(SCREEN_W/2, SCREEN_H, rand(-60, 60), rand(-1700, -1800), 10)
    );
  }, 3500);
  document.getElementById('auto-launch').style.display = "none"
});
