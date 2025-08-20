import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { AlertTriangle, Star, RefreshCw, Clock } from 'lucide-react';

interface PriorityBadgeProps {
  priority: 'complaint' | 'first-article' | 'changeover' | 'routine';
  className?: string;
  showIcon?: boolean;
}

export function PriorityBadge({ priority, className, showIcon = true }: PriorityBadgeProps) {
  const variants = {
    complaint: 'bg-red-600 text-white',
    'first-article': 'bg-blue-800 text-white',
    changeover: 'bg-amber-600 text-white',
    routine: 'bg-gray-700 text-white'
  };

  const labels = {
    complaint: 'Complaint',
    'first-article': 'First Article',
    changeover: 'Changeover',
    routine: 'Routine'
  };

  const icons = {
    complaint: AlertTriangle,
    'first-article': Star,
    changeover: RefreshCw,
    routine: Clock
  };

  const Icon = icons[priority];

  return (
    <Badge className={cn(variants[priority], 'flex items-center gap-1', className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {labels[priority]}
    </Badge>
  );
}