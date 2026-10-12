// These diagrams use the same gate silhouettes as the editor's node components.
const GATE_PATHS = {
  AND: "M10 4 L36 4 A26 26 0 0 1 36 56 L10 56 Z",
  OR: "M10 4 C28 4,64 10.8,70 30 C64 49.2,28 56,10 56 Q21 30,10 4 Z",
  NOT: "M10 4 L62 30 L10 56 Z",
  XOR: "M14 4 C32 4,64 10.8,70 30 C64 49.2,32 56,14 56 Q25 30,14 4 Z",
  NAND: "M10 4 L36 4 A26 26 0 0 1 36 56 L10 56 Z",
  NOR: "M10 4 C28 4,58 10.8,64 30 C58 49.2,28 56,10 56 Q21 30,10 4 Z",
  MUX: "M10 8 L70 16 L70 44 L10 52 Z",
};

type GateType = keyof typeof GATE_PATHS;

export function GateDrawing({
  type,
  x = 0,
  y = 0,
  scale = 1,
  state,
  label = false,
}: {
  type: GateType;
  x?: number;
  y?: number;
  scale?: number;
  state?: boolean;
  label?: boolean;
}) {
  const inverted = type === "NOT" || type === "NAND" || type === "NOR";
  const inputX = type === "XOR" ? 18 : type === "OR" || type === "NOR" ? 14 : 10;
  const outputX = inverted ? 73 : type === "AND" ? 62 : 70;
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      className={`gate${state === undefined ? "" : ` signal${state ? " high" : ""}`}`}
    >
      <path className="gate-extra" d={type === "NOT" ? "M0 30H10" : `M0 12H${inputX} M0 48H${inputX}`} />
      <path className="gate-extra" d={`M${outputX} 30H80`} />
      <path className="gate-body" d={GATE_PATHS[type]} />
      {type === "XOR" && <path className="gate-extra" d="M8 4 Q19 30 8 56" />}
      {inverted && <circle className="gate-body" cx={type === "NOT" ? 67 : 68} cy="30" r="5" />}
      {label && (
        <text className="gate-name" x="36" y="83">
          {type}
        </text>
      )}
    </g>
  );
}

export function GateShelf() {
  return (
    <div className="gate-shelf">
      {(["AND", "OR", "NOT", "XOR", "NAND", "NOR"] as const).map((type) => (
        <div key={type}>
          <svg viewBox="0 0 90 68" aria-hidden="true">
            <GateDrawing type={type} x={4} y={3} />
          </svg>
          <span>{type}</span>
        </div>
      ))}
    </div>
  );
}
