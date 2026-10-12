import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { GateNodeProps } from "@gately/core/types";
import type { Node } from "@xyflow/react";
import { getNextTerminalName } from "../src/components/nodes/base/terminal-names";

function node(type: string, label: string): Node<GateNodeProps> {
  return { id: label, type, position: { x: 0, y: 0 }, data: { label, state: false } };
}

describe("terminal names", () => {
  it("numbers toggle and push inputs together and outputs separately", () => {
    const nodes = [node("toggleNode", "I1"), node("pushNode", "I2"), node("outputNode", "Q1")];
    assert.equal(getNextTerminalName("toggleNode", nodes), "I3");
    assert.equal(getNextTerminalName("pushNode", nodes), "I3");
    assert.equal(getNextTerminalName("outputNode", nodes), "Q2");
  });

  it("avoids existing names without changing named or imported nodes", () => {
    const nodes = [node("toggleNode", "Enable"), node("outputNode", " I1 "), node("toggleNode", "I3")];
    const before = structuredClone(nodes);
    assert.equal(getNextTerminalName("pushNode", nodes), "I2");
    assert.deepEqual(nodes, before);
  });

  it("keeps names unique when adding or duplicating a terminal", () => {
    const nodes: Node<GateNodeProps>[] = [];
    for (const type of ["toggleNode", "pushNode", "toggleNode", "outputNode", "outputNode"] as const) {
      nodes.push(node(type, getNextTerminalName(type, nodes)));
    }
    assert.deepEqual(
      nodes.map((node) => node.data.label),
      ["I1", "I2", "I3", "Q1", "Q2"],
    );
  });
});
