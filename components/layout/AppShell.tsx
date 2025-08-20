import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useApp } from '../../context/AppContext';
import { 
  List, 
  Search, 
  FlaskConical, 
  Shield, 
  BarChart3, 
  Settings, 
  User,
  WifiOff,
  RefreshCw,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../ui/utils';

interface AppShellProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  children: React.ReactNode;
}

const navigation = [
  { id: 'queue', name: 'Queue', icon: List },
  { id: 'inspect', name: 'Inspect', icon: Search },
  { id: 'drop-test', name: 'Drop Test', icon: FlaskConical },
  { id: 'nc-holds', name: 'NC & Holds', icon: Shield },
  { id: 'reports', name: 'Reports', icon: BarChart3 },
  { id: 'setup', name: 'Setup', icon: Settings }
];

export function AppShell({ currentPage, onPageChange, children }: AppShellProps) {
  const { state, actions } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-300 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Mobile menu + Site selector */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <Select
              value={state.currentSite.id}
              onValueChange={(siteId) => {
                const site = state.currentSite; // In a real app, look up by ID
                actions.setCurrentSite(site);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="site-1">Taman University</SelectItem>
                <SelectItem value="site-2">Pontian</SelectItem>
                <SelectItem value="site-3">Pasir Gudang</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Center: Page title */}
          <h1 className="font-semibold text-gray-900 hidden sm:block">
            {navigation.find(nav => nav.id === currentPage)?.name || 'Rui Sin QC'}
          </h1>

          {/* Right: Language + Offline + User */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <Select
              value={state.currentLanguage.code}
              onValueChange={(code) => {
                const language = { code: code as 'en' | 'zh' | 'ms', name: 'English', flag: '🇺🇸' };
                actions.setCurrentLanguage(language);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇺🇸 EN</SelectItem>
                <SelectItem value="zh">🇨🇳 中文</SelectItem>
                <SelectItem value="ms">🇲🇾 BM</SelectItem>
              </SelectContent>
            </Select>

            {/* Offline Badge */}
            {state.isOffline && (
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="bg-red-600">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => actions.setOfflineStatus(false)}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sync ({state.unsyncedItems})
                </Button>
              </div>
            )}

            {/* User Avatar */}
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {state.currentUser.avatar}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Side Navigation - Desktop */}
        <nav className="hidden md:block w-64 bg-white border-r border-gray-300 min-h-screen">
          <div className="p-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      currentPage === item.id && "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                    onClick={() => onPageChange(item.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
            <nav className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-300">
              <div className="p-4">
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={currentPage === item.id ? "default" : "ghost"}
                        className={cn(
                          "w-full justify-start",
                          currentPage === item.id && "bg-blue-600 text-white hover:bg-blue-700"
                        )}
                        onClick={() => {
                          onPageChange(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}