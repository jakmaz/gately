import { useHasMounted } from "@/hooks/use-has-mounted";
import { useSettings } from "@/hooks/use-settings";
import { LoaderCircle } from "lucide-react";
import { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  NodeTypes,
  Panel,
  useNodes,
  useEdges,
  useReactFlow,
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
import { useSimulatorLogic } from "@/hooks/use-simulator-logic";

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

export function SimulatorCanvas() {
  const hasMounted = useHasMounted();
  const { settings } = useSettings();
  const reactFlowWrapper = useRef(null);

  const nodes = useNodes();
  const edges = useEdges();
  const reactFlowInstance = useReactFlow()
  const { onNodesChange, onEdgesChange, onConnectEdge, onNodeClick } = useSimulatorLogic();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

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

      reactFlowInstance.setNodes((nds) => nds.concat(newNode));
    },
    [nodes, reactFlowInstance]
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
        onDrop={onDrop}
        onDragOver={onDragOver}
        snapToGrid={settings.snapToGrid}
        snapGrid={[20, 20]}
        nodeTypes={nodeTypes}
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
