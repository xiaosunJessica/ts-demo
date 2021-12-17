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
  width: any;
  height: any;
  image: string;
  btnOpt: any;
  pos: number[];
  index: number;
  count: number;
  timer: any;
  speed: number;
  times: number;
  cycle: number;
  prize: number;
  isRunning: boolean;
  toEnd: boolean;
  fn: any;
  constructor(opts) {
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = opts.width;
    this.height = opts.height;
    this.image = opts.image;
    this.btnOpt = opts.btnOpt;
    this.pos = opts.pos;
    this.index = 0; //当前移动到哪个位置，起点位置
    this.count = opts.pos.length; //总共有多少个位置
    this.timer = null; //setTimeout的ID，用clearTimeout清除
    this.speed = 100; //初始转动速度
    this.times = 0; //转动次数
    this.cycle = 50; //即至少需要转动多少次再进入抽奖环节
    this.prize = -1; //中奖位置
    this.isRunning = false;
    this.toEnd = false;
    this.init();
  }
  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.reset();
  }
  run() {
    if (this.isRunning) return false;
    this.isRunning = true;
    let self: any = this;

    console.log(self, "----selft----");
    loop();

    function loop() {
      self.times++;
      if (self.times > self.cycle && self.prize == self.index) {
        clearTimeout(self.timer);
        self.fn && self.fn();
      } else {
        if (self.times < self.cycle) {
          self.speed -= 10;
        } else if (self.times == self.cycle) {
          // self.prize = 1;
        } else {
          if (
            self.times > self.cycle + 10 &&
            ((self.prize == 0 && self.index == 7) ||
              self.prize == self.index + 1)
          ) {
            self.speed += 110;
          } else {
            self.speed += 20;
          }
        }

        if (self.speed < 30) {
          self.speed = 30;
        }

        self.timer = setTimeout(loop, self.speed);
      }

      // rotate(Math.floor(self.index / 15), self.index);
      rotate(Math.floor(self.times / 2), self.index);
      self.index++;
      if (self.index > self.count - 1) self.index = 0;
    }

    function rotate(n, m) {
      self.ctx.clearRect(0, 0, self.width, self.height);
      self.ctx.drawImage(self.image, 0, -self.height * (n % 2));
      self.ctx.fillStyle = "rgba(0,0,0,0.6)";
      self.ctx.fillRect(
        self.btnOpt.x,
        self.btnOpt.y,
        self.btnOpt.width,
        self.btnOpt.height
      );
      for (let i = 0, len = self.pos.length; i < len; i++) {
        i !== m &&
          self.ctx.fillRect(
            self.pos[i].x,
            self.pos[i].y,
            self.pos[i].width,
            self.pos[i].height
          );
      }
    }
  }
  endWidth(prize, fn) {
    this.prize = prize;
    this.fn = fn;
    this.toEnd = true;
  }
  reset() {
    this.timer = null;
    this.speed = 100;
    this.times = 0;
    this.prize = -1;
    this.isRunning = false;
    this.ctx.drawImage(this.image, 0, 0);
  }
}

export default Lottery;
