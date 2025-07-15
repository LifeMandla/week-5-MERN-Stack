import { useEffect, useState } from 'react';
import { socket, ChatMessage } from '@/lib/socket';
import { UsernameSetup } from './UsernameSetup';
import { ChatInterface } from './ChatInterface';
import { useToast } from '@/hooks/use-toast';

export function ChatApp() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [typingUser, setTypingUser] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Connection event handlers
    socket.on('connect', () => {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Successfully connected to the chat server",
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "Lost connection to the chat server",
        variant: "destructive",
      });
    });

    socket.on('connect_error', () => {
      toast({
        title: "Connection Error",
        description: "Failed to connect to the chat server. Make sure the server is running on localhost:5000",
        variant: "destructive",
      });
    });

    // Chat event handlers
    socket.on('chat_message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('typing', (user: string) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(''), 2000);
    });

    socket.on('user_list', (userList: string[]) => {
      setUsers(userList);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.off('chat_message');
      socket.off('typing');
      socket.off('user_list');
    };
  }, [toast]);

  const handleUsernameSet = (newUsername: string) => {
    setUsername(newUsername);
    socket.connect();
    socket.emit('set_username', newUsername);
  };

  const handleSendMessage = (message: string) => {
    if (socket.connected) {
      socket.emit('chat_message', { message });
    } else {
      toast({
        title: "Not Connected",
        description: "Cannot send message. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  const handleTyping = () => {
    if (socket.connected) {
      socket.emit('typing');
    }
  };

  // Show connection status for development
  if (!username) {
    return (
      <div>
        <UsernameSetup onUsernameSet={handleUsernameSet} />
        {!isConnected && (
          <div className="fixed top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-sm">
            Server not connected (localhost:5000)
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <ChatInterface
        messages={messages}
        users={users}
        currentUser={username}
        typingUser={typingUser}
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
      />
      {!isConnected && (
        <div className="fixed top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-sm">
          Reconnecting...
        </div>
      )}
    </div>
  );
}