// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "staticpages/top"

document.addEventListener('DOMContentLoaded', function() {
  function setup() {
    // キャンバスの設定
    background(0);
    let canvas = document.getElementById('firework');
    let ctx = canvas.getContext('2d');
    canvas = createCanvas(480, 480);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    colorMode(RGB);
    frameRate(60);
  }
  function draw() {
    background(200);
    color(255);
    ellipse(240, 240, 20, 20);
  }
});
