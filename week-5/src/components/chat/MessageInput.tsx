import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onTyping: () => void;
}

export function MessageInput({ onSendMessage, onTyping }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = () => {
    onTyping();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-background/80 backdrop-blur-sm border-t border-border/50">
      <Input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 h-12 bg-background/90 border-2 border-border/50 focus:border-primary transition-all duration-200"
        autoFocus
      />
      <Button
        type="submit"
        size="lg"
        className="h-12 px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
        disabled={!message.trim()}
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}