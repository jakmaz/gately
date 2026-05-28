import {
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Copy,
  Download,
  Edit,
  File,
  FilePlus,
  Folder,
  FolderOpen,
  FolderPlus,
  MoreVertical,
  Plus,
  Share,
  Trash2,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { type FileNode, useFileSystem } from "../../hooks/use-file-system";
import { Button } from "../ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { InfoDialog } from "./info-dialog";
import { ThemeToggle } from "./theme-toggle";

interface FileExplorerProps {
  isCollapsed: boolean;
}

export function FileExplorer({ isCollapsed }: FileExplorerProps) {
  const { fileTree, createItem, updateFileTree, currentFileId, switchToFile, renameItem, moveItem, deleteItem } =
    useFileSystem();

  const [newItemDialog, setNewItemDialog] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState<"file" | "directory">("file");
  const [targetParentId, setTargetParentId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FileNode | null>(null);

  const toggleDirectory = (id: string) => {
    updateFileTree((tree) => {
      const toggleOpen = (items: FileNode[]): FileNode[] => {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, isOpen: !item.isOpen };
          }
          if (item.children) {
            return { ...item, children: toggleOpen(item.children) };
          }
          return item;
        });
      };
      return toggleOpen(tree);
    });
  };

  const createNewItem = () => {
    if (!newItemName.trim()) {
      toast.error("Please enter a name");
      return;
    }

    const newItem: FileNode = {
      id: Date.now().toString(),
      name: newItemName,
      type: newItemType,
      children: newItemType === "directory" ? [] : undefined,
      isOpen: newItemType === "directory" ? false : undefined,
    };

    createItem(targetParentId, newItem);

    setNewItemDialog(false);
    setNewItemName("");
    setTargetParentId(null);
    toast.success(`${newItemType === "file" ? "File" : "Directory"} created successfully`);
  };

  const handleRename = (item: FileNode) => {
    setEditingItemId(item.id);
    setEditingName(item.name);
  };

  const handleDuplicate = (item: FileNode) => {
    const findParentId = (tree: FileNode[], targetId: string, currentParentId: string | null = null): string | null => {
      for (const node of tree) {
        if (node.id === targetId) return currentParentId;
        if (node.children) {
          const found = findParentId(node.children, targetId, node.id);
          if (found !== null) return found;
        }
      }
      return null;
    };

    const parentId = findParentId(fileTree, item.id);
    const duplicatedItem: FileNode = {
      ...item,
      id: Date.now().toString(),
      name: `${item.name} (Copy)`,
    };
    createItem(parentId, duplicatedItem);
    toast.success(`${item.type === "file" ? "File" : "Directory"} duplicated successfully`);
  };

  const openNewItemDialog = (type: "file" | "directory", parentId: string | null = null) => {
    setNewItemType(type);
    setTargetParentId(parentId);
    setNewItemDialog(true);
  };

  const expandAll = () => {
    updateFileTree((tree) => {
      const expandAllItems = (items: FileNode[]): FileNode[] => {
        return items.map((item) => ({
          ...item,
          isOpen: item.type === "directory" ? true : item.isOpen,
          children: item.children ? expandAllItems(item.children) : undefined,
        }));
      };
      return expandAllItems(tree);
    });
    toast.success("All folders expanded");
  };

  const collapseAll = () => {
    updateFileTree((tree) => {
      const collapseAllItems = (items: FileNode[]): FileNode[] => {
        return items.map((item) => ({
          ...item,
          isOpen: item.type === "directory" ? false : item.isOpen,
          children: item.children ? collapseAllItems(item.children) : undefined,
        }));
      };
      return collapseAllItems(tree);
    });
    toast.success("All folders collapsed");
  };

  const handleExportFile = (item: FileNode) => {
    if (item.type !== "file") return;
    const fileData = item.data;
    if (!fileData) {
      toast.error("File is empty");
      return;
    }
    const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Exported ${item.name}`);
  };

  const saveRename = () => {
    if (!editingItemId || !editingName.trim()) {
      toast.error("Please enter a valid name");
      return;
    }
    renameItem(editingItemId, editingName.trim());
    setEditingItemId(null);
    setEditingName("");
    toast.success("Item renamed successfully");
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: FileNode) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ id: item.id }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string | null) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      if (data.id === targetId) return; // Don't move to self
      moveItem(data.id, targetId);
      toast.success("Item moved successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to move item");
    }
  };

  const handleDelete = (item: FileNode) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    deleteItem(itemToDelete.id);
    setDeleteDialogOpen(false);
    setItemToDelete(null);
    toast.success(`${itemToDelete.type === "file" ? "File" : "Directory"} deleted successfully`);
  };

  const renderFileItem = (item: FileNode, depth = 0) => {
    const isSelected = currentFileId === item.id;
    const isEditing = editingItemId === item.id;

    return (
      <div key={item.id}>
        <ContextMenu>
          <ContextMenuTrigger
            render={
              <div
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors group ${isSelected ? "bg-primary/30" : " hover:bg-primary/10 "}`}
                style={{ paddingLeft: `${8 + depth * 16}px` }}
                onClick={() => {
                  if (item.type === "directory") {
                    toggleDirectory(item.id);
                  } else {
                    switchToFile(item.id);
                  }
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.type === "directory" ? item.id : null)}
              />
            }
          >
            {item.type === "directory" ? (
              <>
                <motion.div animate={{ rotate: item.isOpen ? 90 : 0 }} transition={{ duration: 0.15 }}>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
                <motion.div animate={{ scale: item.isOpen ? 1.1 : 1 }} transition={{ duration: 0.15 }}>
                  {item.isOpen ? <FolderOpen className="h-4 w-4" /> : <Folder className="h-4 w-4" />}
                </motion.div>
              </>
            ) : (
              <>
                <div className="w-4" /> {/* Spacer for alignment */}
                <File className="h-4 w-4" />
              </>
            )}

            {isEditing ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveRename();
                  if (e.key === "Escape") setEditingItemId(null);
                }}
                onClick={(e) => e.stopPropagation()}
                className="h-6 text-sm"
                autoFocus
              />
            ) : (
              <span className="text-sm truncate flex-1">{item.name}</span>
            )}

            <Button
              variant="link"
              size="sm"
              className="h-6 w-6 p-0 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Programmatically trigger context menu on this item
                const trigger = e.currentTarget.closest('[data-slot="context-menu-trigger"]') as HTMLElement;
                if (trigger) {
                  const event = new MouseEvent("contextmenu", {
                    bubbles: true,
                    cancelable: true,
                    clientX: e.clientX,
                    clientY: e.clientY,
                  });
                  trigger.dispatchEvent(event);
                }
              }}
            >
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {item.type === "file" ? (
              <>
                <ContextMenuItem onClick={() => handleRename(item)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleDuplicate(item)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleExportFile(item)}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </ContextMenuItem>
                <ContextMenuItem disabled>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  onClick={() => handleDelete(item)}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </ContextMenuItem>
              </>
            ) : (
              <>
                <ContextMenuItem onClick={() => openNewItemDialog("file", item.id)}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  New File
                </ContextMenuItem>
                <ContextMenuItem onClick={() => openNewItemDialog("directory", item.id)}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => handleRename(item)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleDuplicate(item)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  onClick={() => handleDelete(item)}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </ContextMenuItem>
              </>
            )}
          </ContextMenuContent>
        </ContextMenu>

        {item.type === "directory" && item.isOpen && item.children && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
            {item.children.map((child) => renderFileItem(child, depth + 1))}
          </motion.div>
        )}
      </div>
    );
  };

  // Animate sidebar collapse/expand
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 0 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="border-r bg-card flex flex-col h-full overflow-hidden"
    >
      <div className="p-3 border-b w-64">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Files</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="p-1">
              <Download className="h-4 w-4" />
            </Button>
            <Dialog open={newItemDialog} onOpenChange={setNewItemDialog}>
              <DialogTrigger render={<Button variant="ghost" size="sm" className="p-1" />}>
                <Plus className="h-4 w-4" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Item</DialogTitle>
                  <DialogDescription>Create a new file or directory in your workspace.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant={newItemType === "file" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewItemType("file")}
                    >
                      File
                    </Button>
                    <Button
                      variant={newItemType === "directory" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewItemType("directory")}
                    >
                      Directory
                    </Button>
                  </div>
                  <Input
                    placeholder={`Enter ${newItemType} name`}
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && createNewItem()}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewItemDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createNewItem}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <ContextMenu>
        <ContextMenuTrigger render={<div className="flex-1 overflow-auto p-2 w-64" />}>
          <LayoutGroup>
            <AnimatePresence>
              {fileTree.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderFileItem(item)}
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => openNewItemDialog("file")}>
            <FilePlus className="h-4 w-4 mr-2" />
            New File
          </ContextMenuItem>
          <ContextMenuItem onClick={() => openNewItemDialog("directory")}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={expandAll}>
            <ChevronsDown className="h-4 w-4 mr-2" />
            Expand All
          </ContextMenuItem>
          <ContextMenuItem onClick={collapseAll}>
            <ChevronsUp className="h-4 w-4 mr-2" />
            Collapse All
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="py-2 px-4 mt-auto flex justify-between w-64">
        <ThemeToggle />
        <InfoDialog />
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {itemToDelete?.type === "file" ? "File" : "Directory"}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {itemToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
