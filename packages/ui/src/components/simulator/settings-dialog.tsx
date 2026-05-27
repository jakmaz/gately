"use client";

import { Bug, Grid, Keyboard, Palette, SettingsIcon, Zap } from "lucide-react";
import { useState } from "react";
import { type Settings, useSettingsStore } from "../../hooks/use-settings-store";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ThemeToggle } from "./theme-toggle";

type TabId = "appearance" | "connections" | "canvas" | "debug" | "hotkeys";

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-border/40 last:border-0">
      <div className="pr-8">
        <Label className="text-base font-medium">{title}</Label>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function HotkeyRow({ action, shortcut }: { action: string; shortcut: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
      <span className="text-sm font-medium">{action}</span>
      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md border border-border/50 font-mono">
        {shortcut}
      </span>
    </div>
  );
}

export function SettingsDialog() {
  const { settings, updateSetting } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<TabId>("appearance");

  const tabs = [
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "connections", label: "Connections", icon: Zap },
    { id: "canvas", label: "Canvas", icon: Grid },
    { id: "debug", label: "Debug", icon: Bug },
    { id: "hotkeys", label: "Hotkeys", icon: Keyboard },
  ] as const;

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="sm" />}>
        <SettingsIcon className="h-4 w-4 mr-2" />
        Settings
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl w-full h-[70vh] flex flex-col p-0 gap-0 overflow-hidden bg-background sm:rounded-xl">
        <DialogDescription className="sr-only">Customize your simulator experience</DialogDescription>
        <div className="flex flex-1 overflow-hidden h-full">
          {/* Sidebar */}
          <div className="w-56 border-r border-border/40 bg-muted/10 p-4 space-y-1 overflow-y-auto shrink-0">
            <div className="mb-6 px-2 mt-2">
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Settings
              </DialogTitle>
            </div>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 w-full">
            <div className="max-w-3xl w-full">
              <h3 className="text-2xl font-semibold mb-6">{tabs.find((t) => t.id === activeTab)?.label}</h3>

              {activeTab === "appearance" && (
                <div className="flex flex-col">
                  <SettingRow title="Theme" description="Choose your preferred color scheme">
                    <ThemeToggle />
                  </SettingRow>
                  <SettingRow title="Show Node Labels" description="Display labels on all nodes">
                    <Switch
                      checked={settings.showNodeLabels}
                      onCheckedChange={(checked) => updateSetting("showNodeLabels", checked)}
                    />
                  </SettingRow>
                </div>
              )}

              {activeTab === "connections" && (
                <div className="flex flex-col">
                  <SettingRow title="Connection Type" description="Customize how connections appear and behave">
                    <div className="flex gap-1 bg-muted/50 p-1 rounded-lg border border-border/50">
                      {["straight", "curved", "step"].map((type) => (
                        <Button
                          key={type}
                          variant={settings.connectionType === type ? "default" : "ghost"}
                          size="sm"
                          onClick={() => updateSetting("connectionType", type as Settings["connectionType"])}
                          className="capitalize h-8 px-4"
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </SettingRow>
                  <SettingRow title="Animate Connections" description="Show flowing animation on active connections">
                    <Switch
                      checked={settings.animateConnections}
                      onCheckedChange={(checked) => updateSetting("animateConnections", checked)}
                    />
                  </SettingRow>
                </div>
              )}

              {activeTab === "canvas" && (
                <div className="flex flex-col">
                  <SettingRow title="Show Grid" description="Display background grid">
                    <Switch
                      checked={settings.showGrid}
                      onCheckedChange={(checked) => updateSetting("showGrid", checked)}
                    />
                  </SettingRow>
                  <SettingRow title="Show Minimap" description="Display navigation minimap">
                    <Switch
                      checked={settings.showMinimap}
                      onCheckedChange={(checked) => updateSetting("showMinimap", checked)}
                    />
                  </SettingRow>
                  <SettingRow title="Snap to Grid" description="Align nodes to grid when moving">
                    <Switch
                      checked={settings.snapToGrid}
                      onCheckedChange={(checked) => updateSetting("snapToGrid", checked)}
                    />
                  </SettingRow>
                </div>
              )}

              {activeTab === "debug" && (
                <div className="flex flex-col">
                  <SettingRow title="Debug Mode" description="Show debug panel with simulation details">
                    <Switch
                      checked={settings.debugMode}
                      onCheckedChange={(checked) => updateSetting("debugMode", checked)}
                    />
                  </SettingRow>
                </div>
              )}

              {activeTab === "hotkeys" && (
                <div className="flex flex-col">
                  <div className="mb-4 mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Navigation
                  </div>
                  <HotkeyRow action="Pan Canvas" shortcut="Space + Drag / Middle Click" />
                  <HotkeyRow action="Zoom In / Out" shortcut="Ctrl/Cmd + Scroll" />
                  <HotkeyRow action="Fit View" shortcut="Double Click Background" />

                  <div className="mt-8 mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Selection & Editing
                  </div>
                  <HotkeyRow action="Select Multiple" shortcut="Shift + Drag" />
                  <HotkeyRow action="Delete Selected" shortcut="Backspace / Delete" />
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
