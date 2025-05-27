"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Hand, Orbit, X, FileDown, ToggleLeft, ExternalLink, RotateCcw, CircuitBoard } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

type GateProps = {
  nodeType: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  iconClassName?: string;
};

function Gate({ nodeType, Icon, label, iconClassName = "" }: GateProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
      draggable
      onDragStart={onDragStart}
    >
      <Icon className={`h-8 w-8 mb-1 ${iconClassName}`} />
      <span className="text-xs">{label}</span>
    </div>
  );
}

export function Toolbar() {
  const sections = [
    {
      title: "Input & Output",
      gates: [
        { nodeType: "inputNode", Icon: ToggleLeft, label: "Input" },
        { nodeType: "outputNode", Icon: ExternalLink, label: "Output" },
      ],
    },
    {
      title: "Logic Gates",
      gates: [
        { nodeType: "andGate", Icon: Hand, label: "AND" },
        { nodeType: "orGate", Icon: Orbit, label: "OR" },
        { nodeType: "notGate", Icon: X, label: "NOT" },
        { nodeType: "nandGate", Icon: CircuitBoard, label: "NAND" },
        { nodeType: "norGate", Icon: RotateCcw, label: "NOR" },
        { nodeType: "xorGate", Icon: X, label: "XOR" },
        { nodeType: "xnorGate", Icon: FileDown, label: "XNOR" },
      ],
    },
  ];

  return (
    <div className="w-64 border-r bg-card p-4 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Gates</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop gates to the canvas
        </p>
      </div>

      {sections.map(({ title, gates }) => (
        <section key={title} className="mb-6">
          <h3 className="text-md font-medium mb-4">{title}</h3>
          <div className="grid grid-cols-2 gap-2">
            {gates.map(({ nodeType, Icon, label }) => (
              <Gate key={nodeType} nodeType={nodeType} Icon={Icon} label={label} />
            ))}
          </div>
        </section>
      ))}


      <div className="mt-auto flex justify-between">
        <ThemeToggle />
        <Button variant="outline" size="sm">
          Help
        </Button>
      </div>
    </div>
  );
}
