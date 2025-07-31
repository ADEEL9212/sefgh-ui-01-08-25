import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Send, 
  Copy, 
  RotateCcw, 
  Edit3, 
  Trash2, 
  User, 
  Bot,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isEditing?: boolean;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onEditMessage: (id: string, newContent: string) => void;
  onDeleteMessage: (id: string) => void;
  onRegenerateResponse: (id: string) => void;
  isLoading: boolean;
}

export const ChatPanel = ({
  messages,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onRegenerateResponse,
  isLoading,
}: ChatPanelProps) => {
  const [input, setInput] = useState('');
  const [editingMessage, setEditingMessage] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleEdit = (messageId: string, content: string) => {
    setEditingMessage(messageId);
    setEditContent(content);
  };

  const handleSaveEdit = (messageId: string) => {
    if (editContent.trim()) {
      onEditMessage(messageId, editContent.trim());
      setEditingMessage(null);
      setEditContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditContent('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
      duration: 2000,
    });
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Welcome to SEFGH-AI</h3>
            <p className="text-muted-foreground">
              Start a conversation by typing a message below. I can help you search GitHub repositories and answer questions.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-bubble flex gap-3 group ${
              message.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${message.type === 'user' ? 'bg-brand' : 'bg-muted'}
            `}>
              {message.type === 'user' ? (
                <User className="h-4 w-4 text-brand-foreground" />
              ) : (
                <Bot className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <Card className={`
              flex-1 max-w-[80%]
              ${message.type === 'user' ? 'bg-brand text-brand-foreground' : ''}
            `}>
              <CardContent className="p-4">
                {editingMessage === message.id ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(message.id)}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="whitespace-pre-wrap break-words">
                      {message.content}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                      <span className="text-xs opacity-70">
                        {formatTimestamp(message.timestamp)}
                      </span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(message.content)}
                          className="h-7 w-7 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        {message.type === 'user' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(message.id, message.content)}
                            className="h-7 w-7 p-0"
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                        )}
                        {message.type === 'assistant' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onRegenerateResponse(message.id)}
                            className="h-7 w-7 p-0"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDeleteMessage(message.id)}
                          className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Bot className="h-4 w-4 text-muted-foreground" />
            </div>
            <Card className="flex-1 max-w-[80%]">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-muted-foreground">AI is thinking...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};