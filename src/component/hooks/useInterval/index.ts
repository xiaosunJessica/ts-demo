import { useEffect, useRef } from 'react';

const useInterval = (
  fn: () => void,
  delay?: number
) => {
  const fnRef = useRef<()=> void>();
  fnRef.current = fn
  useEffect(() => {
    const timer =setInterval(() => {
      fnRef.current?.()
    }, delay)
    return () => {
      clearInterval(timer)
    }
  }, [delay])
  // useEffect(() => {
  //   const timer =setInterval(() => {
  //     fn?.()
  //   }, delay)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [delay])
}

export default useInterval;