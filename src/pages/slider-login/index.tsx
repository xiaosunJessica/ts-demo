import React from "react";
import Vertify from "./verify";

const SliderLogin = () => {
  return (
    <Vertify
      width={320}
      height={160}
      visible={true}
      onSuccess={() => alert("success")}
      onFail={() => alert("fail")}
      onRefresh={() => alert("refresh")}
    />
  );
};
export default SliderLogin;
