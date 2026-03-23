"use client";

import {
    addEdge,
    Background,
    type Connection,
    type Edge,
    MarkerType,
    type Node,
    type NodeTypes,
    ReactFlow,
    type ReactFlowInstance,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from "@xyflow/react";
import { useCallback, useRef, useState, useEffect } from "react";
import "@xyflow/react/dist/style.css";

import { calculateNodeStates } from "@gately/core/simulator";
import type { GateNodeProps } from "@gately/core/types";
import { ANDGateNode } from "@gately/ui/components/nodes/and";
import { NOTGateNode } from "@gately/ui/components/nodes/not";
import { ORGateNode } from "@gately/ui/components/nodes/or";
import { XORGateNode } from "@gately/ui/components/nodes/xor";
import { NANDGateNode } from "@gately/ui/components/nodes/nand";
import { NORGateNode } from "@gately/ui/components/nodes/nor";
import { OutputNode } from "@gately/ui/components/nodes/output";
import { ToggleNode } from "@gately/ui/components/nodes/toggle";

const nodeTypes: NodeTypes = {
    toggleNode: ToggleNode,
    outputNode: OutputNode,
    andGate: ANDGateNode,
    orGate: ORGateNode,
    notGate: NOTGateNode,
    xorGate: XORGateNode,
    nandGate: NANDGateNode,
    norGate: NORGateNode,
};

interface DocsSimulatorProps {
    initialNodes: any[];
    initialEdges: any[];
    height?: string;
}

export function DocsSimulator({ initialNodes, initialEdges, height = "h-[400px]" }: DocsSimulatorProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<GateNodeProps>>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<Node<GateNodeProps>, Edge> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const updateEdgeStyles = useCallback((currentNodes: Node<GateNodeProps>[], currentEdges: Edge[]) => {
        const nodeStates = new Map<string, boolean>();
        currentNodes.forEach((node) => nodeStates.set(node.id, node.data.state as boolean));

        const updatedEdges = currentEdges.map((edge) => {
            const sourceState = nodeStates.get(edge.source) || false;
            return {
                ...edge,
                animated: sourceState,
                style: { stroke: sourceState ? "#10b981" : "#3b82f6", strokeWidth: 2 },
                markerEnd: { type: MarkerType.ArrowClosed, color: sourceState ? "#10b981" : "#3b82f6" },
            };
        });
        setEdges(updatedEdges);
    }, [setEdges]);

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/@xyflow/react");
        if (!type || !reactFlowInstance) return;
        const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY });

        const newNode = {
            id: `${type}-${nodes.length + 1}`,
            type,
            position,
            data: { label: type.replace('Gate', '').toUpperCase(), state: false },
        };
        setNodes((nds) => nds.concat(newNode as any));
    }, [reactFlowInstance, nodes, setNodes]);

    const onConnect = useCallback((params: Connection | Edge) => {
        const edge = {
            ...params,
            animated: false,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#3b82f6" },
        };
        setEdges((eds) => addEdge(edge, eds));

        setTimeout(() => {
            const updatedNodes = calculateNodeStates(nodes, [...edges, edge as Edge]);
            setNodes(updatedNodes);
            updateEdgeStyles(updatedNodes, [...edges, edge as Edge]);
        }, 100);
    }, [setEdges, nodes, edges, setNodes, updateEdgeStyles]);

    const handleNodeClick = (node: Node<GateNodeProps>) => {
        if (node.type === "toggleNode") {
            const updatedNodes = nodes.map((n) => {
                if (n.id === node.id) return { ...n, data: { ...n.data, state: !n.data.state } };
                return n;
            });
            setNodes(updatedNodes);

            setTimeout(() => {
                const calculatedNodes = calculateNodeStates(updatedNodes, edges);
                setNodes(calculatedNodes);
                updateEdgeStyles(calculatedNodes, edges);
            }, 100);
        }
    };

    if (!isMounted) return <div className={`${height} w-full bg-muted/10 animate-pulse rounded-xl`} />;

    return (
        <div ref={containerRef} className={`${height} w-full`}>
            <ReactFlowProvider>
                <ReactFlow<Node<GateNodeProps>, Edge>
                    className="bg-b"
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    onNodeClick={(_, node) => handleNodeClick(node as Node<GateNodeProps>)}
                    fitView
                    attributionPosition="bottom-right"
                    panOnDrag={false}
                    panOnScroll={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    nodesDraggable={false}
                    preventScrolling={false}
                >
                    <Background gap={12} size={1} />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}
