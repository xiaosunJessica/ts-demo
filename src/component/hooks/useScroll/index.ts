import { useEffect, useState } from "react";
import usePersistFn from "../usePersistFn";
import { BasicTarget, getTargetElement } from "../utils/dom";

interface Position {
  left: number;
  top: number;
}

export type Target = BasicTarget<HTMLElement | Document>;

export type ScrollListenController = (val: Position) => boolean;

function useScroll(
  target?: Target,
  shoulUpdate: ScrollListenController = () => true
): Position {
  const [position, setPosition] = useState<Position>({
    left: NaN,
    top: NaN,
  });

  const shouldUpdatePersist = usePersistFn(shoulUpdate);

  useEffect(() => {
    const el = getTargetElement(target, document);

    if (!el) return;

    function updatePosition(currrentTarget: Target): void {
      let newPosition;
      if (currrentTarget === document) {
        if (!document.scrollingElement) return;
        newPosition = {
          left: document.scrollingElement.scrollLeft,
          top: document.scrollingElement.scrollTop,
        };
      } else {
        newPosition = {
          left: (currrentTarget as HTMLElement).scrollLeft,
          top: (currrentTarget as HTMLElement).scrollTop,
        };
      }

      if (shouldUpdatePersist(newPosition)) {
        setPosition(newPosition);
      }
    }

    updatePosition(el as Target);
    function listener(event: Event): void {
      if (!event.target) return;
      updatePosition(event.target as Target);
    }

    el.addEventListener("scroll", listener);
    return () => {
      el.removeEventListener("scroll", listener);
    };
  }, [target, shouldUpdatePersist]);
  return position;
}

export default useScroll;
