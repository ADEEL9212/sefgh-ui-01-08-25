import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  History, 
  Book, 
  Play, 
  Terminal, 
  Wifi, 
  Languages, 
  Settings, 
  Grid3X3,
  Github,
  Sun,
  Moon,
  X
} from 'lucide-react';

interface NavigationPanelProps {
  isOpen: boolean;
  activeView: string;
  theme: 'light' | 'dark';
  onViewChange: (view: string) => void;
  onThemeToggle: () => void;
  onClose: () => void;
}

export const NavigationPanel = ({
  isOpen,
  activeView,
  theme,
  onViewChange,
  onThemeToggle,
  onClose,
}: NavigationPanelProps) => {
  const navigationItems = [
    { id: 'chat', label: 'New Chat', icon: MessageSquare },
    { id: 'history', label: 'Chat History', icon: History },
    { id: 'docs', label: 'Documentation', icon: Book },
    { id: 'playground', label: 'Playground', icon: Play },
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'proxy', label: 'Proxy Settings', icon: Wifi },
    { id: 'language', label: 'Language', icon: Languages },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'all-pages', label: 'All Pages', icon: Grid3X3 },
  ];

  if (!isOpen) return null;

  return (
    <div className={`
      fixed lg:static inset-0 lg:inset-auto
      w-full lg:w-80 
      bg-surface lg:bg-sidebar
      border-r border-border
      z-40 lg:z-auto
      animate-slide-in-left
      flex flex-col
    `}>
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <div className="text-xl font-bold bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
          SEFGH-AI
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('https://github.com/sefgh-ai', '_blank')}
          >
            <Github className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => {
                onViewChange(item.id);
                // Close nav on mobile when item is selected
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};