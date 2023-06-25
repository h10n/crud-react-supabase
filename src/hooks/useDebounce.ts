import { debounce } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";

const useDebounce = (callback, delay = 500) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args) => {
      ref.current?.(...args);
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};

export default useDebounce;
