"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Palette, Zap, Grid, Eye } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [settings, setSettings] = useState({
    theme: 'system',
    connectionType: 'curved',
    showGrid: true,
    showMinimap: true,
    animateConnections: true,
    snapToGrid: false,
    autoSave: true,
    showNodeLabels: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
          <DialogDescription>
            Customize your simulator experience
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="canvas">Canvas</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          
          <div className="max-h-[400px] overflow-y-auto mt-4">
            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Theme
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred color scheme
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme-toggle">Theme</Label>
                    <ThemeToggle />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="node-labels">Show Node Labels</Label>
                      <p className="text-sm text-muted-foreground">Display labels on all nodes</p>
                    </div>
                    <Switch
                      id="node-labels"
                      checked={settings.showNodeLabels}
                      onCheckedChange={(checked) => updateSetting('showNodeLabels', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Connection Settings
                  </CardTitle>
                  <CardDescription>
                    Customize how connections appear and behave
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Connection Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['straight', 'curved', 'step'].map((type) => (
                        <Button
                          key={type}
                          variant={settings.connectionType === type ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateSetting('connectionType', type)}
                          className="capitalize"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animate-connections">Animate Connections</Label>
                      <p className="text-sm text-muted-foreground">Show flowing animation on active connections</p>
                    </div>
                    <Switch
                      id="animate-connections"
                      checked={settings.animateConnections}
                      onCheckedChange={(checked) => updateSetting('animateConnections', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="canvas" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    Canvas Settings
                  </CardTitle>
                  <CardDescription>
                    Configure the workspace appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-grid">Show Grid</Label>
                      <p className="text-sm text-muted-foreground">Display background grid</p>
                    </div>
                    <Switch
                      id="show-grid"
                      checked={settings.showGrid}
                      onCheckedChange={(checked) => updateSetting('showGrid', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-minimap">Show Minimap</Label>
                      <p className="text-sm text-muted-foreground">Display navigation minimap</p>
                    </div>
                    <Switch
                      id="show-minimap"
                      checked={settings.showMinimap}
                      onCheckedChange={(checked) => updateSetting('showMinimap', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="snap-to-grid">Snap to Grid</Label>
                      <p className="text-sm text-muted-foreground">Align nodes to grid when moving</p>
                    </div>
                    <Switch
                      id="snap-to-grid"
                      checked={settings.snapToGrid}
                      onCheckedChange={(checked) => updateSetting('snapToGrid', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    General application preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-save">Auto Save</Label>
                      <p className="text-sm text-muted-foreground">Automatically save changes</p>
                    </div>
                    <Switch
                      id="auto-save"
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}