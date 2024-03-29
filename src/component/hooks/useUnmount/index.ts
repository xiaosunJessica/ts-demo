/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import usePersistFn from "../usePersistFn";
import { isFunction } from "../utils";
const useUnmount = (fn: any) => {
  const fnPersist = usePersistFn(fn);
  useEffect(
    () => () => {
      if (isFunction(fnPersist)) {
        console.log("---useUmont----");
        fnPersist();
      }
    },
    []
  );
};

export default useUnmount;
