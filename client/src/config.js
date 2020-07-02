import io from 'socket.io-client';

export const API_URL = 'http://localhost:2244';
export const socket = io(API_URL);
