"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Save, Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { Edge, Node } from "reactflow";
import { GateNodeProps } from "@/lib/types";

interface SaveLoadPanelProps {
  nodes: Node<GateNodeProps>[];
  edges: Edge[];
  setNodes: (nodes: Node<GateNodeProps>[]) => void;
  setEdges: (edges: Edge[]) => void;
}

export function SaveLoadPanel({ nodes, edges, setNodes, setEdges }: SaveLoadPanelProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [circuitName, setCircuitName] = useState("");
  const [loadKey, setLoadKey] = useState("");

  const saveCircuit = () => {
    if (!circuitName.trim()) {
      toast.error("Please enter a circuit name");
      return;
    }

    const circuitData = {
      nodes,
      edges,
    };

    try {
      localStorage.setItem(`circuit-${circuitName}`, JSON.stringify(circuitData));
      toast.success(`Circuit "${circuitName}" saved successfully`);
      setSaveDialogOpen(false);
      setCircuitName("");
    } catch (error) {
      toast.error("Failed to save circuit");
      console.error("Save error:", error);
    }
  };

  const loadCircuit = () => {
    if (!loadKey.trim()) {
      toast.error("Please enter a circuit name to load");
      return;
    }

    try {
      const savedCircuit = localStorage.getItem(`circuit-${loadKey}`);

      if (!savedCircuit) {
        toast.error(`No circuit found with name "${loadKey}"`);
        return;
      }

      const circuitData = JSON.parse(savedCircuit);
      setNodes(circuitData.nodes);
      setEdges(circuitData.edges);
      toast.success(`Circuit "${loadKey}" loaded successfully`);
      setLoadDialogOpen(false);
      setLoadKey("");
    } catch (error) {
      toast.error("Failed to load circuit");
      console.error("Load error:", error);
    }
  };

  const exportCircuit = () => {
    const circuitData = {
      nodes,
      edges,
    };

    const dataStr = JSON.stringify(circuitData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportName = circuitName || "logic-circuit";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", `${exportName}.json`);
    linkElement.click();

    toast.success("Circuit exported successfully");
  };

  return (
    <div className="flex items-center space-x-2">
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Circuit</DialogTitle>
            <DialogDescription>
              Enter a name for your circuit to save it to your browser's local storage.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={circuitName}
                onChange={(e) => setCircuitName(e.target.value)}
                className="col-span-3"
                placeholder="My Circuit"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCircuit}>Save Circuit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Load
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Load Circuit</DialogTitle>
            <DialogDescription>
              Enter the name of a previously saved circuit to load it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loadKey" className="text-right">
                Name
              </Label>
              <Input
                id="loadKey"
                value={loadKey}
                onChange={(e) => setLoadKey(e.target.value)}
                className="col-span-3"
                placeholder="My Circuit"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLoadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={loadCircuit}>Load Circuit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={exportCircuit}>
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
}
