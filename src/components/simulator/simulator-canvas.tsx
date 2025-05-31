/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useSettings } from "@/hooks/use-settings";
import { GateNodeProps } from "@/lib/types";
import { LoaderCircle } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  Panel,
  ReactFlowInstance,
} from "reactflow";
import { ANDGateNode } from "../nodes/and";
import { InputNode } from "../nodes/input";
import { NANDGateNode } from "../nodes/nand";
import { NORGateNode } from "../nodes/nor";
import { NOTGateNode } from "../nodes/not";
import { ORGateNode } from "../nodes/or";
import { OutputNode } from "../nodes/output";
import { XNORGateNode } from "../nodes/xnor";
import { XORGateNode } from "../nodes/xor";
import { Toolbar } from "./toolbar";

const nodeTypes: NodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  andGate: ANDGateNode,
  orGate: ORGateNode,
  notGate: NOTGateNode,
  nandGate: NANDGateNode,
  norGate: NORGateNode,
  xorGate: XORGateNode,
  xnorGate: XNORGateNode,
};

type Props = {
  nodes: Node<GateNodeProps>[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<GateNodeProps>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnectEdge: (connection: Connection) => void;
  onNodeClick: (node: Node<GateNodeProps>) => void;
  onReactFlowInit?: (instance: ReactFlowInstance) => void;
  nodesDraggable: boolean
};

export function SimulatorCanvas({
  nodes,
  edges,
  setNodes,
  onNodesChange,
  onEdgesChange,
  onConnectEdge,
  onNodeClick,
  onReactFlowInit,
  nodesDraggable
}: Props) {
  const hasMounted = useHasMounted();
  const { settings } = useSettings();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      setReactFlowInstance(instance);
      onReactFlowInit?.(instance);
    },
    [onReactFlowInit]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: type, state: false },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, reactFlowInstance, setNodes]
  );

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center w-full h-full text-xl text-muted-foreground">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        className="bg-background"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnectEdge}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        snapToGrid={settings.snapToGrid}
        snapGrid={[20, 20]}
        nodeTypes={nodeTypes}
        nodesDraggable={nodesDraggable}
        onNodeClick={(_, node) => onNodeClick(node)}
        fitView
      >
        <Panel position="top-left">
          <Toolbar />
        </Panel>
        {settings.showMinimap && <MiniMap className="bg-card" />}
        {settings.showGrid && <Background gap={12} size={1} />}
      </ReactFlow>
    </div>
  );
}
