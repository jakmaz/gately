import { GateNodeProps } from "@/lib/types";
import { useEffect, useState } from "react";
import { Edge, Node } from "reactflow";

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
    id: "1",
    name: "My Circuits",
    type: "directory",
    children: [
      { id: "2", name: "Basic Gates", type: "file" },
      { id: "3", name: "Adder Circuit", type: "file" },
    ],
  },
];

export function useFileSystem() {
  const [fileTree, setFileTree] = useState<FileNode[]>(() => {
    const stored = localStorage.getItem("file-tree");
    return stored ? JSON.parse(stored) : defaultTree;
  });

  useEffect(() => {
    localStorage.setItem("file-tree", JSON.stringify(fileTree));
  }, [fileTree]);

  const createItem = (parentId: string | null, item: FileNode) => {
    const newTree = addItemToTree(fileTree, parentId, item);
    setFileTree(newTree);
  };

  const updateFileContent = (fileId: string, data: { nodes: Node<GateNodeProps>[]; edges: Edge[] }) => {
    const updatedTree = updateFileData(fileTree, fileId, data);
    setFileTree(updatedTree);
  };

  const getFileContent = (fileId: string) => {
    return findFileById(fileTree, fileId)?.data;
  };

  const updateFileTree = (updater: (tree: FileNode[]) => FileNode[]) => {
    setFileTree((prev) => updater(prev));
  };

  return { fileTree, createItem, updateFileContent, getFileContent, updateFileTree };
}

function addItemToTree(tree: FileNode[], parentId: string | null, newItem: FileNode): FileNode[] {
  if (!parentId) return [...tree, newItem];
  return tree.map((node) => {
    if (node.id === parentId && node.type === "directory") {
      return {
        ...node,
        children: [...(node.children || []), newItem],
      };
    }
    if (node.children) {
      return { ...node, children: addItemToTree(node.children, parentId, newItem) };
    }
    return node;
  });
}

function updateFileData(tree: FileNode[], fileId: string, data: { nodes: Node<GateNodeProps>[]; edges: Edge[] }): FileNode[] {
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
