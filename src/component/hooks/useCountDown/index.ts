import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import usePersistFn from "../usePersistFn";

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

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

const calcLeft = ({
  t,
  format = "date",
  interval = 1000,
}: {
  t?: TDate;
  format?: "date" | "number";
  interval?: number;
}) => {
  if (!t) {
    return 0;
  }
  let left;
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  if (format === "number") {
    left = t <= interval ? 0 : Number(t) - interval;
    return left;
  }
  left = dayjs(t).valueOf() - new Date().getTime();
  if (left < 0) {
    return 0;
  }
  return left;
};

const useCountdown = (options?: Options) => {
  const { targetDate, interval = 1000, onEnd, format } = options || {};

  const [target, setTargetDate] = useState<TDate>(targetDate);

  const [timeLeft, setTimeLeft] = useState(() =>
    calcLeft({
      t: target,
      format,
      interval,
    })
  );

  useEffect(() => {}, []);
  const onEndPersistFn = usePersistFn(() => {
    if (onEnd) {
      onEnd();
    }
  });

  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft((t) => {
      if (format === "number") {
        return calcLeft({
          t,
          format,
          interval,
        });
      }
      calcLeft({
        t: target,
        format,
        interval,
      });
    });

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 0) {
          clearInterval(timer);
          onEndPersistFn();
          return 0;
        }
        if (format === "number") {
          return calcLeft({
            t,
            format,
            interval,
          });
        }
        return calcLeft({
          t: target,
          format,
          interval,
        });
      });
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft);
  }, [timeLeft]);

  return [timeLeft, setTargetDate, formattedRes] as const;
};

export default useCountdown;
