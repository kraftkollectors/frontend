import { useLayoutEffect, useRef } from "react";


export function useRunOnce(fn: () => void) {
    const hasRun = useRef(false);
    useLayoutEffect(() => {
        if (!hasRun.current)
            fn();
        hasRun.current = true
    }, []);
}