import type { Edge, Node } from "@xyflow/react";
import { describe, expect, it } from "vitest";
import { calculateNodeStates } from "./simulator";
import type { GateNodeProps } from "./types";

const createToggleNode = (id: string, state: boolean): Node<GateNodeProps> => ({
  id,
  type: "toggleNode",
  position: { x: 0, y: 0 },
  data: { label: "Input", state },
});

const createGateNode = (id: string, type: string): Node<GateNodeProps> => ({
  id,
  type,
  position: { x: 0, y: 0 },
  data: { label: "Gate", state: false, inputs: [], outputs: [] },
});

const createOutputNode = (id: string): Node<GateNodeProps> => ({
  id,
  type: "outputNode",
  position: { x: 0, y: 0 },
  data: { label: "Output", state: false },
});

const createEdge = (source: string, target: string, sourceHandle?: string, targetHandle?: string): Edge => ({
  id: `${source}-${target}`,
  source,
  target,
  sourceHandle: sourceHandle ?? null,
  targetHandle: targetHandle ?? null,
});

describe("calculateNodeStates", () => {
  describe("AND gate", () => {
    it("returns false when any input is false", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", false),
        createGateNode("and", "andGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "and", undefined, "input-0"),
        createEdge("in2", "and", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const andNode = result.find((n) => n.id === "and");
      expect(andNode?.data.state).toBe(false);
    });

    it("returns true when all inputs are true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", true),
        createGateNode("and", "andGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "and", undefined, "input-0"),
        createEdge("in2", "and", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const andNode = result.find((n) => n.id === "and");
      expect(andNode?.data.state).toBe(true);
    });
  });

  describe("OR gate", () => {
    it("returns false when all inputs are false", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", false),
        createToggleNode("in2", false),
        createGateNode("or", "orGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "or", undefined, "input-0"),
        createEdge("in2", "or", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const orNode = result.find((n) => n.id === "or");
      expect(orNode?.data.state).toBe(false);
    });

    it("returns true when any input is true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", false),
        createToggleNode("in2", true),
        createGateNode("or", "orGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "or", undefined, "input-0"),
        createEdge("in2", "or", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const orNode = result.find((n) => n.id === "or");
      expect(orNode?.data.state).toBe(true);
    });
  });

  describe("NOT gate", () => {
    it("returns true when input is false", () => {
      const nodes: Node<GateNodeProps>[] = [createToggleNode("in1", false), createGateNode("not", "notGate")];
      const edges: Edge[] = [createEdge("in1", "not", undefined, "input-0")];

      const result = calculateNodeStates(nodes, edges);
      const notNode = result.find((n) => n.id === "not");
      expect(notNode?.data.state).toBe(true);
    });

    it("returns false when input is true", () => {
      const nodes: Node<GateNodeProps>[] = [createToggleNode("in1", true), createGateNode("not", "notGate")];
      const edges: Edge[] = [createEdge("in1", "not", undefined, "input-0")];

      const result = calculateNodeStates(nodes, edges);
      const notNode = result.find((n) => n.id === "not");
      expect(notNode?.data.state).toBe(false);
    });
  });

  describe("NAND gate", () => {
    it("returns true when any input is false", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", false),
        createGateNode("nand", "nandGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "nand", undefined, "input-0"),
        createEdge("in2", "nand", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const nandNode = result.find((n) => n.id === "nand");
      expect(nandNode?.data.state).toBe(true);
    });

    it("returns false when all inputs are true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", true),
        createGateNode("nand", "nandGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "nand", undefined, "input-0"),
        createEdge("in2", "nand", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const nandNode = result.find((n) => n.id === "nand");
      expect(nandNode?.data.state).toBe(false);
    });
  });

  describe("NOR gate", () => {
    it("returns true when all inputs are false", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", false),
        createToggleNode("in2", false),
        createGateNode("nor", "norGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "nor", undefined, "input-0"),
        createEdge("in2", "nor", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const norNode = result.find((n) => n.id === "nor");
      expect(norNode?.data.state).toBe(true);
    });

    it("returns false when any input is true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", false),
        createGateNode("nor", "norGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "nor", undefined, "input-0"),
        createEdge("in2", "nor", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const norNode = result.find((n) => n.id === "nor");
      expect(norNode?.data.state).toBe(false);
    });
  });

  describe("XOR gate", () => {
    it("returns false when all inputs are false", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", false),
        createToggleNode("in2", false),
        createGateNode("xor", "xorGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "xor", undefined, "input-0"),
        createEdge("in2", "xor", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const xorNode = result.find((n) => n.id === "xor");
      expect(xorNode?.data.state).toBe(false);
    });

    it("returns true when exactly one input is true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", false),
        createGateNode("xor", "xorGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "xor", undefined, "input-0"),
        createEdge("in2", "xor", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const xorNode = result.find((n) => n.id === "xor");
      expect(xorNode?.data.state).toBe(true);
    });

    it("returns false when both inputs are true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", true),
        createGateNode("xor", "xorGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "xor", undefined, "input-0"),
        createEdge("in2", "xor", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const xorNode = result.find((n) => n.id === "xor");
      expect(xorNode?.data.state).toBe(false);
    });
  });

  describe("XNOR gate", () => {
    it("returns true when all inputs have same parity", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", true),
        createGateNode("xnor", "xnorGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "xnor", undefined, "input-0"),
        createEdge("in2", "xnor", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const xnorNode = result.find((n) => n.id === "xnor");
      expect(xnorNode?.data.state).toBe(true);
    });

    it("returns false when inputs have different parity", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", false),
        createGateNode("xnor", "xnorGate"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "xnor", undefined, "input-0"),
        createEdge("in2", "xnor", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const xnorNode = result.find((n) => n.id === "xnor");
      expect(xnorNode?.data.state).toBe(false);
    });
  });

  describe("MUX gate", () => {
    it("returns A when selector is false", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("inA", true),
        createToggleNode("inB", false),
        createToggleNode("sel", false),
        createGateNode("mux", "muxGate"),
      ];
      const edges: Edge[] = [
        createEdge("inA", "mux", undefined, "input-0"),
        createEdge("inB", "mux", undefined, "input-1"),
        createEdge("sel", "mux", undefined, "input-2"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const muxNode = result.find((n) => n.id === "mux");
      expect(muxNode?.data.state).toBe(true);
    });

    it("returns B when selector is true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("inA", true),
        createToggleNode("inB", false),
        createToggleNode("sel", true),
        createGateNode("mux", "muxGate"),
      ];
      const edges: Edge[] = [
        createEdge("inA", "mux", undefined, "input-0"),
        createEdge("inB", "mux", undefined, "input-1"),
        createEdge("sel", "mux", undefined, "input-2"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const muxNode = result.find((n) => n.id === "mux");
      expect(muxNode?.data.state).toBe(false);
    });
  });

  describe("DMUX gate", () => {
    it("outputs to Y0 when selector is false", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("data", true),
        createToggleNode("sel", false),
        createGateNode("dmux", "dmuxGate"),
      ];
      const edges: Edge[] = [
        createEdge("data", "dmux", undefined, "input-0"),
        createEdge("sel", "dmux", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const dmuxNode = result.find((n) => n.id === "dmux");
      expect(dmuxNode?.data.outputs).toEqual([true, false]);
      expect(dmuxNode?.data.state).toBe(true);
    });

    it("outputs to Y1 when selector is true", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("data", true),
        createToggleNode("sel", true),
        createGateNode("dmux", "dmuxGate"),
      ];
      const edges: Edge[] = [
        createEdge("data", "dmux", undefined, "input-0"),
        createEdge("sel", "dmux", undefined, "input-1"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const dmuxNode = result.find((n) => n.id === "dmux");
      expect(dmuxNode?.data.outputs).toEqual([false, true]);
      expect(dmuxNode?.data.state).toBe(true);
    });
  });

  describe("Buffer gate", () => {
    it("returns input value unchanged", () => {
      const nodes: Node<GateNodeProps>[] = [createToggleNode("in1", true), createGateNode("buff", "buffGate")];
      const edges: Edge[] = [createEdge("in1", "buff", undefined, "input-0")];

      const result = calculateNodeStates(nodes, edges);
      const buffNode = result.find((n) => n.id === "buff");
      expect(buffNode?.data.state).toBe(true);
    });
  });

  describe("Output node", () => {
    it("propagates input value to output", () => {
      const nodes: Node<GateNodeProps>[] = [createToggleNode("in1", true), createOutputNode("out")];
      const edges: Edge[] = [createEdge("in1", "out", undefined, "input-0")];

      const result = calculateNodeStates(nodes, edges);
      const outNode = result.find((n) => n.id === "out");
      expect(outNode?.data.state).toBe(true);
    });
  });

  describe("chained gates", () => {
    it("propagates signal through multiple gates", () => {
      const nodes: Node<GateNodeProps>[] = [
        createToggleNode("in1", true),
        createToggleNode("in2", true),
        createGateNode("and", "andGate"),
        createOutputNode("out"),
      ];
      const edges: Edge[] = [
        createEdge("in1", "and", undefined, "input-0"),
        createEdge("in2", "and", undefined, "input-1"),
        createEdge("and", "out", undefined, "input-0"),
      ];

      const result = calculateNodeStates(nodes, edges);
      const outNode = result.find((n) => n.id === "out");
      expect(outNode?.data.state).toBe(true);
    });
  });

  describe("unconnected inputs", () => {
    it("uses only connected inputs (other indices are undefined and treated as false by every())", () => {
      const nodes: Node<GateNodeProps>[] = [createToggleNode("in1", true), createGateNode("and", "andGate")];
      const edges: Edge[] = [createEdge("in1", "and", undefined, "input-0")];

      const result = calculateNodeStates(nodes, edges);
      const andNode = result.find((n) => n.id === "and");
      expect(andNode?.data.state).toBe(true);
    });
  });
});
