import { useState, useEffect } from "react";

enum ASYNC_STATUS {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export function useAsync(func: () => Promise<void>): ASYNC_STATUS {
  const [status, setStatus] = useState<ASYNC_STATUS>(ASYNC_STATUS.PENDING);

  useEffect(() => {
    func()
      .then(() => {
        setStatus(ASYNC_STATUS.FULFILLED);
      })
      .catch(() => {
        setStatus(ASYNC_STATUS.REJECTED);
      });
  }, [func]);

  return status;
}
