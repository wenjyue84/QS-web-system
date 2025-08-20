import { Site, Line, Machine, Mold, Item, WorkOrder, QueueItem, MeasurementField, User, Language } from '../types/qc';

export const sites: Site[] = [
  { id: 'site-1', name: 'Taman University', location: 'Skudai' },
  { id: 'site-2', name: 'Pontian', location: 'Pontian' },
  { id: 'site-3', name: 'Pasir Gudang', location: 'Pasir Gudang' }
];

export const lines: Line[] = [
  { id: 'line-1', name: 'L1', siteId: 'site-1' },
  { id: 'line-2', name: 'L2', siteId: 'site-1' },
  { id: 'line-3', name: 'L3', siteId: 'site-2' }
];

export const machines: Machine[] = [
  { id: 'machine-1', name: 'ENGEL-220T', type: 'Injection Molding', lineId: 'line-1' },
  { id: 'machine-2', name: 'NISSEI-180T', type: 'Injection Molding', lineId: 'line-2' },
  { id: 'machine-3', name: 'ENGEL-300T', type: 'Injection Molding', lineId: 'line-3' }
];

export const molds: Mold[] = [
  { id: 'mold-1', name: 'MOLD-12', description: '1L PET Bottle Mold' },
  { id: 'mold-2', name: 'MOLD-7', description: '5L HDPE Bottle Mold' }
];

export const items: Item[] = [
  { id: 'item-1', code: 'PET-COOK-1L', name: '1L PET Cooking Oil Bottle', description: 'Clear PET bottle for cooking oil' },
  { id: 'item-2', code: 'HDPE-COOK-5L', name: '5L HDPE Cooking Oil Bottle', description: 'White HDPE bottle for bulk cooking oil' }
];

export const workOrders: WorkOrder[] = [
  { id: 'wo-1', number: 'WO-2025-081', itemId: 'item-1', quantity: 10000, status: 'active' },
  { id: 'wo-2', number: 'WO-2025-094', itemId: 'item-2', quantity: 5000, status: 'active' }
];

export const users: User[] = [
  { id: 'user-1', name: 'Aisyah', role: 'inspector', avatar: '👩🏻‍🔬' },
  { id: 'user-2', name: 'Lim', role: 'qc-lead', avatar: '👨🏻‍💼' },
  { id: 'user-3', name: 'Ravi', role: 'supervisor', avatar: '👨🏾‍💼' },
  { id: 'user-4', name: 'Jay', role: 'manager', avatar: '👨🏻‍💼' },
  { id: 'user-5', name: 'Nur', role: 'qa', avatar: '👩🏻‍💼' }
];

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ms', name: 'Bahasa', flag: '🇲🇾' }
];

export const measurementFields: Record<string, MeasurementField[]> = {
  'PET-COOK-1L': [
    { id: 'neck-od', name: 'Neck OD', unit: 'mm', lsl: 28.90, usl: 29.10, precision: 0.01, type: 'numeric' },
    { id: 'weight', name: 'Weight', unit: 'g', lsl: 18.8, usl: 19.4, precision: 0.1, type: 'numeric' },
    { id: 'wall-thickness', name: 'Wall Thickness', unit: 'mm', lsl: 0.40, usl: 0.55, precision: 0.01, type: 'numeric' },
    { id: 'visual-defects', name: 'Visual Defects', unit: '', lsl: 0, usl: 0, precision: 1, type: 'enum', enumValues: ['OK', 'Short Shot', 'Flash', 'Deform'] }
  ],
  'HDPE-COOK-5L': [
    { id: 'neck-od', name: 'Neck OD', unit: 'mm', lsl: 42.80, usl: 43.20, precision: 0.01, type: 'numeric' },
    { id: 'weight', name: 'Weight', unit: 'g', lsl: 95.0, usl: 105.0, precision: 0.5, type: 'numeric' },
    { id: 'wall-thickness', name: 'Wall Thickness', unit: 'mm', lsl: 0.80, usl: 1.20, precision: 0.01, type: 'numeric' },
    { id: 'visual-defects', name: 'Visual Defects', unit: '', lsl: 0, usl: 0, precision: 1, type: 'enum', enumValues: ['OK', 'Short Shot', 'Flash', 'Sink Mark'] }
  ]
};

// Generate current timestamp and queue items
const now = new Date();
const getTimeOffset = (minutes: number) => new Date(now.getTime() + minutes * 60000).toISOString();

export const queueItems: QueueItem[] = [
  {
    id: 'queue-1',
    dueAt: getTimeOffset(-5),
    itemCode: 'PET-COOK-1L',
    itemName: '1L PET Cooking Oil Bottle',
    line: 'L1',
    machine: 'ENGEL-220T',
    mold: 'MOLD-12',
    workOrder: 'WO-2025-081',
    priority: 'complaint',
    status: 'late'
  },
  {
    id: 'queue-2',
    dueAt: getTimeOffset(2),
    itemCode: 'HDPE-COOK-5L',
    itemName: '5L HDPE Cooking Oil Bottle',
    line: 'L2',
    machine: 'NISSEI-180T',
    mold: 'MOLD-7',
    workOrder: 'WO-2025-094',
    priority: 'first-article',
    status: 'due'
  },
  {
    id: 'queue-3',
    dueAt: getTimeOffset(15),
    itemCode: 'PET-COOK-1L',
    itemName: '1L PET Cooking Oil Bottle',
    line: 'L1',
    machine: 'ENGEL-220T',
    mold: 'MOLD-12',
    workOrder: 'WO-2025-081',
    priority: 'changeover',
    status: 'early'
  },
  {
    id: 'queue-4',
    dueAt: getTimeOffset(25),
    itemCode: 'HDPE-COOK-5L',
    itemName: '5L HDPE Cooking Oil Bottle',
    line: 'L3',
    machine: 'ENGEL-300T',
    mold: 'MOLD-7',
    workOrder: 'WO-2025-094',
    priority: 'routine',
    status: 'early'
  },
  {
    id: 'queue-5',
    dueAt: getTimeOffset(30),
    itemCode: 'PET-COOK-1L',
    itemName: '1L PET Cooking Oil Bottle',
    line: 'L2',
    machine: 'NISSEI-180T',
    mold: 'MOLD-12',
    workOrder: 'WO-2025-081',
    priority: 'routine',
    status: 'locked',
    lockedBy: {
      userId: 'user-1',
      userName: 'Aisyah',
      avatar: '👩🏻‍🔬',
      lockedAt: getTimeOffset(-10)
    }
  }
];

export const translations = {
  en: {
    'app.title': 'Rui Sin QC',
    'nav.queue': 'Queue',
    'nav.inspect': 'Inspect',
    'nav.dropTest': 'Drop Test',
    'nav.ncHolds': 'NC & Holds',
    'nav.reports': 'Reports',
    'nav.admin': 'Admin',
    'nav.setup': 'Setup',
    'label.dueAt': 'Due at',
    'label.serverTime': 'Server time',
    'action.doNext': 'Do next',
    'action.view': 'View',
    'state.lockedBy': 'Locked by {name}',
    'status.early': 'Early',
    'status.due': 'Due',
    'status.late': 'Late',
    'status.locked': 'Locked',
    'priority.complaint': 'Complaint',
    'priority.firstArticle': 'First Article',
    'priority.changeover': 'Changeover',
    'priority.routine': 'Routine',
    'filter.all': 'All',
    'queue.missedCount': 'Missed ({count})',
    'queue.nextHour': 'Next 60 minutes',
    'scan.placeholder': 'Scan or enter barcode...',
    'offline.badge': 'Offline',
    'sync.action': 'Sync ({count})'
  },
  zh: {
    'app.title': '瑞信质检',
    'nav.queue': '队列',
    'nav.inspect': '检查',
    'nav.dropTest': '跌落测试',
    'nav.ncHolds': '不合格品与冻结',
    'nav.reports': '报告',
    'nav.admin': '管理',
    'nav.setup': '设置',
    'label.dueAt': '到期时间',
    'label.serverTime': '服务器时间',
    'action.doNext': '下一项',
    'action.view': '查看',
    'state.lockedBy': '由{name}锁定',
    'status.early': '提前',
    'status.due': '到期',
    'status.late': '逾期',
    'status.locked': '锁定',
    'priority.complaint': '投诉',
    'priority.firstArticle': '首件',
    'priority.changeover': '换线',
    'priority.routine': '常规',
    'filter.all': '全部',
    'queue.missedCount': '错过 ({count})',
    'queue.nextHour': '接下来60分钟',
    'scan.placeholder': '扫描或输入条码...',
    'offline.badge': '离线',
    'sync.action': '同步 ({count})'
  },
  ms: {
    'app.title': 'Rui Sin QC',
    'nav.queue': 'Barisan',
    'nav.inspect': 'Periksa',
    'nav.dropTest': 'Ujian Jatuh',
    'nav.ncHolds': 'NC & Tahan',
    'nav.reports': 'Laporan',
    'nav.admin': 'Admin',
    'nav.setup': 'Sediaan',
    'label.dueAt': 'Tamat pada',
    'label.serverTime': 'Masa pelayan',
    'action.doNext': 'Buat seterusnya',
    'action.view': 'Lihat',
    'state.lockedBy': 'Dikunci oleh {name}',
    'status.early': 'Awal',
    'status.due': 'Tamat',
    'status.late': 'Lewat',
    'status.locked': 'Dikunci',
    'priority.complaint': 'Aduan',
    'priority.firstArticle': 'Artikel Pertama',
    'priority.changeover': 'Tukar Talian',
    'priority.routine': 'Rutin',
    'filter.all': 'Semua',
    'queue.missedCount': 'Terlepas ({count})',
    'queue.nextHour': '60 minit akan datang',
    'scan.placeholder': 'Imbas atau masukkan kod bar...',
    'offline.badge': 'Luar talian',
    'sync.action': 'Segerak ({count})'
  }
};