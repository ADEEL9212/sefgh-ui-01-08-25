import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  LayoutGrid, 
  Search, 
  Sun, 
  Moon, 
  User, 
  Github, 
  ChevronDown 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  theme: 'light' | 'dark';
  selectedVersion: string;
  onThemeToggle: () => void;
  onNavToggle: () => void;
  onSearchToggle: () => void;
  onVersionChange: (version: string) => void;
}

export const AppHeader = ({
  theme,
  selectedVersion,
  onThemeToggle,
  onNavToggle,
  onSearchToggle,
  onVersionChange,
}: AppHeaderProps) => {
  const versions = [
    { id: 'v1', label: 'SEFGH v1.0' },
    { id: 'v2', label: 'SEFGH v2.0' },
    { id: 'v3', label: 'SEFGH v3.0' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 glass-effect border-b">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="text-xl font-bold bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              SEFGH-AI
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  {versions.find(v => v.id === selectedVersion)?.label}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {versions.map((version) => (
                  <DropdownMenuItem
                    key={version.id}
                    onClick={() => onVersionChange(version.id)}
                    className={selectedVersion === version.id ? 'bg-accent' : ''}
                  >
                    {version.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('https://github.com/sefgh-ai', '_blank')}
            className="hidden md:flex"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onNavToggle}
            title="Toggle Navigation"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onSearchToggle}
            title="Toggle Search Panel"
          >
            <Search className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onThemeToggle}
            className="hidden md:flex"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            title="User Account"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};