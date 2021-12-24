interface Window {
  addEventListener: any;
  webkitRequestAnimationFrame: any;
}

interface Math {
  tween: any;
}

declare var self: Window & typeof globalThis;
