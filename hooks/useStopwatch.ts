import { useState } from 'react';

/**
 * Measure and elapsed duration of time in milliseconds.
 *
 * @returns elapsedTime Time elapsed since the stopwatch started.
 * @returns isStopwatchRunning Whether the stopwatch is running or not.
 * @returns startStopwatch Starts the stopwatch.
 * @returns stopStopwatch Stops the stopwatch.
 * @returns resetStopwatch Resets the elapsed time to 0.
 */
export const useStopwatch = () => {
  const [stopwatch, setStopwatch] = useState<NodeJS.Timer>();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const startStopwatch = () => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 500);
    setStopwatch(interval);
    setIsStopwatchRunning(true);
  };

  const stopStopwatch = () => {
    clearInterval(stopwatch);
    setIsStopwatchRunning(false);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
  };

  return {
    elapsedTime,
    isStopwatchRunning,
    startStopwatch,
    stopStopwatch,
    resetStopwatch,
  };
};
