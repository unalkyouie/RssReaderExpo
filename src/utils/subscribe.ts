export const subscribe = (callback: () => void) => {
    const interval = setInterval(callback, 500);
    return () => clearInterval(interval);
  };
  