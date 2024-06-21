

import { debugLog } from '@/functions/helpers';
import { useState, useEffect, useRef } from 'react';


export function useTypingDetector(delayBeforeTyping = 200, delayBeforeStoppedTyping = 3000) {
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const stoppedTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    const handleKeyDown = () => {
        if (!inputRef.current) return;
        setIsTyping(true);
        clearTimeout(stoppedTypingTimeoutRef.current!);
        typingTimeoutRef.current = setTimeout(() => {
            debugLog('typing');
        }, delayBeforeTyping);
    };

    const handleKeyUp = () => {
        if (!inputRef.current) return;
        clearTimeout(typingTimeoutRef.current!);
        stoppedTypingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            debugLog('stopped typing');
        }, delayBeforeStoppedTyping);
    };

    const handleBlur = () => {
        document.documentElement.style.height = window.innerHeight + 'px';
        document.body.style.height = window.innerHeight + 'px';
        const chatView = document.getElementById('ChatView');
        if(chatView){
            chatView.style.height = window.innerHeight + 'px';
            chatView.style.maxHeight = window.innerHeight + 'px';
            chatView.style.minHeight = window.innerHeight + 'px';
        }
        if (!inputRef.current) return;
        clearTimeout(typingTimeoutRef.current!)
        setIsTyping(false);
        debugLog('blur: stopped typing');
    };

    function handleFocus(){
        document.documentElement.style.height = window.innerHeight + 'px';
        document.body.style.height = window.innerHeight + 'px';
        const chatView = document.getElementById('ChatView');
        if(!chatView) return;
        chatView.style.height = window.innerHeight + 'px';
        chatView.style.maxHeight = window.innerHeight + 'px';
        chatView.style.minHeight = window.innerHeight + 'px';
    }

    useEffect(() => {
        if (!inputRef.current) return;
        const element = inputRef.current;
        element.addEventListener('keydown', handleKeyDown);
        element.addEventListener('keyup', handleKeyUp);
        element.addEventListener('blur', handleKeyUp);
        element.addEventListener('focus', handleFocus);
        return () => {
            element.removeEventListener('keydown', handleKeyDown);
            element.removeEventListener('keyup', handleKeyUp);
            element.removeEventListener('blur', handleBlur);
            element.removeEventListener('focus', handleFocus);
            clearTimeout(typingTimeoutRef.current!);
            clearTimeout(stoppedTypingTimeoutRef.current!);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [isTyping, inputRef] as const;
}

export default useTypingDetector;
