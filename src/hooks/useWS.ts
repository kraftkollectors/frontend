import { debugLog } from '@/functions/helpers';
import { wse } from '@/utils';
import { WS_URL } from '@/utils/constants';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const socket = io(WS_URL, { autoConnect: false, ackTimeout: 5000, timeout: 5000,  });

export function useWS() {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        if(!socket.connected) socket.connect();
        setIsConnected(socket.connected);
        
        function onConnect() {
            setIsConnected(true);
            debugLog('connected');
        }

        function onDisconnect() {
            debugLog('dis-connected');
            setIsConnected(false);
        }

        function onError(res:any) {
            // debugLog(res.message)
            debugLog({'error' : res});
        }

        socket.on(wse.connect, onConnect);
        socket.on(wse.disconnect, onDisconnect);
        socket.on(wse.error, onError)

        return () => {
            socket.off(wse.connect, onConnect);
            socket.off(wse.disconnect, onDisconnect);
            socket.disconnect();
            setIsConnected(false);
        };
    }, []);



    return {isConnected, socket}
}