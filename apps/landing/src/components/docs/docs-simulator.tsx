"use client";

import { calculateNodeStates } from "@gately/core/simulator";
import type { GateNodeProps, LogicGateProps } from "@gately/core/types";
import { ANDGateNode } from "@gately/ui/components/nodes/and";
import { NANDGateNode } from "@gately/ui/components/nodes/nand";
import { NORGateNode } from "@gately/ui/components/nodes/nor";
import { NOTGateNode } from "@gately/ui/components/nodes/not";
import { ORGateNode } from "@gately/ui/components/nodes/or";
import { XORGateNode } from "@gately/ui/components/nodes/xor";
import {
  Background,
  type Edge,
  Handle,
  type Node,
  type NodeTypes,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useMemo } from "react";
import "@xyflow/react/dist/style.css";

function LessonInput({ id, data }: LogicGateProps) {
  const { setNodes } = useReactFlow<Node<GateNodeProps>, Edge>();
  return (
    <div className={`lesson-terminal${data.state ? " is-high" : ""}`}>
      <span className="lesson-terminal-label">{data.label}</span>
      <button
        type="button"
        className="nodrag nopan"
        aria-label={data.label}
        aria-pressed={Boolean(data.state)}
        onClick={() =>
          setNodes((nodes) =>
            nodes.map((node) => (node.id === id ? { ...node, data: { ...node.data, state: !node.data.state } } : node)),
          )
        }
      >
        {Number(Boolean(data.state))}
      </button>
      <Handle type="source" position={Position.Right} id="output" isConnectable={false} />
    </div>
  );
}

function LessonOutput({ data }: LogicGateProps) {
  return (
    <div className={`lesson-terminal${data.state ? " is-high" : ""}`}>
      <span className="lesson-terminal-label">{data.label}</span>
      <output aria-label={data.label}>{Number(Boolean(data.state))}</output>
      <Handle type="target" position={Position.Left} id="input" isConnectable={false} />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  toggleNode: LessonInput,
  outputNode: LessonOutput,
  andGate: ANDGateNode,
  orGate: ORGateNode,
  notGate: NOTGateNode,
  xorGate: XORGateNode,
  nandGate: NANDGateNode,
  norGate: NORGateNode,
};

interface DocsSimulatorProps {
  initialNodes: Node<GateNodeProps>[];
  initialEdges: Edge[];
  height?: string;
}

export function DocsSimulator({ initialNodes, initialEdges, height = "h-[400px]" }: DocsSimulatorProps) {
  const [nodes, , onNodesChange] = useNodesState<Node<GateNodeProps>>(initialNodes);
  const calculatedNodes = useMemo(() => calculateNodeStates(nodes, initialEdges), [nodes, initialEdges]);
  const edges = useMemo(() => {
    const states = new Map(calculatedNodes.map((node) => [node.id, node.data.state]));
    return initialEdges.map((edge) => ({
      ...edge,
      animated: false,
      style: { stroke: states.get(edge.source) ? "var(--signal-high)" : "var(--signal-low)", strokeWidth: 2 },
    }));
  }, [calculatedNodes, initialEdges]);
  const minX = Math.min(...initialNodes.map((node) => node.position.x));
  const maxX = Math.max(...initialNodes.map((node) => node.position.x + 80));
  const diagramWidth = Math.max(520, Math.min(1040, (maxX - minX) * 1.15));
  const results = calculatedNodes.filter((node) => node.type === "outputNode");

  return (
    <div className="learn-simulator">
      <section
        className="lesson-canvas-scroll"
        aria-label="Interactive circuit. Click an input to change its value; scroll horizontally to see the whole circuit."
      >
        <div className={`${height} lesson-canvas`} style={{ minWidth: diagramWidth }}>
          <ReactFlowProvider>
            <ReactFlow<Node<GateNodeProps>, Edge>
              nodes={calculatedNodes}
              edges={edges}
              onNodesChange={onNodesChange}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.16 }}
              maxZoom={1.2}
              panOnDrag={false}
              panOnScroll={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              nodesDraggable={false}
              nodesConnectable={false}
              nodesFocusable={false}
              edgesFocusable={false}
              elementsSelectable={false}
              deleteKeyCode={null}
              preventScrolling={false}
            >
              <Background gap={18} size={1} color="var(--border)" />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </section>
      <div className="lesson-canvas-caption">
        <span>Click an input to change its value.</span>
        <output aria-live="polite" aria-atomic="true">
          {results.map((node) => `${node.data.label}: ${Number(Boolean(node.data.state))}`).join(" · ")}
        </output>
      </div>
    </div>
  );
}
