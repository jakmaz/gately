import type { GateNodeProps } from "@gately/core/types";
import {
  Background,
  type Edge,
  MiniMap,
  type Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { simulateCircuit } from "../../hooks/simulator-utils";
import { useFileSystem } from "../../hooks/use-file-system";
import { useHasMounted } from "../../hooks/use-has-mounted";
import { useSettingsStore } from "../../hooks/use-settings-store";
import { useSimulatorLogic } from "../../hooks/use-simulator-logic";
import { nodeTypes } from "../../node-types";
import { GRID_SIZE } from "../nodes/base/constants";
import { Toolbar } from "./toolbar";

export function SimulatorCanvas() {
  const hasMounted = useHasMounted();
  const { settings } = useSettingsStore();
  const { currentFileId, updateFileContent, ready, getCurrentFile } = useFileSystem();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<GateNodeProps>>([]);
  const [edges, setEdges, _onEdgesChange] = useEdgesState<Edge>([]);
  const { onConnectEdge, onAddGate, onEdgesChangeWithSimulation, onDrop, onDragOver } = useSimulatorLogic(
    setNodes,
    setEdges,
  );

  // Auto-save current circuit when nodes or edges change
  useEffect(() => {
    if (currentFileId && (nodes.length > 0 || edges.length > 0)) {
      const saveTimeout = setTimeout(() => {
        console.debug("Saving file", currentFileId);
        updateFileContent(currentFileId, { nodes, edges });
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(saveTimeout);
    }
  }, [nodes, edges, currentFileId, updateFileContent]);

  useEffect(() => {
    if (!ready) return;
    const currentFile = getCurrentFile();
    console.debug("Loading file", currentFileId);

    if (currentFile?.data) {
      const simulated = simulateCircuit(
        currentFile.data.nodes,
        currentFile.data.edges,
        useSettingsStore.getState().settings,
      );
      setNodes(simulated.nodes);
      setEdges(simulated.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [currentFileId, ready, getCurrentFile, setEdges, setNodes]);

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center w-full h-full text-xl text-muted-foreground">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 h-full">
      <ReactFlow<Node<GateNodeProps>, Edge>
        className="bg-background"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChangeWithSimulation}
        onConnect={onConnectEdge}
        onDrop={onDrop}
        onDragOver={onDragOver}
        snapToGrid={settings.snapToGrid}
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel position="top-left">
          <Toolbar onAddGate={onAddGate} />
        </Panel>
        {settings.showMinimap && <MiniMap className="bg-card" />}
        {settings.showGrid && <Background gap={GRID_SIZE} size={1} color="var(--border)" />}
      </ReactFlow>
    </div>
  );
}
