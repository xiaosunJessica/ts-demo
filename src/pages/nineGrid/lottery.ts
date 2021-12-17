const requestAnimationFrame1 = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

class Lottery {
  canvas: any;
  ctx: any;
  width: number;
  height: number;
  image: string;
  r: any;
  start: number;
  end: number | null;
  dura: number;
  angel: number;
  pos: number;
  prize?: any;
  isRunning: boolean;
  constructor(opts) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = opts.width;
    this.height = opts.height;
    this.image = opts.image;
    this.r = null;
    this.start = 0;
    this.end = null;
    this.dura = 700; // 持续多少帧(等价运行时间)
    this.angel = 360 / 8;
    this.pos = opts.pos;
    this.prize = undefined;
    this.isRunning = false;
    this.init();
  }
  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.drawReset();
    this.initTween();
  }
  drawReset() {
    this.ctx.drawImage(this.image, 0, 0);
  }
  run(prize, fn) {
    if (this.isRunning) return false;
    this.isRunning = true;
    this.prize = prize;
    let self = this;
    this.end = 3600 + this.angel * prize + 10;

    function rAF() {
      self.start++;
      var nd = Math.tween.Cubic.easeInOut(self.start, 0, self.end, self.dura);
      var md = Math.floor((nd % 360) / self.angel);

      var a = Math.floor(self.start / 15),
        b = self.start % 15;
      self.draw(a, md);

      if (self.start < self.dura) {
        self.r = requestAnimationFrame1(rAF);
      } else {
        cancelAnimationFrame(rAF as any);
        self.over(fn);
      }
    }

    this.r = requestAnimationFrame1(rAF);
  }
  draw(n, m) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.image, 0, -this.height * (n % 2));

    this.ctx.fillStyle = "rgba(0,0,0,0.6)";
    this.ctx.lineWidth = 5;
    this.ctx.fillRect(
      this.pos[m].x,
      this.pos[m].y,
      this.pos[m].width,
      this.pos[m].height
    );
  }
  over(fn) {
    fn && fn();
  }
  initTween() {
    const Tween = {
      Cubic: {
        easeInOut: function (t, b, c, d) {
          if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
          return (c / 2) * ((t -= 2) * t * t + 2) + b;
        },
      },
    };
    Math.tween = Tween;
  }
  reset() {
    this.r = null;
    this.start = 0;
    this.end = null;
    this.isRunning = false;
  }
}

export default Lottery;
