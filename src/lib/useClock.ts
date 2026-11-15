import { useEffect, useState } from 'react';

export const useClock = (interval = 1000) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(t);
  }, [interval]);
  return now;
};
