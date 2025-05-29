"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Share,
  Settings,
  Menu,
  FileText,
  Copy,
  Save,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import AndGate from "../icons/and-gate";
import { SettingsDialog } from "./settings-dialog";
import { ExamplesDialog } from "./examples-dialog";
import { Edge, Node } from "reactflow";
import { GateNodeProps } from "@/lib/types";

interface EnhancedHeaderProps {
  nodes: Node<GateNodeProps>[];
  edges: Edge[];
  onToggleSidebar: () => void;
  currentFileName: string;
  onImportExample: (nodes: Node<GateNodeProps>[], edges: Edge[], name: string) => void;
}

export function EnhancedHeader({ nodes, edges, onToggleSidebar, currentFileName, onImportExample }: EnhancedHeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [examplesOpen, setExamplesOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const handleShare = () => {
    // Generate a shareable URL (this would be implemented with actual backend)
    const shareId = Math.random().toString(36).substring(2, 15);
    const url = `${window.location.origin}/shared/${shareId}`;
    setShareUrl(url);
    setShareDialogOpen(true);
  };

  const handleSave = () => {

  }

  const handleExport = () => {

  }
  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share URL copied to clipboard');
  };

  return (
    <>
      <div className="h-14 border-b bg-card flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="p-2"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-0.5 rounded-md">
              <AndGate className="text-white h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">gately</h1>
          </Link>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{currentFileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setExamplesOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Examples
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>

          <a
            href="https://github.com/jamkaz/gately"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Leave Feedback
          </a>
        </div>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <ExamplesDialog 
        open={examplesOpen} 
        onOpenChange={setExamplesOpen} 
        onImportExample={onImportExample}
      />
      
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Circuit</DialogTitle>
            <DialogDescription>
              Share your circuit with others using this link
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Shareable Link</Label>
              <div className="flex gap-2">
                <Input value={shareUrl} readOnly />
                <Button variant="outline" size="sm" onClick={copyShareUrl}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Anyone with this link will be able to view and copy your circuit.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
