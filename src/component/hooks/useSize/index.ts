import { useLayoutEffect, useState } from "react";
import ResizeObserver from 'resize-observer-polyfill'
import { getTargetElement } from '../utils/dom';
type Size = { width?: number; height?: number};

const useSize = (target: any): Size => {
  const [state, setState] = useState<Size>(() => {
    const el = getTargetElement(target);
    return {
      width: ((el || {}) as HTMLElement).clientWidth,
      height: ((el || {}) as HTMLElement).clientHeight
    }
  })

  useLayoutEffect(() => {
    const el = getTargetElement(target);
    if (!el) {
      return () => {}
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setState({
          width: entry.target.clientWidth,
          height: entry.target.clientHeight
        })
      })
    })

    resizeObserver.observe(el as HTMLElement);

    return () => {
      resizeObserver.disconnect();
    }
  }, [target])
  return state
}

export default useSize;