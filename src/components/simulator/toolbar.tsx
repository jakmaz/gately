"use client";

import { nodeTypes } from "@/lib/types";

type GateProps = {
  nodeType: string;
  symbol: string;
  label: string;
};

type ToolbarProps = {
  children?: React.ReactNode;
};

function Gate({ nodeType, label }: GateProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/@xyflow/react", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const GateComponent = nodeTypes[nodeType];

  return (
    <div
      className="group relative p-2.5 rounded-xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 h-26 overflow-hidden bg-muted/30 border border-border hover:border-primary/50 hover:bg-muted/50"
      draggable
      onDragStart={onDragStart}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <div className="flex-1 w-full flex items-center justify-center pointer-events-none scale-45 origin-center">
        {GateComponent && (
          <GateComponent
            id="preview"
            data={{ label, state: false, preview: true }}
            isConnectable={false}
            selected={false}
            type={nodeType}
            zIndex={0}
            positionAbsoluteX={0}
            positionAbsoluteY={0}
            dragging={false}
            selectable={false}
            deletable={false}
            draggable={false}
          />
        )}
      </div>
      <span className="text-xs font-medium mt-1 text-center text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </span>
    </div>
  );
}

const sections = [
  {
    title: "Input & Output",
    gates: [
      { nodeType: "toggleNode", symbol: "=1", label: "Toggle Switch" },
      { nodeType: "pushNode", symbol: "=1", label: "Push Button" },
      { nodeType: "outputNode", symbol: "=>", label: "Output" },
    ],
  },
  {
    title: "Basic Logic Gates",
    gates: [
      { nodeType: "buffGate", symbol: "-", label: "BUFFER" },
      { nodeType: "notGate", symbol: "~", label: "NOT" },
      { nodeType: "andGate", symbol: "&", label: "AND" },
      { nodeType: "nandGate", symbol: "!&", label: "NAND" },
      { nodeType: "orGate", symbol: "|", label: "OR" },
      { nodeType: "norGate", symbol: "!|", label: "NOR" },
      { nodeType: "xorGate", symbol: "^", label: "XOR" },
      { nodeType: "xnorGate", symbol: "!^", label: "XNOR" },
    ],
  },
  {
    title: "Multiplexers",
    gates: [
      { nodeType: "muxGate", symbol: "MUX", label: "MUX" },
      { nodeType: "dmuxGate", symbol: "DMUX", label: "DMUX" },
    ],
  },
];

export function Toolbar({ children }: ToolbarProps) {
  return (
    <div className="w-80 bg-card rounded-2xl flex flex-col h-full border border-border/60 shadow-xl overflow-hidden">
      <div className="p-5 bg-linear-to-br from-primary/5 to-transparent">
        <h2 className="text-xl font-bold mb-1">Components</h2>
        <p className="text-sm text-muted-foreground">Drag gates to add to circuit</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {sections.map(({ title, gates }) => (
          <section key={title} className="mb-6 last:mb-0">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {title}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {gates.map(({ nodeType, symbol, label }) => (
                <Gate key={nodeType} nodeType={nodeType} symbol={symbol} label={label} />
              ))}
            </div>
          </section>
        ))}
      </div>
        {children}
    </div>
  );
}
