/* eslint-disable react-hooks/exhaustive-deps */

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
import { useEffect, useState } from "react";
import { LoaderCircle, RefreshCw, Table2, EyeOff, Eye } from "lucide-react";
import { useFileSystem } from "@/hooks/use-file-system";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { useSimulatorLogic } from "@/hooks/use-simulator-logic";
import { type GateNodeProps, nodeTypes } from "@/lib/types";
import { Toolbar } from "./toolbar";
import { TruthTable } from "./truth-table";

function TruthTablePanel({ nodes, edges }: { nodes: any[]; edges: any[] }) {
  const [key, setKey] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleRefresh = () => {
    setSpinning(true);
    setKey((k) => k + 1);
    setTimeout(() => setSpinning(false), 600);
  };

  const isEmpty = nodes.length === 0;

  return (
    <>
      <style>{`
        @keyframes tt-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes tt-pulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
        @keyframes tt-slide-in { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform: translateY(0); } }
        .tt-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .tt-scroll::-webkit-scrollbar-track { background: transparent; }
        .tt-scroll::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 4px; }
        .tt-scroll::-webkit-scrollbar-corner { background: transparent; }
        .tt-spinning { animation: tt-spin 0.6s linear; }
      `}</style>

      {/* Toggle button */}
      <div className={`flex justify-end ${visible ? "mb-2" : ""}`}>
        <button
          onClick={() => setVisible((v) => !v)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-xs font-medium tracking-wide cursor-pointer"
        >
          {visible ? <EyeOff size={11} /> : <Eye size={11} />}
          {visible ? "Hide table" : "Show table"}
        </button>
      </div>

      {/* Panel */}
      {visible && (
        <div
          className="bg-card border border-border rounded-xl overflow-hidden shadow-lg"
          style={{
            width: "clamp(360px, 26vw, 520px)",
            animation: "tt-slide-in 0.18s ease",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border bg-card">
            <div className="flex items-center gap-2">
              <span
                className="block w-1.5 h-1.5 rounded-full bg-foreground"
                style={{ animation: "tt-pulse 2.4s ease-in-out infinite" }}
              />
              <Table2 size={13} className="text-muted-foreground" />
              <span className="text-xs font-semibold tracking-widest uppercase text-foreground">Truth Table</span>
            </div>
            <button
              onClick={handleRefresh}
              title="Refresh"
              className="flex items-center justify-center w-7 h-7 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={spinning ? "tt-spinning" : ""} />
            </button>
          </div>

          {/* Body */}
          <div className="tt-scroll overflow-auto" style={{ maxHeight: "min(400px, 52vh)" }}>
            {isEmpty ? (
              <div className="py-9 px-5 flex flex-col items-center gap-1.5 text-muted-foreground">
                <span className="text-2xl opacity-30">⊞</span>
                <span className="text-xs tracking-wide">Add nodes to the canvas</span>
                <span className="text-xs opacity-60">to generate the truth table</span>
              </div>
            ) : (
              <div style={{ minWidth: "max-content" }}>
                <TruthTable key={key} nodes={nodes} edges={edges} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function SimulatorCanvas() {
  const hasMounted = useHasMounted();
  const { settings } = useSettingsStore();
  const { currentFileId, updateFileContent, ready, getCurrentFile } = useFileSystem();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<GateNodeProps>>([]);
  const [edges, setEdges, _onEdgesChange] = useEdgesState<Edge>([]);
  const { onConnectEdge, onNodeClick, onEdgesChangeWithSimulation, onDrop, onDragOver } = useSimulatorLogic(
    setNodes,
    setEdges,
  );

  useEffect(() => {
    if (currentFileId && (nodes.length > 0 || edges.length > 0)) {
      const saveTimeout = setTimeout(() => {
        console.debug("Saving file", currentFileId);
        updateFileContent(currentFileId, { nodes, edges });
      }, 1000);
      return () => clearTimeout(saveTimeout);
    }
  }, [nodes, edges, currentFileId, updateFileContent]);

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
        snapGrid={[20, 20]}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick(node)}
        fitView
      >
        <Panel position="top-left" className="flex flex-col gap-2 p-2">
          <Toolbar />
        </Panel>

        <Panel position="top-right" className="m-3">
          <TruthTablePanel nodes={nodes} edges={edges} />
        </Panel>

        {settings.showMinimap && <MiniMap className="bg-card" />}
        {settings.showGrid && <Background gap={12} size={1} />}
      </ReactFlow>
    </div>
  );
}
