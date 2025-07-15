import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { UserList } from './UserList';
import { ChatMessage } from '@/lib/socket';
import { Card } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  users: string[];
  currentUser: string;
  typingUser: string;
  onSendMessage: (message: string) => void;
  onTyping: () => void;
}

export function ChatInterface({
  messages,
  users,
  currentUser,
  typingUser,
  onSendMessage,
  onTyping
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-chat-bg via-background to-chat-sidebar">
      <div className="flex h-screen max-w-7xl mx-auto">
        {/* Sidebar */}
        <div className="w-64 p-4 border-r border-border/50 bg-gradient-to-b from-chat-sidebar/30 to-chat-sidebar/10 backdrop-blur-sm">
          <UserList users={users} currentUser={currentUser} />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Chat Room
              </h1>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-0">
                  <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-lg">No messages yet</p>
                  <p className="text-muted-foreground/70 text-sm mt-2">
                    Start the conversation by sending a message!
                  </p>
                </Card>
              </div>
            ) : (
              messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  message={message}
                  isCurrentUser={message.username === currentUser}
                />
              ))
            )}
            
            {/* Typing Indicator */}
            {typingUser && (
              <div className="flex justify-start mb-4">
                <div className="bg-typing/10 text-typing px-3 py-2 rounded-full text-sm animate-pulse">
                  {typingUser} is typing...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <MessageInput onSendMessage={onSendMessage} onTyping={onTyping} />
        </div>
      </div>
    </div>
  );
}