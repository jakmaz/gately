"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Zap, Calculator, Clock, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { Edge, Node } from "reactflow";
import { GateNodeProps } from "@/lib/types";

interface ExamplesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportExample: (nodes: Node<GateNodeProps>[], edges: Edge[], name: string) => void;
}

interface ExampleCircuit {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  nodes: Node<GateNodeProps>[];
  edges: Edge[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export function ExamplesDialog({ open, onOpenChange, onImportExample }: ExamplesDialogProps) {
  const examples: ExampleCircuit[] = [
    {
      id: 'basic-gates',
      name: 'Basic Logic Gates',
      description: 'Simple demonstration of AND, OR, and NOT gates with inputs and outputs.',
      icon: <Zap className="h-5 w-5" />,
      difficulty: 'Beginner',
      nodes: [
        { id: 'input-1', type: 'inputNode', position: { x: 100, y: 100 }, data: { label: 'Input A', state: false } },
        { id: 'input-2', type: 'inputNode', position: { x: 100, y: 200 }, data: { label: 'Input B', state: false } },
        { id: 'and-1', type: 'andGate', position: { x: 300, y: 150 }, data: { label: 'AND', state: false } },
        { id: 'output-1', type: 'outputNode', position: { x: 500, y: 150 }, data: { label: 'Output', state: false } },
      ],
      edges: [
        { id: 'e1', source: 'input-1', target: 'and-1', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e2', source: 'input-2', target: 'and-1', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e3', source: 'and-1', target: 'output-1', sourceHandle: 'output', targetHandle: 'input' },
      ],
    },
    {
      id: 'half-adder',
      name: 'Half Adder',
      description: 'A circuit that adds two single binary digits and outputs the sum and carry.',
      icon: <Calculator className="h-5 w-5" />,
      difficulty: 'Intermediate',
      nodes: [
        { id: 'input-a', type: 'inputNode', position: { x: 100, y: 100 }, data: { label: 'A', state: false } },
        { id: 'input-b', type: 'inputNode', position: { x: 100, y: 200 }, data: { label: 'B', state: false } },
        { id: 'xor-1', type: 'xorGate', position: { x: 300, y: 100 }, data: { label: 'XOR', state: false } },
        { id: 'and-1', type: 'andGate', position: { x: 300, y: 200 }, data: { label: 'AND', state: false } },
        { id: 'output-sum', type: 'outputNode', position: { x: 500, y: 100 }, data: { label: 'Sum', state: false } },
        { id: 'output-carry', type: 'outputNode', position: { x: 500, y: 200 }, data: { label: 'Carry', state: false } },
      ],
      edges: [
        { id: 'e1', source: 'input-a', target: 'xor-1', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e2', source: 'input-b', target: 'xor-1', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e3', source: 'input-a', target: 'and-1', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e4', source: 'input-b', target: 'and-1', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e5', source: 'xor-1', target: 'output-sum', sourceHandle: 'output', targetHandle: 'input' },
        { id: 'e6', source: 'and-1', target: 'output-carry', sourceHandle: 'output', targetHandle: 'input' },
      ],
    },
    {
      id: 'sr-latch',
      name: 'SR Latch',
      description: 'A basic memory circuit using NOR gates that can store one bit of information.',
      icon: <Clock className="h-5 w-5" />,
      difficulty: 'Advanced',
      nodes: [
        { id: 'input-s', type: 'inputNode', position: { x: 100, y: 100 }, data: { label: 'Set', state: false } },
        { id: 'input-r', type: 'inputNode', position: { x: 100, y: 250 }, data: { label: 'Reset', state: false } },
        { id: 'nor-1', type: 'norGate', position: { x: 300, y: 120 }, data: { label: 'NOR', state: false } },
        { id: 'nor-2', type: 'norGate', position: { x: 300, y: 230 }, data: { label: 'NOR', state: false } },
        { id: 'output-q', type: 'outputNode', position: { x: 500, y: 120 }, data: { label: 'Q', state: false } },
        { id: 'output-qn', type: 'outputNode', position: { x: 500, y: 230 }, data: { label: 'Q̄', state: false } },
      ],
      edges: [
        { id: 'e1', source: 'input-s', target: 'nor-1', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e2', source: 'input-r', target: 'nor-2', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e3', source: 'nor-2', target: 'nor-1', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e4', source: 'nor-1', target: 'nor-2', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e5', source: 'nor-1', target: 'output-q', sourceHandle: 'output', targetHandle: 'input' },
        { id: 'e6', source: 'nor-2', target: 'output-qn', sourceHandle: 'output', targetHandle: 'input' },
      ],
    },
    {
      id: 'multiplexer',
      name: '2-to-1 Multiplexer',
      description: 'A circuit that selects one of two inputs based on a control signal.',
      icon: <Shuffle className="h-5 w-5" />,
      difficulty: 'Intermediate',
      nodes: [
        { id: 'input-a', type: 'inputNode', position: { x: 100, y: 100 }, data: { label: 'Input A', state: false } },
        { id: 'input-b', type: 'inputNode', position: { x: 100, y: 200 }, data: { label: 'Input B', state: false } },
        { id: 'input-sel', type: 'inputNode', position: { x: 100, y: 300 }, data: { label: 'Select', state: false } },
        { id: 'not-1', type: 'notGate', position: { x: 250, y: 300 }, data: { label: 'NOT', state: false } },
        { id: 'and-1', type: 'andGate', position: { x: 400, y: 150 }, data: { label: 'AND', state: false } },
        { id: 'and-2', type: 'andGate', position: { x: 400, y: 250 }, data: { label: 'AND', state: false } },
        { id: 'or-1', type: 'orGate', position: { x: 550, y: 200 }, data: { label: 'OR', state: false } },
        { id: 'output-1', type: 'outputNode', position: { x: 700, y: 200 }, data: { label: 'Output', state: false } },
      ],
      edges: [
        { id: 'e1', source: 'input-a', target: 'and-1', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e2', source: 'input-b', target: 'and-2', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e3', source: 'input-sel', target: 'not-1', sourceHandle: 'output', targetHandle: 'input' },
        { id: 'e4', source: 'not-1', target: 'and-1', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e5', source: 'input-sel', target: 'and-2', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e6', source: 'and-1', target: 'or-1', sourceHandle: 'output', targetHandle: 'input-1' },
        { id: 'e7', source: 'and-2', target: 'or-1', sourceHandle: 'output', targetHandle: 'input-2' },
        { id: 'e8', source: 'or-1', target: 'output-1', sourceHandle: 'output', targetHandle: 'input' },
      ],
    },
  ];

  const handleImportExample = (example: ExampleCircuit) => {
    onImportExample(example.nodes, example.edges, example.name);
    onOpenChange(false);
    toast.success(`Imported "${example.name}" successfully`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Example Circuits
          </DialogTitle>
          <DialogDescription>
            Import pre-built circuits to learn and experiment with different logic designs.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
          {examples.map((example) => (
            <Card key={example.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {example.icon}
                    <CardTitle className="text-lg">{example.name}</CardTitle>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                    {example.difficulty}
                  </span>
                </div>
                <CardDescription className="text-sm">
                  {example.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {example.nodes.length} nodes • {example.edges.length} connections
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleImportExample(example)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Import
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
