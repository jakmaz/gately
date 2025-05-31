/* eslint-disable react-hooks/exhaustive-deps */
import { useFileSystem } from "@/hooks/use-file-system";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useSettings } from "@/hooks/use-settings";
import { useSimulatorLogic } from "@/hooks/use-simulator-logic";
import { nodeTypes } from "@/lib/types";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  Panel,
  useEdgesState,
  useNodesState
} from "reactflow";
import { Toolbar } from "./toolbar";

export function SimulatorCanvas() {
  const hasMounted = useHasMounted();
  const { settings } = useSettings();
  const { currentFileId, updateFileContent, ready, getCurrentFile } = useFileSystem();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { onConnectEdge, onNodeClick, onDrop, onDragOver } = useSimulatorLogic();

  // Auto-save current circuit when nodes or edges change
  useEffect(() => {
    if (currentFileId && (nodes.length > 0 || edges.length > 0)) {
      const saveTimeout = setTimeout(() => {
        console.debug("Saving file", currentFileId);
        updateFileContent(currentFileId, { nodes, edges });
      }, 1000); // Auto-save after 1 second of inactivity

      return () => clearTimeout(saveTimeout);
    }

  }, [nodes, edges]);

  useEffect(() => {
    if (!ready) return;
    const currentFile = getCurrentFile();
    console.debug("Loading file", currentFileId);

    if (currentFile?.data) {
      setNodes(currentFile.data.nodes);
      setEdges(currentFile.data.edges);
    } else {
      setNodes([]);
      setEdges([]);
    }

  }, [currentFileId, ready]);

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center w-full h-full text-xl text-muted-foreground">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 h-full">
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
