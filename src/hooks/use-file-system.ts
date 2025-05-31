import { GateNodeProps } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { Edge, Node } from "reactflow";
import { nanoid } from "nanoid";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "directory";
  children?: FileNode[];
  data?: {
    nodes: Node<GateNodeProps>[];
    edges: Edge[];
  };
}

const defaultTree: FileNode[] = [
  {
    id: nanoid(),
    name: "My Circuits",
    type: "directory",
    children: [
      {
        id: nanoid(),
        name: "Untitled Circuit",
        type: "file",
        data: {
          nodes: [],
          edges: [],
        },
      },
      {
        id: nanoid(),
        name: "Basic Gates",
        type: "file",
        data: {
          nodes: [],
          edges: [],
        },
      },
    ],
  },
];

export function useFileSystem() {
  const [fileTree, setFileTree] = useState<FileNode[]>(defaultTree);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedTree = localStorage.getItem("file-tree");
    const storedFileId = localStorage.getItem("current-file-id");

    if (storedTree) {
      try {
        setFileTree(JSON.parse(storedTree));
      } catch (e) {
        console.error("Failed to parse stored file tree", e);
      }
    }

    if (storedFileId) {
      setCurrentFileId(storedFileId);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("file-tree", JSON.stringify(fileTree));
  }, [fileTree, ready]);

  useEffect(() => {
    if (!ready || !currentFileId) return;
    localStorage.setItem("current-file-id", currentFileId);
  }, [currentFileId, ready]);

  const createItem = (parentId: string | null, item: FileNode) => {
    const newTree = addItemToTree(fileTree, parentId, item);
    setFileTree(newTree);
  };

  const updateFileContent = (
    fileId: string,
    data: { nodes: Node<GateNodeProps>[]; edges: Edge[] },
  ) => {
    const updatedTree = updateFileData(fileTree, fileId, data);
    setFileTree(updatedTree);
  };

  const getFileContent = (fileId: string) => {
    return findFileById(fileTree, fileId)?.data;
  };

  const updateFileTree = (updater: (tree: FileNode[]) => FileNode[]) => {
    setFileTree((prev) => updater(prev));
  };

  const switchToFile = (fileId: string) => {
    setCurrentFileId(fileId);
  };

  const getCurrentFile = useCallback(() => {
    if (!currentFileId) return undefined;
    return findFileById(fileTree, currentFileId);
  }, [fileTree, currentFileId]);

  return {
    fileTree,
    createItem,
    updateFileContent,
    getFileContent,
    updateFileTree,
    currentFileId,
    switchToFile,
    getCurrentFile,
    ready,
  };
}

function addItemToTree(
  tree: FileNode[],
  parentId: string | null,
  newItem: FileNode,
): FileNode[] {
  if (!parentId) return [...tree, newItem];
  return tree.map((node) => {
    if (node.id === parentId && node.type === "directory") {
      return {
        ...node,
        children: [...(node.children || []), newItem],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addItemToTree(node.children, parentId, newItem),
      };
    }
    return node;
  });
}

function updateFileData(
  tree: FileNode[],
  fileId: string,
  data: { nodes: Node<GateNodeProps>[]; edges: Edge[] },
): FileNode[] {
  return tree.map((node) => {
    if (node.id === fileId && node.type === "file") {
      return { ...node, data };
    }
    if (node.children) {
      return { ...node, children: updateFileData(node.children, fileId, data) };
    }
    return node;
  });
}

function findFileById(tree: FileNode[], fileId: string): FileNode | undefined {
  for (const node of tree) {
    if (node.id === fileId) return node;
    if (node.children) {
      const found = findFileById(node.children, fileId);
      if (found) return found;
    }
  }
  return undefined;
}
