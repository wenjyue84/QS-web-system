import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { QueueCard } from '../qc/QueueCard';
import { useApp } from '../../context/AppContext';
import { Search, ScanLine, Filter } from 'lucide-react';

interface QueuePageProps {
  onStartInspection: (itemId: string) => void;
}

export function QueuePage({ onStartInspection }: QueuePageProps) {
  const { state, actions } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedLine, setSelectedLine] = useState('all');

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false 
  });

  const filteredQueue = state.queueItems.filter(item => {
    const matchesSearch = item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    const matchesLine = selectedLine === 'all' || item.line === selectedLine;
    
    return matchesSearch && matchesPriority && matchesLine;
  });

  const missedCount = state.queueItems.filter(item => item.status === 'late').length;

  const handleDoNext = (item: any) => {
    onStartInspection(item.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quality Control Queue</h1>
            <p className="text-sm text-gray-600">
              {actions.translate('queue.nextHour')} • Server time: {currentTime}
            </p>
          </div>
          {missedCount > 0 && (
            <Badge variant="destructive" className="bg-red-600">
              Missed ({missedCount})
            </Badge>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedLine} onValueChange={setSelectedLine}>
            <SelectTrigger>
              <SelectValue placeholder="Line" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Lines</SelectItem>
              <SelectItem value="L1">L1</SelectItem>
              <SelectItem value="L2">L2</SelectItem>
              <SelectItem value="L3">L3</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="first-article">First Article</SelectItem>
              <SelectItem value="changeover">Changeover</SelectItem>
              <SelectItem value="routine">Routine</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Sort Info */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-gray-500">Sort:</span>
          <div className="flex gap-1">
            <Badge variant="outline">Time</Badge>
            <span className="text-gray-400">→</span>
            <Badge variant="outline">Item</Badge>
            <span className="text-gray-400">→</span>
            <Badge variant="outline">Line</Badge>
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="space-y-3">
        {filteredQueue.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No inspections due</h3>
            <p className="text-gray-500">Try changing your filters or check back later.</p>
          </div>
        ) : (
          filteredQueue.map((item) => (
            <QueueCard
              key={item.id}
              item={item}
              onDoNext={handleDoNext}
              onView={() => console.log('View item:', item.id)}
            />
          ))
        )}
      </div>

      {/* Floating Action Button - Mobile */}
      <Button
        className="fixed bottom-6 right-6 md:hidden h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        size="sm"
      >
        <ScanLine className="h-6 w-6" />
      </Button>
    </div>
  );
}