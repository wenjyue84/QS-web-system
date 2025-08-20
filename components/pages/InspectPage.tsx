import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useApp } from '../../context/AppContext';
import { measurementFields } from '../../data/mockData';
import { Lock, Save, Send, Camera, AlertTriangle, CheckCircle2, XCircle, ScanLine } from 'lucide-react';
import { cn } from '../ui/utils';

interface InspectPageProps {
  onBack: () => void;
}

export function InspectPage({ onBack }: InspectPageProps) {
  const { state, actions } = useApp();
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [scanData, setScanData] = useState({
    item: 'PET-COOK-1L',
    batch: 'LOT-2025-08-20-A',
    mold: 'MOLD-12',
    machine: 'ENGEL-220T',
    workOrder: 'WO-2025-081',
    cartonId: 'C001'
  });

  const currentInspection = state.currentInspection;
  if (!currentInspection) {
    return (
      <div className="text-center py-12">
        <p>No inspection selected</p>
        <Button onClick={onBack}>Back to Queue</Button>
      </div>
    );
  }

  const fields = measurementFields[currentInspection.itemCode] || [];
  const lockTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  const getMeasurementStatus = (fieldId: string, value: string) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field || !value) return null;
    
    if (field.type === 'enum') {
      return value === 'OK' ? 'pass' : 'fail';
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;
    
    return numValue >= field.lsl && numValue <= field.usl ? 'pass' : 'fail';
  };

  const hasOOSMeasurements = Object.entries(measurements).some(([fieldId, value]) => 
    getMeasurementStatus(fieldId, value) === 'fail'
  );

  const handleMeasurementChange = (fieldId: string, value: string) => {
    setMeasurements(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    if (hasOOSMeasurements) {
      // Would navigate to NC/Hold creation
      console.log('Creating hold due to OOS measurements');
    } else {
      // Success submission
      actions.endInspection();
      onBack();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={onBack} className="cursor-pointer">
              Queue
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {currentInspection.itemCode} ({currentInspection.workOrder})
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Lock Bar */}
      <Card className="mb-6 border-blue-600">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-blue-600" />
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {state.currentUser.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">
                Locked by {state.currentUser.name} on this device
              </p>
              <p className="text-sm text-gray-500">
                Server time: {lockTime}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan/Enter Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanLine className="h-5 w-5" />
            Scan or Enter Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="item">Item</Label>
              <Input
                id="item"
                value={scanData.item}
                onChange={(e) => setScanData(prev => ({ ...prev, item: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="batch">Batch/Lot</Label>
              <Input
                id="batch"
                value={scanData.batch}
                onChange={(e) => setScanData(prev => ({ ...prev, batch: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="mold">Mold</Label>
              <Input
                id="mold"
                value={scanData.mold}
                onChange={(e) => setScanData(prev => ({ ...prev, mold: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="machine">Machine</Label>
              <Input
                id="machine"
                value={scanData.machine}
                onChange={(e) => setScanData(prev => ({ ...prev, machine: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="workOrder">Work Order</Label>
              <Input
                id="workOrder"
                value={scanData.workOrder}
                onChange={(e) => setScanData(prev => ({ ...prev, workOrder: e.target.value }))}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="cartonId">Carton ID</Label>
              <Input
                id="cartonId"
                value={scanData.cartonId}
                onChange={(e) => setScanData(prev => ({ ...prev, cartonId: e.target.value }))}
                className="font-mono"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Measurement Fields */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Inspection Template: {currentInspection.itemCode}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fields.map((field) => {
              const value = measurements[field.id] || '';
              const status = getMeasurementStatus(field.id, value);
              
              return (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                    <Label htmlFor={field.id} className="text-sm font-medium">
                      {field.name}
                      {field.unit && ` (${field.unit})`}
                    </Label>
                    <div className="text-xs text-gray-500 mt-1">
                      LSL: {field.lsl} | USL: {field.usl}
                    </div>
                  </div>
                  
                  <div>
                    {field.type === 'enum' ? (
                      <Select
                        value={value}
                        onValueChange={(val) => handleMeasurementChange(field.id, val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {field.enumValues?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.id}
                        type="number"
                        step={field.precision}
                        value={value}
                        onChange={(e) => handleMeasurementChange(field.id, e.target.value)}
                        placeholder={`${field.lsl}-${field.usl}`}
                      />
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    {status === 'pass' && (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        PASS
                      </Badge>
                    )}
                    {status === 'fail' && (
                      <Badge className="bg-red-600 text-white">
                        <XCircle className="h-3 w-3 mr-1" />
                        FAIL
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* OOS Panel */}
      {hasOOSMeasurements && (
        <Card className="mb-6 border-red-600 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-red-900 mb-2">Out of Specification Detected</h3>
                <p className="text-sm text-red-700 mb-3">
                  One or more measurements are outside specification limits. A hold will be created.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    Create Hold
                  </Button>
                  <Button size="sm" variant="outline">
                    Create NC
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attachments */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Attachments</span>
            <Button size="sm" variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            No attachments added. Tap "Add Photo" to capture images or videos (50MB limit).
          </p>
        </CardContent>
      </Card>

      {/* Footer Actions */}
      <div className="flex gap-3 pb-6">
        <Button variant="outline" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button 
          onClick={handleSubmit}
          className={cn(
            "flex-1",
            hasOOSMeasurements ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          <Send className="h-4 w-4 mr-2" />
          {hasOOSMeasurements ? 'Submit & Hold' : 'Submit Inspection'}
        </Button>
      </div>
    </div>
  );
}