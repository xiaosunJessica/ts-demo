/* eslint-disable no-loop-func */
import React, { useEffect } from "react";
import Lottery from "./lottery";
import "./index.css";
const NineGrid = () => {
  useEffect(() => {
    setTimeout(() => {
      const start: any = document.querySelector(".start");

      const W = 656;
      const H = 694;
      let lottery: any = null;
      let panImg: any = null;
      let isRuning = false; // 是否正在抽奖

      // 页面初始化
      const pageInit = () => {
        setTimeout(() => {
          imgLoad(
            [
              "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15ac5fb1aeb94d0cb92f19a70722b652~tplv-k3u1fbpfcp-watermark.image?",
            ],
            () => complete()
          );
        }, 2000);
      };

      pageInit();

      // 图片加载
      function imgLoad(imgList, callback) {
        let count = 0,
          total = imgList.length;
        for (let i = 0; i < total; i++) {
          let img = new Image();
          img.src = imgList[i];
          img.onload = function () {
            count++;
            if (i === 0) panImg = img;
            if (count === total) {
              callback && callback();
            }
          };
        }
      }

      // change process

      // 在 canvas 明确各个奖项 和 开始按钮的位置，内部再做缩放
      function complete() {
        lottery = new Lottery({
          canvas: document.getElementById("canvas"),
          image: panImg,
          width: W,
          height: H,
          pos: [
            { x: 72, y: 92, width: 172, height: 172 },
            { x: 244, y: 92, width: 172, height: 172 },
            { x: 416, y: 92, width: 172, height: 172 },
            { x: 416, y: 266, width: 172, height: 172 },
            { x: 416, y: 440, width: 172, height: 172 },
            { x: 244, y: 440, width: 172, height: 172 },
            { x: 72, y: 440, width: 172, height: 172 },
            { x: 72, y: 266, width: 172, height: 172 },
          ],
          btnOpt: { x: 244, y: 266, width: 172, height: 172 },
        });
      }

      // 模拟服务端请求
      const getPrize = () => {
        const hasPrize = Math.random() > 0.5;

        let prize;

        // 格子顺时针从 0 开始
        if (hasPrize) {
          // 未中奖位置 1 和 5
          prize = Math.random() > 0.5 ? 1 : 5;
        } else {
          // 中奖位置 0、2、3、4、6、7
          prize = 4;
        }

        return new Promise((resolve) =>
          setTimeout(() => {
            resolve(prize);
          }, 2000)
        );
      };

      start.addEventListener(
        "click",
        () => {
          if (isRuning) {
            return;
          }

          isRuning = true;

          // 跑起来
          lottery.run();

          // 获取奖项及结束
          getPrize().then((prize) => {
            lottery.endWidth(prize, () => {
              isRuning = false;
              // alert([1, 5].includes(prize) ? '很遗憾，未中奖' : '恭喜你，中奖啦');
            });
          });
        },
        false
      );
    }, 2000);
  }, []);
  return (
    <>
      {/* <div className="loading">
        <div className="progress">
          <p>载入中，请稍候 ...</p>
          <ul>
            <li></li>
          </ul>
        </div>
      </div> */}
      <div className="pan">
        <canvas id="canvas" width="656" height="694"></canvas>
        <span className="start"></span>
      </div>
    </>
  );
};

export default NineGrid;
