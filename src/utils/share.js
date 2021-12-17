import browser from "@lianjia/helper/browser";
import WechatWorkEngine from "./engines/wechatWorkEngine";
import WechatEngine from "./engines/wechatEngine";
import BeikeEngine from "./engines/beikeEngine";

class Core {
  constructor() {
    const { userAgent } = navigator;
    this.engine = null;
    this.platform = {
      isWechat: browser.isWechat(),
      isWechatWork: browser.isWechatWork(),
      isLinkApp: browser.isLinkApp(),
      isBaichuan: /lianjiabaichuan/gim.test(userAgent),
      isBeike: /lianjiabeike/gim.test(userAgent),
      isAtom: /lianjiaatom/gim.test(userAgent),
      isAplus: /Alliance/gim.test(navigator.userAgent),
    };
    // 未执行队列,engine ready
    this.unCalledFns = []; // 降级模块

    this.degradeMap = {};
    this.options = {};
  }
  init(options) {
    this.options = options;
    this.setEngine();
    return this;
  }
  config(cb) {
    if (this.engine) {
      this.engine.config(cb);
    } else {
      if (cb) {
        cb(Promise.reject("groot engine尚未初始化, 请确认宿主环境"));
      }
    }
    return this;
  }
  /**
   * 注册降级
   * groot.registryDowngrade({
   *  ui: {
   *   closeWindow: ()=>{alert(window)}
   *  },
   *  base: {
   *   fnTest: ()=>{console.log()}
   *  }
   * })
   * @param {string} map 需要降级的模块/接口
   */
  degrade(fnMap) {
    if (toString.call(fnMap) === "[object Object]") {
      for (const [key, fn] of Object.entries(fnMap)) {
        this.degradeMap[key] = fn;
      }
    }
    return this;
  }
  /**
   * 调用降级方法
   * @param {string} interfaceName 接口名
   * @param {string|object|array} params 参数
   */
  callDegradeFn(interfaceName, params) {
    try {
      this.degradeMap[interfaceName](params);
    } catch (e) {
      console.log(`${interfaceName}未设置降级`);
    }
  }
  /**
   * 执行bridge方法
   * @param {string} interfaceName 接口名
   * @param {string|object|array} params 接口参数
   */
  async exec(interfaceName, params, cb) {
    const { engine } = this;
    if (!engine) {
      this.callDegradeFn(interfaceName, params, cb);
      return;
    }
    if (engine.isReady) {
      const isSupport = await engine.checkSupport(interfaceName, params, cb);
      if (isSupport) {
        engine.exec(interfaceName, params, cb);
      } else {
        this.callDegradeFn(interfaceName, params, cb);
      }
    } else {
      this.addUnCalledFns(interfaceName, params, cb);
    }
  }
  /**
   * 清除
   */
  clearCalledFns() {
    this.unCalledFns.forEach((o) => {
      this.exec(o.interfaceName, o.params, o.cb);
    });
    this.unCalledFns = [];
  }
  /**
   * 队列新增未调用的方法
   * @param {string} moduleName 模块名
   * @param {string} interfaceName 接口名
   * @param {object} 参数
   */
  addUnCalledFns(interfaceName, params, cb) {
    this.unCalledFns.push({
      interfaceName,
      params,
      cb,
    });
  }
  /**
   * 通过当前ua设置引擎
   */
  setEngine() {
    const { platform, options } = this;
    let engine;
    if (platform.isWechatWork) {
      engine = new WechatWorkEngine(options.base, options.wechatWork);
    }
    if (platform.isWechat && !platform.isWechatWork) {
      engine = new WechatEngine(options.base, options.wechat);
    }
    //贝壳app
    if (
      platform.isLinkApp ||
      platform.isAplus ||
      platform.isBaichuan ||
      platform.isAtom ||
      platform.isBeike
    ) {
      engine = new BeikeEngine(options.base, options.beike);
    }
    this.engine = engine;
    if (engine) {
      engine.on("ready", () => {
        this.clearCalledFns();
      });
      engine.on("error", () => {});
      engine.on("exec.error", (interfaceName, params, cb) => {
        this.callDegradeFn(interfaceName, params, cb);
      });
    }
  }
}
export default Core;
