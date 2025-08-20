import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { QueuePage } from './components/pages/QueuePage';
import { InspectPage } from './components/pages/InspectPage';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { 
  FlaskConical, 
  Shield, 
  BarChart3, 
  Settings,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('queue');
  const [selectedInspectionId, setSelectedInspectionId] = useState<string | null>(null);

  const handleStartInspection = (itemId: string) => {
    setSelectedInspectionId(itemId);
    setCurrentPage('inspect');
  };

  const handleBackToQueue = () => {
    setSelectedInspectionId(null);
    setCurrentPage('queue');
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'queue':
        return <QueuePage onStartInspection={handleStartInspection} />;
      
      case 'inspect':
        return <InspectPage onBack={handleBackToQueue} />;
      
      case 'drop-test':
        return <DropTestPage />;
      
      case 'nc-holds':
        return <NCHoldsPage />;
      
      case 'reports':
        return <ReportsPage />;
      
      case 'setup':
        return <SetupPage />;
      
      default:
        return <QueuePage onStartInspection={handleStartInspection} />;
    }
  };

  return (
    <AppShell currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPageContent()}
    </AppShell>
  );
}

// Placeholder pages for other features
function DropTestPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Drop Test Wizard</h1>
        <p className="text-gray-600">Perform standardized drop tests on plastic bottles</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            PPE Safety Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Safety gloves are worn</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Safety goggles are worn</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Test area is clear of personnel</span>
            </label>
          </div>
          <Button className="mt-4" disabled>
            Continue to Test Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function NCHoldsPage() {
  const holds = [
    { id: '1', item: 'PET-COOK-1L', reason: 'Neck OD out of spec', status: 'active', time: '2 hours ago' },
    { id: '2', item: 'HDPE-COOK-5L', reason: 'Visual defect - flash', status: 'released', time: '1 day ago' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Non-Conformances & Holds</h1>
        <p className="text-gray-600">Manage quality holds and non-conformance reports</p>
      </div>
      
      <div className="space-y-4">
        {holds.map((hold) => (
          <Card key={hold.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{hold.item}</h3>
                  <p className="text-sm text-gray-600">{hold.reason}</p>
                  <p className="text-xs text-gray-500">{hold.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={hold.status === 'active' ? 'bg-red-600' : 'bg-green-600'}>
                    {hold.status === 'active' ? 'On Hold' : 'Released'}
                  </Badge>
                  {hold.status === 'active' && (
                    <Button size="sm" variant="outline">
                      Release Hold
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quality Reports & KPIs</h1>
        <p className="text-gray-600">Monitor quality performance and trends</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              First Pass Yield
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
            <p className="text-sm text-gray-600">+2.1% vs last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              On-Time Inspections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
            <p className="text-sm text-gray-600">3 missed today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Active Holds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 mb-2">2</div>
            <p className="text-sm text-gray-600">1 awaiting release</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SetupPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">System Setup</h1>
        <p className="text-gray-600">Configure system settings and integrations</p>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Zebra Printer Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Printer IP Address</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md" 
                  placeholder="192.168.1.100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Label Template</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Hold Label - Standard</option>
                  <option>QC Label - Batch</option>
                </select>
              </div>
            </div>
            <Button className="mt-4">Test Print</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Language Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Current language strings are loaded. Admin users can edit translations.
            </p>
            <Button variant="outline">Edit Language Strings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}