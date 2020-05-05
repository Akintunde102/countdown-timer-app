import {useRef, useEffect} from 'react';
export function useInterval(callback: Function, delay: number | null) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

/**This converts time In Seconds to An Object  that is usable for React Native Manipulation
 *
 * @param timeInSeconds
 */
export const FormatTimeForDisplay = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  const timeObj = {
    minutes: minutes >= 100 ? minutes : ('0' + minutes).slice(-2),
    seconds: ('0' + seconds).slice(-2),
  };
  const formattedDisplay = `${timeObj.minutes}:${timeObj.seconds}`;
  const digitNumber = formattedDisplay.toString().length;
  return {
    ...timeObj,
    formattedDisplay,
    digitNumber,
  };
};
