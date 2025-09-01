import { useEffect, useState } from 'react';

export function NumberCounter({
    value,
    countInterval = 100
}: {
    value: number,
    countInterval?: number
}) {
  const [displayedCount, setDisplayedCount] = useState(0);

  /*
  useEffect(() => {
    const interval = setInterval(() => {
        setDisplayedCount((prev) => {
            if (prev === value) return prev;
            let direction = prev < value ? 1 : -1;
            if (Math.abs(prev - value) > 10) direction *= 10
            if (Math.abs(prev - value) > 100) direction *= 10
            if (Math.abs(prev - value) > 1000) direction *= 10
            return prev + direction;
        });
    }, countInterval)
    return () => clearInterval(interval);
  }, [value]);
  */
  useEffect(() => {
    let animationFrameId: number;

    const updateCount = () => {
      setDisplayedCount((prev) => {
        if (Math.abs(prev - value) < 0.5) {
          return prev;
        }
        return prev + (value - prev) * 0.1;
      });
      animationFrameId = requestAnimationFrame(updateCount);
    };
    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return (<>{Math.round(displayedCount)}</>);
}