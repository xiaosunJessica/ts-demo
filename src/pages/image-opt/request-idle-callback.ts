/* eslint-disable no-restricted-globals */
export const requestIdleCallback =
  (typeof self !== "undefined" &&
    self.requestIdleCallback &&
    self.requestIdleCallback.bind(window)) ||
  function (cb: IdleRequestCallback): number {
    let start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        },
      });
    }, 1) as unknown as number;
  };

export const cancelIdleCallback =
  (typeof self !== "undefined" &&
    self.cancelIdleCallback &&
    self.cancelIdleCallback.bind(window)) ||
  function (id: number) {
    return clearTimeout(id);
  };
