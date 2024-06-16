import { debugLog } from '@/functions/helpers';
import { WS_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(WS_URL, { autoConnect: false, ackTimeout: 5000, timeout: 5000, });

export function useWS() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        if(!socket.connected) socket.connect();
        
        function onConnect() {
            setIsConnected(true);
            debugLog('connected');
        }

        function onDisconnect() {
            debugLog('dis-connected');
            setIsConnected(false);
        }

        function onError() {
            debugLog('error');
        }

        // function onFooEvent(value) {
        //   setFooEvents(previous => [...previous, value]);
        // }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('error', onError)
        // socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.disconnect();
            setIsConnected(false);
            //   socket.off('foo', onFooEvent);
        };
    }, []);


    return {isConnected, socket}
}