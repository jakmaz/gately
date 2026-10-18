import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { type FileNode, MAX_ITEM_NAME_LENGTH, useFileSystem } from "../src/hooks/use-file-system";

beforeEach(() => {
  useFileSystem.setState({ fileTree: [], currentFileId: null, ready: true });
});

describe("file creation", () => {
  it("trims names and initializes an empty circuit", () => {
    const error = useFileSystem.getState().createItem(null, { id: "file", name: "  Adder  ", type: "file" });
    assert.equal(error, null);
    assert.deepEqual(useFileSystem.getState().fileTree, [
      { id: "file", name: "Adder", type: "file", data: { nodes: [], edges: [] } },
    ]);
  });

  it("reveals a new item through every ancestor without changing the previous tree", () => {
    const fileTree: FileNode[] = [
      {
        id: "root",
        name: "Circuits",
        type: "directory",
        isOpen: false,
        children: [{ id: "nested", name: "Arithmetic", type: "directory", isOpen: false, children: [] }],
      },
    ];
    useFileSystem.setState({ fileTree });
    assert.equal(useFileSystem.getState().createItem("nested", { id: "file", name: "Adder", type: "file" }), null);
    const [root] = useFileSystem.getState().fileTree;
    assert.equal(root.isOpen, true);
    assert.equal(root.children?.[0].isOpen, true);
    assert.equal(root.children?.[0].children?.[0].id, "file");
    assert.equal(fileTree[0].isOpen, false);
    assert.equal(fileTree[0].children?.[0].children?.length, 0);
  });

  it("rejects empty names, paths, duplicate siblings, and missing parents without changing the tree", () => {
    const fileTree: FileNode[] = [{ id: "existing", name: "Adder", type: "file" }];
    useFileSystem.setState({ fileTree });
    for (const name of ["", "   ", ".", "..", "a/b", "a\\b", " adder "]) {
      assert.equal(typeof useFileSystem.getState().createItem(null, { id: "new", name, type: "file" }), "string");
      assert.equal(useFileSystem.getState().fileTree, fileTree);
    }
    for (const parentId of ["missing", "existing"]) {
      assert.equal(
        typeof useFileSystem.getState().createItem(parentId, { id: "new", name: "Circuit", type: "file" }),
        "string",
      );
      assert.equal(useFileSystem.getState().fileTree, fileTree);
    }
  });

  it("allows matching names in different folders and preserves supplied circuit data", () => {
    useFileSystem.setState({
      fileTree: [
        { id: "existing", name: "Adder", type: "file" },
        { id: "folder", name: "Examples", type: "directory", children: [] },
      ],
    });
    const data: NonNullable<FileNode["data"]> = {
      nodes: [{ id: "gate", position: { x: 0, y: 0 }, data: { state: false } }],
      edges: [],
    };
    assert.equal(useFileSystem.getState().createItem("folder", { id: "new", name: "Adder", type: "file", data }), null);
    assert.deepEqual(useFileSystem.getState().getFileContent("new"), data);
  });

  it("accepts the name-length boundary and rejects longer file and folder names", () => {
    for (const type of ["file", "directory"] as const) {
      const name = (type === "file" ? "F" : "D").repeat(MAX_ITEM_NAME_LENGTH);
      assert.equal(useFileSystem.getState().createItem(null, { id: type, name, type }), null);
      const before = useFileSystem.getState().fileTree;
      assert.equal(
        useFileSystem.getState().createItem(null, { id: `${type}-long`, name: `${name}x`, type }),
        `Use ${MAX_ITEM_NAME_LENGTH} characters or fewer.`,
      );
      assert.equal(useFileSystem.getState().fileTree, before);
    }
  });
});

describe("renaming", () => {
  it("keeps the item identity, trims names, and rejects sibling conflicts", () => {
    useFileSystem.setState({
      fileTree: [
        { id: "first", name: "Adder", type: "file" },
        { id: "second", name: "Decoder", type: "file" },
      ],
      currentFileId: "first",
    });
    assert.equal(useFileSystem.getState().renameItem("first", " Adder "), null);
    assert.equal(typeof useFileSystem.getState().renameItem("first", "decoder"), "string");
    assert.equal(useFileSystem.getState().renameItem("first", " Half Adder "), null);
    assert.equal(useFileSystem.getState().getCurrentFile()?.name, "Half Adder");
    assert.equal(useFileSystem.getState().currentFileId, "first");
    assert.equal(typeof useFileSystem.getState().renameItem("missing", "Circuit"), "string");
  });

  it("rejects an oversized rename without changing the existing item", () => {
    useFileSystem.setState({ fileTree: [{ id: "file", name: "Adder", type: "file" }] });
    const before = useFileSystem.getState().fileTree;
    assert.equal(
      useFileSystem.getState().renameItem("file", "x".repeat(MAX_ITEM_NAME_LENGTH + 1)),
      `Use ${MAX_ITEM_NAME_LENGTH} characters or fewer.`,
    );
    assert.equal(useFileSystem.getState().fileTree, before);
    assert.equal(useFileSystem.getState().fileTree[0].name, "Adder");
  });
});
