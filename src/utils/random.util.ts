export const unique_incremental_timestamp: () => number = (() => {
  let fixator = 0;
  let prev = 0;
  return () => {
    const now = Date.now();
    let random = now;
    if (now === prev) {
      fixator++;
      random += fixator;
    } else if (prev > now) {
      random = ++prev;
      fixator = prev - now;
    } else {
      fixator = 0;
    }

    prev = random;

    return random;
  };
})();
