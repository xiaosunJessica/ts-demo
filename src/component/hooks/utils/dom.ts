import { MutableRefObject } from "react";

export type BasicType <T = HTMLElement> = 
| (() => T | null)
| T
| null
| MutableRefObject<T | null | undefined>;

type TargetElement = HTMLElement | Element | Document | Window;

export const getTargetElement = (
  target?: BasicType<TargetElement>,
  defaultElement?: TargetElement
): TargetElement|undefined|null => {
  if (!target) {
    return defaultElement
  }

  let targetElement: TargetElement | undefined | null;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target ) {
    targetElement = target.current
  } else {
    targetElement = target;
  }

  return targetElement
}
