import type { GateNodeProps } from "@gately/core/types";
import {
  addEdge,
  applyEdgeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  useReactFlow,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { type Dispatch, type SetStateAction, useCallback, useEffect } from "react";
import { H, W } from "../components/nodes/base/constants";
import { getNextTerminalName, isTerminalType } from "../components/nodes/base/terminal-names";
import { type GateType, gateCatalog, isGateType } from "../node-types";
import { simulateCircuit, styleSimulationEdges } from "./simulator-utils";
import { useSettingsStore } from "./use-settings-store";

export function useSimulatorLogic(
  setNodes: Dispatch<SetStateAction<Node<GateNodeProps>[]>>,
  setEdges: Dispatch<SetStateAction<Edge[]>>,
) {
  const { getNodes, getEdges, screenToFlowPosition } = useReactFlow<Node<GateNodeProps>, Edge>();

  const { settings } = useSettingsStore();

  const applySimulation = useCallback(
    (nextNodes: Node<GateNodeProps>[], nextEdges: Edge[]) => {
      const simulated = simulateCircuit(nextNodes, nextEdges, settings);
      setNodes(simulated.nodes);
      setEdges(simulated.edges);
    },
    [setEdges, setNodes, settings],
  );

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();
    const styledEdges = styleSimulationEdges(nodes, edges, settings);
    setEdges(styledEdges);
  }, [getNodes, getEdges, settings, setEdges]);

  const onConnectEdge = useCallback(
    (params: Connection | Edge) => {
      const nodes = getNodes();
      const edges = getEdges();

      const edge: Edge = {
        id: nanoid(),
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        animated: false,
        type: settings.connectionType,
        style: { stroke: "var(--signal-low)", strokeWidth: 2 },
      };

      applySimulation(nodes, addEdge(edge, edges));
    },
    [applySimulation, getNodes, getEdges, settings.connectionType],
  );

  const onEdgesChangeWithSimulation = useCallback(
    (changes: EdgeChange[]) => {
      const currentEdges = getEdges();
      const currentNodes = getNodes();

      // Apply the edge changes first (add, remove, etc.)
      const updatedEdges = applyEdgeChanges(changes, currentEdges);

      // Check if any edges were removed
      const hasRemoval = changes.some((change) => change.type === "remove");

      if (hasRemoval) {
        // When edges are removed, recalculate all node states
        // Disconnected nodes should become false (no power = false)
        applySimulation(currentNodes, updatedEdges);
      } else {
        // For other changes (select, etc.), just update edges without restyling
        setEdges(updatedEdges);
      }
    },
    [applySimulation, getEdges, getNodes, setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const addGate = useCallback(
    (type: GateType, clientPosition: { x: number; y: number }) => {
      const position = screenToFlowPosition(clientPosition);
      const nodes = getNodes();
      const newNode: Node<GateNodeProps> = {
        id: nanoid(),
        type,
        position,
        data: {
          label: isTerminalType(type) ? getNextTerminalName(type, nodes) : gateCatalog[type].label,
          state: false,
        },
      };
      applySimulation([...nodes, newNode], getEdges());
    },
    [screenToFlowPosition, applySimulation, getNodes, getEdges],
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/@xyflow/react");
      if (isGateType(type)) addGate(type, { x: event.clientX, y: event.clientY });
    },
    [addGate],
  );

  const onAddGate = (type: GateType) =>
    addGate(type, { x: window.innerWidth / 2 - W / 2, y: window.innerHeight / 2 - H / 2 });

  return {
    onConnectEdge,
    onAddGate,
    onEdgesChangeWithSimulation,
    onDragOver,
    onDrop,
  };
}
