"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edge, Node } from "reactflow";
import { GateNodeProps } from "@/lib/types";
import { FileText, Import } from "lucide-react";

interface ExamplesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportExample: (nodes: Node<GateNodeProps>[], edges: Edge[], name: string) => void;
}

const examples = [
  {
    name: "Basic Gates",
    description: "Examples of all basic logic gates",
    nodes: [], // To be implemented
    edges: [], // To be implemented
  },
  {
    name: "Half Adder",
    description: "A circuit that adds two single binary digits",
    nodes: [], // To be implemented
    edges: [], // To be implemented
  },
  {
    name: "Full Adder",
    description: "A circuit that adds three single binary digits",
    nodes: [], // To be implemented
    edges: [], // To be implemented
  },
  {
    name: "4-Bit Counter",
    description: "A sequential circuit that counts in binary",
    nodes: [], // To be implemented
    edges: [], // To be implemented
  },
];

export function ExamplesDialog({ open, onOpenChange, onImportExample }: ExamplesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Example Circuits</DialogTitle>
          <DialogDescription>
            Import example circuits to learn and experiment with
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          {examples.map((example) => (
            <div key={example.name} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{example.name}</h3>
                  <p className="text-sm text-muted-foreground">{example.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onImportExample(example.nodes, example.edges, example.name);
                    onOpenChange(false);
                  }}
                >
                  <Import className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}