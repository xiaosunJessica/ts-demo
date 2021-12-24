import React, { useEffect } from "react";
import "./index.css";

const Guaguaka = () => {
  useEffect(() => {
    const canvas: any = document.getElementById("canvas");
    console.log(canvas, "-----canvaisss");
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // 填充的颜色
      ctx.fillStyle = "darkgray";
      // 填充矩形 fillRect(起始X,起始Y,终点X,终点Y)
      ctx.fillRect(0, 0, 400, 100);
      ctx.fillStyle = "#fff";
      // 绘制填充文字
      ctx.fillText("刮刮卡", 180, 50);

      let isDraw = false;
      canvas.addEventListener("mousedown", () => {
        console.log(isDraw, "mousedown");
        isDraw = true;
      });

      canvas.addEventListener("mousemove", (e) => {
        console.log(isDraw, "mousemove");
        if (!isDraw) return;
        const x = e.pageX - canvas.offsetLeft;
        const y = e.pageY - canvas.offsetTop;
        // 设置globalCompositeOperation
        ctx.globalCompositeOperation = "destination-out";
        // 画圆
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        // 填充圆形
        ctx.fill();
      });
      canvas.addEventListener("mouseup", () => {
        console.log(isDraw, "mouseup");
        isDraw = false;
      });
    }
  }, [document.getElementById("canvas")]);
  return (
    <div className="guaguaka">
      <canvas id="canvas" width="400" height="100"></canvas>
      <div className="text">恭喜您获得100w</div>
    </div>
  );
};

export default Guaguaka;
