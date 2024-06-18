

import { useState, useEffect, useRef } from 'react';


export function useTypingDetector(delayBeforeTyping = 2000, delayBeforeStoppedTyping = 3000) {
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<any>(null);
    const stoppedTypingTimeoutRef = useRef<any>(null);

    const handleKeyDown = () => {
        setIsTyping(true);
        clearTimeout(stoppedTypingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            console.log('typing');
        }, delayBeforeTyping);
    };

    const handleKeyUp = () => {
        clearTimeout(typingTimeoutRef.current);
        stoppedTypingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            console.log('stopped typing');
        }, delayBeforeStoppedTyping);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearTimeout(typingTimeoutRef.current);
            clearTimeout(stoppedTypingTimeoutRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isTyping;
}

export default useTypingDetector;
