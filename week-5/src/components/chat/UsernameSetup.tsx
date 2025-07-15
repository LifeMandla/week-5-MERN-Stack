import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, User } from 'lucide-react';

interface UsernameSetupProps {
  onUsernameSet: (username: string) => void;
}

export function UsernameSetup({ onUsernameSet }: UsernameSetupProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onUsernameSet(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chat-bg via-background to-chat-sidebar flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Join the Chat
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your username to start chatting with others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-12 text-lg border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary focus:bg-background transition-all duration-200"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!username.trim()}
            >
              Start Chatting
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}