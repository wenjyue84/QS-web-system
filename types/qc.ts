export interface Site {
  id: string;
  name: string;
  location: string;
}

export interface Line {
  id: string;
  name: string;
  siteId: string;
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  lineId: string;
}

export interface Mold {
  id: string;
  name: string;
  description: string;
}

export interface Item {
  id: string;
  code: string;
  name: string;
  description: string;
}

export interface WorkOrder {
  id: string;
  number: string;
  itemId: string;
  quantity: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface QueueItem {
  id: string;
  dueAt: string;
  itemCode: string;
  itemName: string;
  line: string;
  machine: string;
  mold: string;
  workOrder: string;
  priority: 'complaint' | 'first-article' | 'changeover' | 'routine';
  status: 'early' | 'due' | 'late' | 'locked';
  lockedBy?: {
    userId: string;
    userName: string;
    avatar: string;
    lockedAt: string;
  };
}

export interface MeasurementField {
  id: string;
  name: string;
  unit: string;
  lsl: number;
  usl: number;
  precision: number;
  type: 'numeric' | 'enum';
  enumValues?: string[];
}

export interface Inspection {
  id: string;
  queueItemId: string;
  itemCode: string;
  batchLot: string;
  mold: string;
  machine: string;
  workOrder: string;
  cartonId: string;
  measurements: Record<string, number | string>;
  attachments: string[];
  status: 'draft' | 'submitted' | 'oos';
  submittedAt?: string;
  submittedBy?: string;
}

export interface Hold {
  id: string;
  inspectionId: string;
  reason: string;
  status: 'active' | 'released';
  createdAt: string;
  createdBy: string;
  releasedAt?: string;
  releasedBy?: string;
}

export interface NonConformance {
  id: string;
  inspectionId: string;
  defectCode: string;
  description: string;
  disposition: 'rework' | 'scrap' | 'hold' | 'deviation';
  assignee: string;
  dueDate: string;
  status: 'open' | 'closed';
}

export interface Language {
  code: 'en' | 'zh' | 'ms';
  name: string;
  flag: string;
}

export interface User {
  id: string;
  name: string;
  role: 'inspector' | 'qc-lead' | 'supervisor' | 'manager' | 'qa';
  avatar: string;
}