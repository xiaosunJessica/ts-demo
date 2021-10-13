/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useRef, MutableRefObject, useState, useMemo } from "react";

import useSize from "../useSize";

export interface OptionType {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
}

export default <T = any>(list: T[], options: OptionType) => {
  const containerRef = useRef<HTMLElement | null>();
  const size = useSize(containerRef as MutableRefObject<HTMLElement>);

  const [state, setState] = useState({ start: 0, end: 10 });

  const { itemHeight, overscan = 0 } = options;

  if (!itemHeight) {
    console.warn("please enter a valid itemHeight");
  }

  const getOffset = (scrollTop: number) => {
    if (typeof itemHeight === "number") {
      return Math.floor(scrollTop / itemHeight) + 1;
    }

    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = (itemHeight as (index: number) => number)[i];
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }

    return offset + 1;
  };

  const getViewCapacity = (containerHeight: number) => {
    if (typeof itemHeight === "number") {
      return Math.ceil(containerHeight / itemHeight);
    }

    const { start = 0 } = state;

    let sum = 0;
    let capacity = 0;
    for (let i = start; i < list.length; i++) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }

    return capacity - start;
  };

  const calculateRange = () => {
    const element = containerRef.current;

    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);

      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;

      setState({
        start: from < 0 ? 0 : from,
        end: to > list.length ? list.length : to,
      });
    }
  };

  const getDistanceTop = (index: number) => {
    if (typeof itemHeight === "number") {
      const height = index * itemHeight;
      return height;
    }

    const height = list
      .slice(0, index)
      .reduce((sum, _, i) => sum + itemHeight(i), 0);
    return height;
  };

  const scrollTo = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  useEffect(() => {
    calculateRange();
  }, [size.height, size.width, list.length]);

  const totalHeight = useMemo(() => {
    if (typeof itemHeight === "number") {
      return list.length * itemHeight;
    }

    return list.reduce((sum, _, i) => sum + itemHeight(i), 0);
  }, [list.length]);

  const offsetTop = useMemo(() => getDistanceTop(state.start), [state.start]);

  return {
    list: list.slice(state.start, state.end).map((ele, index) => ({
      data: ele,
      index: index + state.start,
    })),
    scrollTo,
    containerProps: {
      ref: (ele: any) => {
        containerRef.current = ele;
      },
      onScroll: (e: any) => {
        e.preventDefault();
        calculateRange();
      },
      styles: { overflowY: "auto" },
    },
    wrapperProps: {
      style: {
        width: "100%",
        height: totalHeight - offsetTop,
        marginTop: offsetTop,
      },
    },
  };
};
