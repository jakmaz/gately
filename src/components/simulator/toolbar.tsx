"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Hand, Orbit, X, FileDown, ToggleLeft, ExternalLink, RotateCcw, CircuitBoard } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Toolbar() {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 border-r bg-card p-4 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Gates</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop gates to the canvas
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "inputNode")}
              >
                <ToggleLeft className="h-8 w-8 mb-1 text-blue-500" />
                <span className="text-xs">Input</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Input Node: Click to toggle state</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "outputNode")}
              >
                <ExternalLink className="h-8 w-8 mb-1 text-green-500" />
                <span className="text-xs">Output</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Output Node: Shows final output state</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "andGate")}
              >
                <Hand className="h-8 w-8 mb-1 text-indigo-500" />
                <span className="text-xs">AND</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>AND Gate: True if both inputs are true</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "orGate")}
              >
                <Orbit className="h-8 w-8 mb-1 text-orange-500" />
                <span className="text-xs">OR</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>OR Gate: True if any input is true</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "notGate")}
              >
                <X className="h-8 w-8 mb-1 text-red-500" />
                <span className="text-xs">NOT</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>NOT Gate: Inverts the input</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "nandGate")}
              >
                <CircuitBoard className="h-8 w-8 mb-1 text-purple-500" />
                <span className="text-xs">NAND</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>NAND Gate: False only if both inputs are true</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "norGate")}
              >
                <RotateCcw className="h-8 w-8 mb-1 text-yellow-500" />
                <span className="text-xs">NOR</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>NOR Gate: True only if both inputs are false</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "xorGate")}
              >
                <X className="h-8 w-8 mb-1 text-teal-500" />
                <span className="text-xs">XOR</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>XOR Gate: True if inputs are different</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
                draggable
                onDragStart={(e) => onDragStart(e, "xnorGate")}
              >
                <FileDown className="h-8 w-8 mb-1 text-cyan-500" />
                <span className="text-xs">XNOR</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>XNOR Gate: True if inputs are the same</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Separator className="my-4" />

      <div className="mt-auto flex justify-between">
        <ThemeToggle />
        <Button variant="outline" size="sm">
          Help
        </Button>
      </div>
    </div>
  );
}
