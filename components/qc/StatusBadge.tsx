import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

interface StatusBadgeProps {
  status: 'early' | 'due' | 'late' | 'locked';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    early: 'bg-gray-500 text-white',
    due: 'bg-blue-600 text-white',
    late: 'bg-red-600 text-white',
    locked: 'bg-gray-700 text-white'
  };

  const labels = {
    early: 'Early',
    due: 'Due',
    late: 'Late',
    locked: 'Locked'
  };

  return (
    <Badge className={cn(variants[status], className)}>
      {labels[status]}
    </Badge>
  );
}