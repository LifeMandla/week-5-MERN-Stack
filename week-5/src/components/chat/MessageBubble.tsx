import { ChatMessage } from '@/lib/socket';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in slide-in-from-bottom-2 duration-300",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-2xl px-4 py-3 shadow-lg",
        isCurrentUser 
          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground ml-auto" 
          : "bg-chat-bubble-other text-chat-bubble-other-foreground"
      )}>
        {!isCurrentUser && (
          <div className="text-xs font-medium text-muted-foreground mb-1">
            {message.username}
          </div>
        )}
        <div className="text-sm leading-relaxed break-words">
          {message.message}
        </div>
        <div className={cn(
          "text-xs mt-1 opacity-70",
          isCurrentUser ? "text-right" : "text-left"
        )}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}