(function() {
  'use strict';

  let stage = document.getElementById('stage');
  let ctx;
  let count = 0;
  // let dim = 5;
  let dim;
  let size;
  let answer = []; //配列
  let isPlaying = true;

  function init() {
    dim = Math.floor(count / 3) + 2;
    size = Math.floor(stage.width / dim);
    answer = [
      Math.floor(Math.random() * dim),
      Math.floor(Math.random() * dim)
    ];
  }

  function draw() {
    let offset = 2;
    let baseColor; //不正解
    let answerColor; //正解
    let hue;
    let lightness;

    hue = Math.random() * 360;
    baseColor = 'hsl(' + hue + ', 80%, 50%)';
    lightness = Math.max(75 - count, 53);
    answerColor = 'hsl(' + hue + ', 80%, ' + lightness + '%)';

    ctx.clearRect(0, 0, stage.width, stage.height);

    for (let x = 0; x < dim; x++) {
      for (let y = 0; y < dim; y++) {
        if (answer[0] === x && answer[1] === y) {
          ctx.fillStyle = answerColor;
        } else {
          ctx.fillStyle = baseColor;
        }
        ctx.fillRect(
          size * x + offset,
          size * y + offset,
          size - offset * 2,
          size - offset * 2
        );
      }
    }
  }

  if (typeof stage.getContext === 'undefined') {
    return;
  }
  ctx = stage.getContext('2d');
  // console.log(answer);

  stage.addEventListener('click', function(e) {
    let rect;
    let x;
    let y;
    let replay = document.getElementById('replay');
    if (isPlaying = false) {
      return;
    }
    // console.log(e.pageX);
    // console.log(e.pageY);
    rect = e.target.getBoundingClientRect(); //要素の寸法と、そのビューポートに対する位置
    // console.log(e.pageX - rect.left - window.scrollX);
    // console.log(e.pageY - rect.top - window.scrollY);
    x = e.pageX - rect.left - window.scrollX;
    y = e.pageY - rect.top - window.scrollY;
    // console.log(Math.floor(x / size));
    // console.log(Math.floor(y / size));
    if (
      answer[0] === Math.floor(x / size) &&
      answer[1] === Math.floor(y / size)
    ) {
      // console.log('hit');
      count++;
      init();
      draw();
    } else {
      alert('Your score' + count);
      isPlaying = false;
      replay.className = '';
    }
  });

  init();
  draw();
})();
