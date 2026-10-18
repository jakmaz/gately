import type { GateNodeProps } from "@gately/core/types";
import type { Edge, Node } from "@xyflow/react";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const MAX_ITEM_NAME_LENGTH = 100;

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
  createItem: (parentId: string | null, item: FileNode) => string | null;
  updateFileContent: (fileId: string, data: { nodes: Node<GateNodeProps>[]; edges: Edge[] }) => void;
  getFileContent: (fileId: string) => FileNode["data"] | undefined;
  switchToFile: (fileId: string) => void;
  getCurrentFile: () => FileNode | undefined;
  updateFileTree: (updater: (tree: FileNode[]) => FileNode[]) => void;
  renameItem: (itemId: string, newName: string) => string | null;
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
        const { fileTree } = get();
        const error = validateItemName(fileTree, parentId, item.name);
        if (error) return error;
        const newTree = addItemToTree(fileTree, parentId, {
          ...item,
          name: item.name.trim(),
          ...(item.type === "file" && !item.data ? { data: { nodes: [], edges: [] } } : {}),
        });
        set({ fileTree: newTree });
        return null;
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
        const { fileTree } = get();
        if (!findFileById(fileTree, itemId)) return "This item no longer exists.";
        const error = validateItemName(fileTree, findParentId(fileTree, itemId), newName, itemId);
        if (error) return error;
        const updatedTree = renameItemInTree(fileTree, itemId, newName.trim());
        set({ fileTree: updatedTree });
        return null;
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
          currentFileId: currentFileId && findFileById(updatedTree, currentFileId) ? currentFileId : null,
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

          // Auto-select first file if none selected
          if (!state.currentFileId) {
            const firstFile = findFirstFile(state.fileTree);
            if (firstFile) {
              state.currentFileId = firstFile.id;
            }
          }
        }
      },
    },
  ),
);

export function findParentId(tree: FileNode[], itemId: string, parentId: string | null = null): string | null {
  for (const item of tree) {
    if (item.id === itemId) return parentId;
    if (item.children) {
      const found = findParentId(item.children, itemId, item.id);
      if (found !== null) return found;
    }
  }
  return null;
}

function validateItemName(tree: FileNode[], parentId: string | null, name: string, itemId?: string): string | null {
  const trimmedName = name.trim();
  if (!trimmedName) return "Enter a name.";
  if (trimmedName.length > MAX_ITEM_NAME_LENGTH) return `Use ${MAX_ITEM_NAME_LENGTH} characters or fewer.`;
  if (trimmedName === "." || trimmedName === ".." || /[/\\]/.test(trimmedName)) {
    return "Names cannot be . or .. or contain / or \\.";
  }

  const parent = parentId === null ? null : findFileById(tree, parentId);
  if (parentId !== null && parent?.type !== "directory") return "This folder no longer exists.";
  const siblings = parent ? (parent.children ?? []) : tree;
  if (siblings.some((item) => item.id !== itemId && item.name.toLowerCase() === trimmedName.toLowerCase())) {
    return "An item with this name already exists.";
  }
  return null;
}

function addItemToTree(tree: FileNode[], parentId: string | null, newItem: FileNode): FileNode[] {
  if (parentId === null) return [...tree, newItem];
  let added = false;
  const updatedTree = tree.map((node) => {
    if (node.id === parentId && node.type === "directory") {
      added = true;
      return {
        ...node,
        isOpen: true,
        children: [...(node.children || []), newItem],
      };
    }
    if (node.children) {
      const children = addItemToTree(node.children, parentId, newItem);
      if (children !== node.children) {
        added = true;
        return { ...node, isOpen: true, children };
      }
    }
    return node;
  });
  return added ? updatedTree : tree;
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

export function findFileById(tree: FileNode[], fileId: string): FileNode | undefined {
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
      return {
        ...node,
        children: renameItemInTree(node.children, itemId, newName),
      };
    }
    return node;
  });
}

function removeItemFromTree(tree: FileNode[], itemId: string): FileNode[] {
  return tree
    .filter((node) => node.id !== itemId)
    .map((node) => (node.children ? { ...node, children: removeItemFromTree(node.children, itemId) } : node));
}

function findFirstFile(tree: FileNode[]): FileNode | undefined {
  for (const node of tree) {
    if (node.type === "file") return node;
    if (node.children) {
      const found = findFirstFile(node.children);
      if (found) return found;
    }
  }
  return undefined;
}
