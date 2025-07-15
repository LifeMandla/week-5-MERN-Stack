import { User, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserListProps {
  users: string[];
  currentUser: string;
}

export function UserList({ users, currentUser }: UserListProps) {
  return (
    <Card className="h-full border-0 bg-chat-sidebar/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Users className="w-4 h-4 text-primary" />
          Online Users ({users.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {users.map((username, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="relative">
              <User className="w-4 h-4 text-muted-foreground" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-online rounded-full animate-pulse" />
            </div>
            <span className={`text-sm ${
              username === currentUser ? 'font-semibold text-primary' : 'text-foreground'
            }`}>
              {username}
              {username === currentUser && (
                <span className="text-xs text-muted-foreground ml-1">(you)</span>
              )}
            </span>
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-4">
            No users online
          </div>
        )}
      </CardContent>
    </Card>
  );
}