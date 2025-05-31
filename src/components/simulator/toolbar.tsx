"use client";

import { useCallback } from "react";
import { useReactFlow } from "reactflow";

type GateProps = {
  nodeType: string;
  symbol: string;
  label: string;
  onClick?: () => void;
};

function Gate({ nodeType, symbol, label, onClick }: GateProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="p-2 border rounded-md flex flex-col items-center justify-center hover:bg-accent cursor-grab transition-colors"
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
    >
      <div className="text-lg font-mono mb-1">{symbol}</div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

const sections = [
  {
    title: "Input & Output",
    gates: [
      { nodeType: "inputNode", symbol: "=1", label: "Input" },
      { nodeType: "outputNode", symbol: "=>", label: "Output" },
    ],
  },
  {
    title: "Logic Gates",
    gates: [
      { nodeType: "andGate", symbol: "&", label: "AND" },
      { nodeType: "orGate", symbol: "|", label: "OR" },
      { nodeType: "notGate", symbol: "~", label: "NOT" },
      { nodeType: "nandGate", symbol: "!&", label: "NAND" },
      { nodeType: "norGate", symbol: "!|", label: "NOR" },
      { nodeType: "xorGate", symbol: "^", label: "XOR" },
      { nodeType: "xnorGate", symbol: "!^", label: "XNOR" },
    ],
  },
];
export function Toolbar() {

  const { addNodes } = useReactFlow();

  const handleAddNode = useCallback(
    (nodeType: string) => {
      // Add at a static position for now; you can improve it later
      const newNode = {
        id: `${nodeType}-${Date.now()}`,
        type: nodeType,
        position: { x: 100, y: 100 }, // Set an appropriate position
        data: {},
      };
      addNodes(newNode);
    },
    [addNodes]
  );

  return (
    <div className="w-64 bg-card p-4 rounded-xl flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Gates</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop gates to the canvas or click to add
        </p>
      </div>

      {sections.map(({ title, gates }) => (
        <section key={title}>
          <h3 className="text-md font-medium mb-2">{title}</h3>
          <div className="grid grid-cols-2 gap-2">
            {gates.map(({ nodeType, symbol, label }) => (
              <Gate
                key={nodeType}
                nodeType={nodeType}
                symbol={symbol}
                label={label}
                onClick={() => handleAddNode(nodeType)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
