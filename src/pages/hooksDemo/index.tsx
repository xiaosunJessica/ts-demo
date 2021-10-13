import React from "react";
import useVirtualList from "../../component/hooks/useVirtualList";
const HooksDemo = () => {
  const { list, containerProps, wrapperProps } = useVirtualList(
    Array.from(Array(9999).keys()),
    {
      itemHeight: 60,
    }
  );

  return (
    <>
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
