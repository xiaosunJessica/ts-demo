/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import "./index.css";
const Dazhuanpan = () => {
  let getEle = document.getElementsByClassName.bind(document);
  let currentDeg: any;
  let pointerRef: any = useRef();
  let resultRef: any = useRef();
  let lights = Array.prototype.slice.call(getEle("light"));

  let onRotation = false; // 记录当前是否正在旋转，如果正在旋转，就不能继续点击了
  let reward = [
    "谢谢参与",
    "50积分",
    "谢谢参与",
    "100元话费",
    "50积分",
    "谢谢参与",
    "100元话费",
    "谢谢参与",
    "50积分",
    "10元话费",
  ];

  // 根据随机角度获取奖励
  let getReward = (function () {
    currentDeg = 0;
    return function () {
      // 转三圈到四圈
      let rotateDeg = Math.random() * 360 + 1080;
      currentDeg += rotateDeg;
      let rewardText = reward[Math.floor(((currentDeg + 18) % 360) / 36)];
      return {
        deg: currentDeg,
        text:
          rewardText === "谢谢参与"
            ? "很遗憾，您没有获得奖品。"
            : "恭喜获得: " + rewardText,
      };
    };
  })();

  useEffect(() => {
    pointerRef.current.addEventListener("click", () => {
      if (onRotation) return;
      console.log("开始抽奖");
      onRotation = true;
      lights.forEach((light) => {
        light.className += " light-twinkling";
      });
      let nextStatus = getReward();
      console.log(nextStatus);
      resultRef.current.innerText = nextStatus.text;
      resultRef.current.style.display = "none";
      pointerRef.current.style.transform = `rotateZ(${nextStatus.deg}deg)`;
    });
    pointerRef.current.addEventListener("transitionend", () => {
      console.log("抽奖结束");
      setTimeout(() => {
        // 等闪烁三下结束
        onRotation = false;
        lights.forEach((light) => {
          light.className = "light";
        });
        resultRef.current.style.display = "block";
      }, 300);
    });
  }, []);
  return (
    <div>
      <div className="wrapper">
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="light"></div>
        <div className="panel">
          <div className="sector">
            <div className="sector-inner">
              <span>谢谢参与</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span> 5 0 积分</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span>谢谢参与</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span>100元话费</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span> 5 0 积分</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span>谢谢参与</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span>100元话费</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span>谢谢参与</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span> 5 0 积分</span>
            </div>
          </div>
          <div className="sector">
            <div className="sector-inner">
              <span>10元话费</span>
            </div>
          </div>
          <div className="pointer" ref={pointerRef}>
            开始抽奖
          </div>
        </div>
      </div>
      <div className="result" ref={resultRef}></div>
    </div>
  );
};

export default Dazhuanpan;
