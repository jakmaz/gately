"use client";

import { Handle, Position } from "reactflow";
import { LogicGateProps } from "@/lib/types";

interface BaseGateNodeProps extends LogicGateProps {
  label: string;
  symbol: string;
  inputHandles?: number;
  outputHandles?: number;
}

export function BaseGateNode({
  data,
  isConnectable,
  label,
  symbol,
  inputHandles = 2,
  outputHandles = 1
}: BaseGateNodeProps) {
  const stateColor = data.state ? "green-500" : "primary";

  const inputArray = Array.from({ length: inputHandles }, (_, i) => i);
  const outputArray = Array.from({ length: outputHandles }, (_, i) => i);

  // Calculate positions for multiple handles
  const getInputPosition = (index: number, total: number) => {
    if (total === 1) return 0.5;
    return 0.25 + (0.5 / (total - 1)) * index;
  };

  const getOutputPosition = (index: number, total: number) => {
    if (total === 1) return 0.5;
    return 0.25 + (0.5 / (total - 1)) * index;
  };

  return (
    <div className={`
      relative px-4 py-2 rounded-md border-2 shadow-md 
      ${data.state ? 'border-green-500 shadow-green-200 dark:shadow-green-900' : 'border-primary shadow-primary'}
      bg-card
    `}>
      <div className="flex flex-col items-center min-w-[100px]">
        <div className="text-lg font-bold mb-1">{label}</div>
        <div className="text-2xl font-mono">{symbol}</div>
        <div className={`
          w-3 h-3 rounded-full mt-2 transition-colors
          ${stateColor}
        `}></div>
      </div>

      {/* Input handles */}
      {inputArray.map((_, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`input-${index}`}
          style={{ top: `${getInputPosition(index, inputHandles) * 100}%`, left: -8 }}
          isConnectable={isConnectable}
          className={`!w-3 !h-3 !border-${stateColor}`}
        />
      ))}

      {/* Output handles */}
      {outputArray.map((_, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`output-${index}`}
          style={{ top: `${getOutputPosition(index, outputHandles) * 100}%`, right: -8 }}
          isConnectable={isConnectable}
          className={`!w-3 !h-3 !border-${stateColor}`}
        />
      ))}
    </div>
  );
}
