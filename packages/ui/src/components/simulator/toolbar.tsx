"use client";

import { type GateType, gateCatalog } from "../../node-types";
import { GateSymbol } from "../nodes/base/gate-symbol";

const sections: { title: string; gates: GateType[] }[] = [
  { title: "Inputs & outputs", gates: ["toggleNode", "pushNode", "outputNode"] },
  {
    title: "Logic gates",
    gates: ["buffGate", "notGate", "andGate", "nandGate", "orGate", "norGate", "xorGate", "xnorGate"],
  },
  { title: "Multiplexers", gates: ["muxGate", "dmuxGate"] },
];

export function Toolbar({ onAddGate }: { onAddGate: (type: GateType) => void }) {
  return (
    <div className="flex w-72 max-w-[calc(100vw-2rem)] max-h-[calc(100dvh-8rem)] flex-col overflow-hidden rounded-xl border bg-card shadow-md">
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold">Components</h2>
        <p className="mt-1 text-xs text-muted-foreground">Drag or click to add</p>
      </div>
      <div className="space-y-5 overflow-y-auto p-3">
        {sections.map(({ title, gates }) => (
          <section key={title}>
            <h3 className="mb-2 px-1 text-xs font-medium text-muted-foreground">{title}</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {gates.map((type) => {
                const gate = gateCatalog[type];
                return (
                  <button
                    key={type}
                    type="button"
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData("application/@xyflow/react", type);
                      event.dataTransfer.effectAllowed = "move";
                    }}
                    onClick={() => onAddGate(type)}
                    aria-label={`Add ${gate.label}`}
                    className="group flex h-22 cursor-grab flex-col items-center justify-center gap-1 rounded-md bg-transparent text-muted-foreground outline-none transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
                  >
                    <span className="pointer-events-none">
                      <GateSymbol geometry={gate.geometry} size={56} showName={false} />
                    </span>
                    <span className="text-[11px] font-medium">{gate.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
