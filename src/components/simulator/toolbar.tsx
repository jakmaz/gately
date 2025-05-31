"use client";

type GateProps = {
  nodeType: string;
  symbol: string;
  label: string;
};

function Gate({ nodeType, symbol, label }: GateProps) {
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
      <div className="text-lg font-mono mb-1">{symbol}</div>
      <span className="text-xs">{label}</span>
    </div>
  );
}

export function Toolbar() {
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

  return (
    <div className="w-64 bg-card p-4 rounded-xl flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Gates</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop gates to the canvas
        </p>
      </div>

      {sections.map(({ title, gates }) => (
        <section key={title}>
          <h3 className="text-md font-medium mb-2">{title}</h3>
          <div className="grid grid-cols-2 gap-2">
            {gates.map(({ nodeType, symbol, label }) => (
              <Gate key={nodeType} nodeType={nodeType} symbol={symbol} label={label} />
            ))}
          </div>
        </section >
      ))
      }
    </div >
  );
}
