import { useEffect, useRef, useState } from "react";
import { BasicTarget, getTargetElement } from "../utils/dom";

interface IRect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  height: number;
  width: number;
}

export interface IState extends IRect {
  text: string;
}

const initRect: IRect = {
  top: NaN,
  left: NaN,
  bottom: NaN,
  right: NaN,
  height: NaN,
  width: NaN,
};

const initState: IState = {
  text: "",
  ...initRect,
};

function getRectFromSelection(selection: Selection | null): IRect {
  if (!selection) {
    return initRect;
  }
  if (selection.rangeCount < 1) {
    return initRect;
  }

  const range = selection.getRangeAt(0);
  const { height, width, top, left, right, bottom } =
    range.getBoundingClientRect();
  return {
    top,
    left,
    bottom,
    right,
    height,
    width,
  };
}

function useTextSelection(target?: BasicTarget): IState {
  const [state, setState] = useState(initState);

  const stateRef = useRef(state);

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {};
    }

    const mouseupHandler = () => {
      let selObj: Selection | null = null;
      let text = "";
      let rect = initRect;
      if (!window.getSelection) return;
      selObj = window.getSelection();
      text = selObj ? selObj.toString() : "";
      if (text) {
        rect = getRectFromSelection(selObj);
        setState({ ...state, text, ...rect });
      }
    };

    const mousedownHandler = () => {
      if (!window.getSelection) return;
      if (stateRef.current.text) {
        setState({ ...initState });
      }
      const selObj = window.getSelection();
      if (!selObj) return;
      selObj.removeAllRanges();
    };

    el.addEventListener("mouseup", mouseupHandler);
    document.addEventListener("mousedown", mousedownHandler);

    return () => {
      el.removeEventListener("mouseup", mouseupHandler);
      document.removeEventListener("mousedown", mousedownHandler);
    };
  }, [typeof target === "function" ? undefined : target]);
  return {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 0,
    width: 0,
    text: "1",
  };
}

export default useTextSelection;
