import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QueueItem, User, Language, Site } from '../types/qc';
import { queueItems, users, languages, sites, translations } from '../data/mockData';

interface AppState {
  currentUser: User;
  currentSite: Site;
  currentLanguage: Language;
  isOffline: boolean;
  unsyncedItems: number;
  queueItems: QueueItem[];
  currentInspection: QueueItem | null;
}

interface AppContextType {
  state: AppState;
  actions: {
    setCurrentSite: (site: Site) => void;
    setCurrentLanguage: (language: Language) => void;
    setOfflineStatus: (isOffline: boolean) => void;
    lockQueueItem: (itemId: string) => void;
    unlockQueueItem: (itemId: string) => void;
    startInspection: (item: QueueItem) => void;
    endInspection: () => void;
    translate: (key: string, params?: Record<string, string>) => string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentUser: users[0], // Aisyah
    currentSite: sites[0], // Taman University
    currentLanguage: languages[0], // English
    isOffline: false,
    unsyncedItems: 0,
    queueItems,
    currentInspection: null
  });

  const setCurrentSite = (site: Site) => {
    setState(prev => ({ ...prev, currentSite: site }));
  };

  const setCurrentLanguage = (language: Language) => {
    setState(prev => ({ ...prev, currentLanguage: language }));
  };

  const setOfflineStatus = (isOffline: boolean) => {
    setState(prev => ({ 
      ...prev, 
      isOffline,
      unsyncedItems: isOffline ? 3 : 0
    }));
  };

  const lockQueueItem = (itemId: string) => {
    setState(prev => ({
      ...prev,
      queueItems: prev.queueItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              status: 'locked' as const,
              lockedBy: {
                userId: prev.currentUser.id,
                userName: prev.currentUser.name,
                avatar: prev.currentUser.avatar,
                lockedAt: new Date().toISOString()
              }
            }
          : item
      )
    }));
  };

  const unlockQueueItem = (itemId: string) => {
    setState(prev => ({
      ...prev,
      queueItems: prev.queueItems.map(item =>
        item.id === itemId
          ? { ...item, status: 'due' as const, lockedBy: undefined }
          : item
      )
    }));
  };

  const startInspection = (item: QueueItem) => {
    lockQueueItem(item.id);
    setState(prev => ({ ...prev, currentInspection: item }));
  };

  const endInspection = () => {
    if (state.currentInspection) {
      unlockQueueItem(state.currentInspection.id);
    }
    setState(prev => ({ ...prev, currentInspection: null }));
  };

  const translate = (key: string, params?: Record<string, string>) => {
    const langCode = state.currentLanguage.code;
    let translation = translations[langCode]?.[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value);
      });
    }
    
    return translation;
  };

  return (
    <AppContext.Provider value={{
      state,
      actions: {
        setCurrentSite,
        setCurrentLanguage,
        setOfflineStatus,
        lockQueueItem,
        unlockQueueItem,
        startInspection,
        endInspection,
        translate
      }
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}