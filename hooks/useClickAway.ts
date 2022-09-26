import { useEffect, useRef } from "react";

const eventName = "mousedown";

const useClickAway = (handler: (e?: MouseEvent) => void) => {
  const ref = useRef(null);
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current as unknown as HTMLElement;
    if (!element) return undefined;

    const handleEvent = (e: MouseEvent) => {
      if (!element.contains(e.target as HTMLElement)) savedHandler.current(e);
    };

    document.addEventListener(eventName, handleEvent);

    return () => document.removeEventListener(eventName, handleEvent);
  }, [ref]);

  return ref;
};

export default useClickAway;
