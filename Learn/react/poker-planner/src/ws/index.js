import io from 'socket.io-client';
import { SOCKET_SERVER, COOKIE_NAME } from "../../constants/env";
import getCookie from '../../utils/getCookie';

let socket;

export const createSocketConnection = () => {
    const sessionId = getCookie(COOKIE_NAME);

    socket = io(SOCKET_SERVER, {
        query: { sessionId }
    });

    return socket;
};

export const socketEmit = (event, options, callback) =>
    socket.emit(event, options, callback);
