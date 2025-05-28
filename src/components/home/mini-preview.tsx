import { useCallback } from "react";
import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  addEdge,
  Controls
} from "reactflow";
import "reactflow/dist/style.css"; // ✅ Import required styles

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, type: "default" },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, type: "default" }
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", type: "default" }];

export function MiniPreview() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-82 w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
