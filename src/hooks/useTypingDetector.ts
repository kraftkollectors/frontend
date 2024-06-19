

import { debugLog } from '@/functions/helpers';
import { useState, useEffect, useRef } from 'react';


export function useTypingDetector(delayBeforeTyping = 2000, delayBeforeStoppedTyping = 3000) {
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<any>(null);
    const stoppedTypingTimeoutRef = useRef<any>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = () => {
        setIsTyping(true);
        clearTimeout(stoppedTypingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            // debugLog('typing');
        }, delayBeforeTyping);
    };

    const handleKeyUp = () => {
        clearTimeout(typingTimeoutRef.current);
        stoppedTypingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            // debugLog('stopped typing');
        }, delayBeforeStoppedTyping);
    };

    const handleBlur = () => {
        clearTimeout(typingTimeoutRef.current);
        stoppedTypingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            // debugLog('blur: stopped typing');
        }, delayBeforeStoppedTyping / 2);
    };

    useEffect(() => {
        if (!inputRef || !inputRef.current) return;
        const element = inputRef.current;
        element.addEventListener('keydown', handleKeyDown);
        element.addEventListener('keyup', handleKeyUp);
        element.addEventListener('blur', handleKeyUp);
        return () => {
            if (!inputRef || !element) return;
            element.removeEventListener('keydown', handleKeyDown);
            element.removeEventListener('keyup', handleKeyUp);
            element.removeEventListener('blur', handleBlur);
            clearTimeout(typingTimeoutRef.current);
            clearTimeout(stoppedTypingTimeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [isTyping, inputRef] as const;
}

export default useTypingDetector;
