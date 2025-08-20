import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { QueueItem } from '../../types/qc';
import { useApp } from '../../context/AppContext';
import { Clock, Lock, Eye, Play } from 'lucide-react';
import { cn } from '../ui/utils';

interface QueueCardProps {
  item: QueueItem;
  onDoNext?: (item: QueueItem) => void;
  onView?: (item: QueueItem) => void;
}

export function QueueCard({ item, onDoNext, onView }: QueueCardProps) {
  const { actions } = useApp();
  const dueTime = new Date(item.dueAt).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  const handleDoNext = () => {
    onDoNext?.(item);
    actions.startInspection(item);
  };

  return (
    <Card className={cn(
      'mb-3 transition-all hover:shadow-md',
      item.status === 'late' && 'border-red-600 border-l-4',
      item.status === 'due' && 'border-blue-600 border-l-4',
      item.status === 'locked' && 'border-gray-700 border-l-4'
    )}>
      <CardContent className="p-4">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">{dueTime}</span>
            <StatusBadge status={item.status} />
          </div>
          <PriorityBadge priority={item.priority} />
        </div>

        {/* Item Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900">{item.itemCode}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.itemName}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Line/Machine:</span>
              <span className="ml-1 font-medium">{item.line}/{item.machine}</span>
            </div>
            <div>
              <span className="text-gray-500">Mold:</span>
              <span className="ml-1 font-medium">{item.mold}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">WO:</span>
              <span className="ml-1 font-medium">{item.workOrder}</span>
            </div>
          </div>
        </div>

        {/* Lock Status */}
        {item.status === 'locked' && item.lockedBy && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md mb-3">
            <Lock className="h-4 w-4 text-gray-600" />
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">
                {item.lockedBy.avatar}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              Locked by {item.lockedBy.userName}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {item.status !== 'locked' && (
            <Button 
              onClick={handleDoNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <Play className="h-4 w-4 mr-1" />
              Do next
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => onView?.(item)}
            size="sm"
            className="px-3"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}