import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { GRID_SIZE, H, W } from "../src/components/nodes/base/constants";
import { GateSymbol, getPortState } from "../src/components/nodes/base/gate-symbol";
import { gateCatalog } from "../src/node-types";

describe("gate layout contract", () => {
  it("places every port on the shared grid and its declared frame edge", () => {
    for (const gate of Object.values(gateCatalog)) {
      const ids = new Set<string>();
      for (const port of gate.geometry.ports) {
        assert.equal(port.x % GRID_SIZE, 0, gate.label);
        assert.equal(port.y % GRID_SIZE, 0, gate.label);
        assert.ok(port.x >= 0 && port.x <= W && port.y >= 0 && port.y <= H, gate.label);
        assert.equal(
          port.side === "bottom" ? port.y : port.x,
          port.side === "left" ? 0 : port.side === "right" ? W : H,
        );
        assert.ok(!ids.has(port.id), gate.label);
        ids.add(port.id);
      }
    }
  });

  it("preserves the handle IDs referenced by saved circuits", () => {
    assert.deepEqual(
      gateCatalog.toggleNode.geometry.ports.map((port) => port.id),
      ["output"],
    );
    assert.deepEqual(
      gateCatalog.pushNode.geometry.ports.map((port) => port.id),
      ["output"],
    );
    assert.deepEqual(
      gateCatalog.outputNode.geometry.ports.map((port) => port.id),
      ["input"],
    );
    for (const type of ["andGate", "orGate", "nandGate", "norGate", "xorGate", "xnorGate"] as const) {
      assert.deepEqual(
        gateCatalog[type].geometry.ports.map((port) => port.id),
        ["input-0", "input-1", "output-0"],
      );
    }
    for (const type of ["buffGate", "notGate"] as const) {
      assert.deepEqual(
        gateCatalog[type].geometry.ports.map((port) => port.id),
        ["input-0", "output-0"],
      );
    }
    assert.deepEqual(
      gateCatalog.muxGate.geometry.ports.map((port) => port.id),
      ["input-0", "input-1", "input-2", "output-0"],
    );
    assert.deepEqual(
      gateCatalog.dmuxGate.geometry.ports.map((port) => port.id),
      ["input-0", "input-1", "output-0", "output-1"],
    );
    assert.deepEqual(
      gateCatalog.xnor3Gate.geometry.ports.map((port) => port.id),
      ["input-0", "input-1", "input-2", "output-0"],
    );
  });

  it("aligns the toggle, buffer, and output on the same row", () => {
    for (const type of ["toggleNode", "buffGate", "outputNode"] as const) {
      assert.ok(gateCatalog[type].geometry.ports.every((port) => port.y === H / 2));
    }
  });

  it("renders previews without a React Flow provider", () => {
    for (const gate of Object.values(gateCatalog)) {
      const markup = renderToStaticMarkup(<GateSymbol geometry={gate.geometry} size={56} />);
      assert.ok(markup.includes('viewBox="0 0 80 80"'));
      assert.ok(markup.includes(gate.geometry.bodyPath));
    }
  });

  it("keeps a terminal's name visible when its state changes", () => {
    for (const type of ["toggleNode", "pushNode", "outputNode"] as const) {
      for (const state of [false, true]) {
        const markup = renderToStaticMarkup(
          <GateSymbol geometry={gateCatalog[type].geometry} data={{ label: "Enable", state }} />,
        );
        assert.ok(markup.includes(">Enable</text>"));
        assert.ok(!markup.includes(`>${Number(state)}</text>`));
      }
    }
  });

  it("preserves full terminal names", () => {
    for (const label of ["Input A", "Input B", "Carry Out", "Clock enable"]) {
      const markup = renderToStaticMarkup(
        <GateSymbol geometry={gateCatalog.toggleNode.geometry} data={{ label, state: false }} />,
      );
      const renderedName = [...markup.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((match) => match[1]).join(" ");
      assert.equal(renderedName, label);
    }
  });

  it("uses each demultiplexer output's signal for its lead", () => {
    const ports = gateCatalog.dmuxGate.geometry.ports.filter((port) => port.kind === "output");
    const data = { label: "DMUX", state: true, outputs: [false, true] };
    assert.deepEqual(
      ports.map((port) => getPortState(port, data)),
      [false, true],
    );
    assert.deepEqual(
      ports.map((port) => getPortState(port, { ...data, preview: true })),
      [false, false],
    );
  });
});
