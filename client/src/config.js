import io from 'socket.io-client';

export const API_URL = 'http://localhost:2244';
export const socket = io(API_URL);
export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
