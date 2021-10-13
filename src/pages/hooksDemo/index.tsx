import React from "react";
import useVirtualList from "../../component/hooks/useVirtualList";
import useCountDown from "../../component/hooks/useCountDown";
const HooksDemo = () => {
  const { list, containerProps, wrapperProps } = useVirtualList(
    Array.from(Array(9999).keys()),
    {
      itemHeight: 60,
    }
  );

  const [timeLeft, setTargetDate, parseMs] = useCountDown({
    targetDate: new Date("2021/11/1"),
  });

  const dateResult = parseMs(timeLeft);
  return (
    <>
      <div>
        倒计时：{dateResult.days}天/{dateResult.hours}时/{dateResult.minutes}分/
        {dateResult.seconds}秒/{dateResult.milliseconds}毫秒
      </div>
      <div {...containerProps} style={{ height: "300px", overflow: "auto" }}>
        <div {...wrapperProps}>
          {list.map((ele) => (
            <div
              style={{
                height: 52,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #e8e8e8",
                marginBottom: 8,
              }}
              key={ele.index}
            >
              Row: {ele.data}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HooksDemo;
