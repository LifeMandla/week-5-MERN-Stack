import { io } from 'socket.io-client';

// In production, this would connect to your deployed server
export const socket = io('http://localhost:5000', {
  autoConnect: false
});

export interface ChatMessage {
  username: string;
  message: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
}