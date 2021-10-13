import { useEffect, useState } from "react";
import dayjs from "dayjs";

export type TDate = Date | number | string | undefined;

export type Options = {
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
  format?: "date" | "number";
};

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = ({ targetDate, interval, format }: Options) => {
  if (!targetDate) {
    return 0;
  }

  let left: any;
  if (format === "date") {
    left = dayjs(targetDate).valueOf() - new Date().getTime();
  }

  if (format === "number") {
    if (isNaN(Number(targetDate))) {
      left = 0;
    } else {
      left = (targetDate as number) - interval;
    }
  }
  if (left < 0) {
    return 0;
  }

  console.log(targetDate, "targetDatetargetDate", left);

  return left;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountDown = (options?: Options) => {
  const { targetDate, interval = 1000, onEnd, format = "date" } = options || {};

  const [target, setTargetDate] = useState<TDate>(targetDate);

  const [timeLeft, setTimeLeft] = useState(() =>
    calcLeft({
      targetDate: target,
      format,
      interval,
    })
  );

  useEffect(() => {
    console.log(target, "-----targettargettargettarget");
    if (!target) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(
      calcLeft({
        targetDate: target,
        format,
        interval,
      })
    );

    const timer = setInterval(() => {
      const targetLeft = calcLeft({
        targetDate: target,
        format,
        interval,
      });
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        if (typeof onEnd === "function") {
          onEnd();
        }
      }
    }, interval);
  }, [target, interval]);
  return [timeLeft, setTargetDate, parseMs];
};

export default useCountDown;
