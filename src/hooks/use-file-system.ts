import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { Node, Edge } from "reactflow";
import { GateNodeProps } from "@/lib/types";

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "directory";
  children?: FileNode[];
  isOpen?: boolean;
  data?: {
    nodes: Node<GateNodeProps>[];
    edges: Edge[];
  };
}

interface FileSystemState {
  fileTree: FileNode[];
  currentFileId: string | null;
  ready: boolean;
  createItem: (parentId: string | null, item: FileNode) => void;
  updateFileContent: (
    fileId: string,
    data: { nodes: Node<GateNodeProps>[]; edges: Edge[] },
  ) => void;
  getFileContent: (fileId: string) => FileNode["data"] | undefined;
  switchToFile: (fileId: string) => void;
  getCurrentFile: () => FileNode | undefined;
  updateFileTree: (updater: (tree: FileNode[]) => FileNode[]) => void;
  renameItem: (itemId: string, newName: string) => void;
  moveItem: (itemId: string, newParentId: string | null) => void;
  deleteItem: (itemId: string) => void;
}

const defaultTree: FileNode[] = [
  {
    id: nanoid(),
    name: "My Circuits",
    type: "directory",
    isOpen: true,
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

export const useFileSystem = create<FileSystemState>()(
  persist(
    (set, get) => ({
      fileTree: defaultTree,
      currentFileId: null,
      ready: false,

      createItem: (parentId, item) => {
        const newTree = addItemToTree(get().fileTree, parentId, item);
        set({ fileTree: newTree });
      },

      updateFileContent: (fileId, data) => {
        const updatedTree = updateFileData(get().fileTree, fileId, data);
        set({ fileTree: updatedTree });
      },

      getFileContent: (fileId) => {
        return findFileById(get().fileTree, fileId)?.data;
      },

      switchToFile: (fileId) => {
        set({ currentFileId: fileId });
      },

      getCurrentFile: () => {
        const { fileTree, currentFileId } = get();
        if (!currentFileId) return undefined;
        return findFileById(fileTree, currentFileId);
      },

      updateFileTree: (updater) => {
        set((state) => ({
          fileTree: updater(state.fileTree),
        }));
      },

      renameItem: (itemId, newName) => {
        const updatedTree = renameItemInTree(get().fileTree, itemId, newName);
        set({ fileTree: updatedTree });
      },

      moveItem: (itemId, newParentId) => {
        const { fileTree } = get();
        const itemToMove = findFileById(fileTree, itemId);
        if (!itemToMove) return;

        // Remove item from its current location
        const treeWithoutItem = removeItemFromTree(fileTree, itemId);
        // Add item to new location
        const newTree = addItemToTree(treeWithoutItem, newParentId, itemToMove);
        set({ fileTree: newTree });
      },

      deleteItem: (itemId) => {
        const { fileTree, currentFileId } = get();
        const updatedTree = removeItemFromTree(fileTree, itemId);
        set({ 
          fileTree: updatedTree,
          // If we deleted the current file, clear the current file selection
          currentFileId: currentFileId === itemId ? null : currentFileId 
        });
      },
    }),
    {
      name: "file-system-store", // localStorage key
      partialize: (state) => ({
        fileTree: state.fileTree,
        currentFileId: state.currentFileId,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.ready = true;
        }
      },
    },
  ),
);

// Utility functions (unchanged)
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

function renameItemInTree(tree: FileNode[], itemId: string, newName: string): FileNode[] {
  return tree.map((node) => {
    if (node.id === itemId) {
      return { ...node, name: newName };
    }
    if (node.children) {
      return { ...node, children: renameItemInTree(node.children, itemId, newName) };
    }
    return node;
  });
}

function removeItemFromTree(tree: FileNode[], itemId: string): FileNode[] {
  return tree.filter((node) => {
    if (node.id === itemId) {
      return false;
    }
    if (node.children) {
      node.children = removeItemFromTree(node.children, itemId);
    }
    return true;
  });
}
