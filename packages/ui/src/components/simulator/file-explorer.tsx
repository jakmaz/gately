import type { GateNodeProps } from "@gately/core/types";
import { type Edge, type Node, useReactFlow } from "@xyflow/react";
import {
  Check,
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
  Share,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nanoid } from "nanoid";
import { useEffect, useId, useRef, useState } from "react";
import {
  type FileNode,
  findFileById,
  findParentId,
  MAX_ITEM_NAME_LENGTH,
  useFileSystem,
} from "../../hooks/use-file-system";
import { Button } from "../ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";
import { DeleteItemConfirmation } from "./delete-item-confirmation";
import { InfoDialog } from "./info-dialog";

interface FileExplorerProps {
  isCollapsed: boolean;
}

interface NewItem {
  id: string;
  type: FileNode["type"];
  parentId: string | null;
}

function NameEditor({
  label,
  value,
  error,
  onChange,
  onSave,
  onCancel,
}: {
  label: string;
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onSave: () => boolean;
  onCancel: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const finished = useRef(false);
  const errorId = useId();
  const validationError =
    error ?? (value.trim().length > MAX_ITEM_NAME_LENGTH ? `Use ${MAX_ITEM_NAME_LENGTH} characters or fewer.` : null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
      inputRef.current?.scrollIntoView({ block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const save = () => {
    if (!finished.current) finished.current = onSave();
  };

  const cancel = () => {
    finished.current = true;
    onCancel();
  };

  return (
    <form
      className="min-w-0 flex-1"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        save();
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        if (value.trim()) save();
        else cancel();
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.nativeEvent.isComposing) {
          if (event.key === "Enter") event.preventDefault();
          return;
        }
        if (event.key === "Escape") {
          event.preventDefault();
          cancel();
        }
      }}
    >
      <div className="flex items-center gap-1">
        <Input
          ref={inputRef}
          aria-label={label}
          placeholder={label}
          aria-invalid={Boolean(validationError)}
          aria-describedby={validationError ? errorId : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-6 rounded-sm px-1 text-sm"
          enterKeyHint="done"
        />
        <Button type="submit" variant="ghost" size="icon-xs" aria-label="Save name">
          <Check />
        </Button>
        <Button type="button" variant="ghost" size="icon-xs" aria-label="Cancel naming" onClick={cancel}>
          <X />
        </Button>
      </div>
      {validationError && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-destructive">
          {validationError}
        </p>
      )}
    </form>
  );
}

export function FileExplorer({ isCollapsed }: FileExplorerProps) {
  const reactFlow = useReactFlow<Node<GateNodeProps>, Edge>();
  const reduceMotion = useReducedMotion();
  const treeTransition = { duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] as const };
  const {
    fileTree,
    createItem,
    updateFileTree,
    updateFileContent,
    currentFileId,
    switchToFile,
    renameItem,
    moveItem,
    deleteItem,
  } = useFileSystem();

  const [newItem, setNewItem] = useState<NewItem | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FileNode | null>(null);
  const itemRows = useRef(new Map<string, HTMLElement>());
  const deleteAnchorRef = useRef<HTMLElement | null>(null);
  const newFileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isCollapsed) setDeleteDialogOpen(false);
  }, [isCollapsed]);

  useEffect(() => {
    setSelectedItemId(currentFileId);
  }, [currentFileId]);

  const openFile = (fileId: string) => {
    if (currentFileId && currentFileId !== fileId) {
      updateFileContent(currentFileId, { nodes: reactFlow.getNodes(), edges: reactFlow.getEdges() });
    }
    switchToFile(fileId);
  };

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
    if (!newItem) return false;

    const item: FileNode = {
      id: nanoid(),
      name: newItemName.trim(),
      type: newItem.type,
      ...(newItem.type === "directory" ? { children: [], isOpen: true } : { data: { nodes: [], edges: [] } }),
    };
    const error = createItem(newItem.parentId, item);
    if (error) {
      setNameError(error);
      return false;
    }

    setNewItem(null);
    setNewItemName("");
    setNameError(null);
    setSelectedItemId(item.id);
    if (item.type === "file") openFile(item.id);
    return true;
  };

  const handleRename = (item: FileNode) => {
    setNewItem(null);
    setNameError(null);
    setEditingItemId(item.id);
    setEditingName(item.name);
  };

  const handleDuplicate = (item: FileNode) => {
    const parentId = findParentId(fileTree, item.id);
    const siblings = parentId === null ? fileTree : (findFileById(fileTree, parentId)?.children ?? []);
    const getCopyName = (number: number) => {
      const suffix = number === 1 ? " (Copy)" : ` (Copy ${number})`;
      return `${item.name.slice(0, MAX_ITEM_NAME_LENGTH - suffix.length).trimEnd()}${suffix}`;
    };
    let copyNumber = 1;
    let copyName = getCopyName(copyNumber);
    while (siblings.some((sibling) => sibling.name.toLowerCase() === copyName.toLowerCase())) {
      copyName = getCopyName(++copyNumber);
    }
    const copyItem = (node: FileNode): FileNode => ({
      ...node,
      id: nanoid(),
      data: node.data ? structuredClone(node.data) : undefined,
      children: node.children?.map(copyItem),
    });
    const error = createItem(parentId, { ...copyItem(item), name: copyName });
    if (error) toast.add({ type: "error", title: error });
    else toast.add({ type: "success", title: `${item.type === "file" ? "File" : "Folder"} duplicated` });
  };

  const startNewItem = (type: FileNode["type"], parentId: string | null = null) => {
    setEditingItemId(null);
    setNameError(null);
    setNewItemName("");
    setNewItem({ id: nanoid(), type, parentId });
    if (parentId !== null) {
      updateFileTree((tree) => {
        const revealParent = (items: FileNode[]): FileNode[] =>
          items.map((item) => ({
            ...item,
            isOpen:
              item.id === parentId || (item.children && findFileById(item.children, parentId)) ? true : item.isOpen,
            children: item.children ? revealParent(item.children) : undefined,
          }));
        return revealParent(tree);
      });
    }
  };

  const selectedItem = findFileById(fileTree, selectedItemId ?? currentFileId ?? "");
  const creationParentId = selectedItem
    ? selectedItem.type === "directory"
      ? selectedItem.id
      : findParentId(fileTree, selectedItem.id)
    : null;

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
    toast.add({ type: "success", title: "All folders expanded" });
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
    toast.add({ type: "success", title: "All folders collapsed" });
  };

  const handleExportFile = (item: FileNode) => {
    if (item.type !== "file") return;
    const fileData = item.data;
    if (!fileData) {
      toast.add({ type: "error", title: "File is empty" });
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
    toast.add({ type: "success", title: `Exported ${item.name}` });
  };

  const saveRename = () => {
    if (!editingItemId) return false;
    const error = renameItem(editingItemId, editingName);
    if (error) {
      setNameError(error);
      return false;
    }
    setEditingItemId(null);
    setEditingName("");
    setNameError(null);
    return true;
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
      toast.add({ type: "success", title: "Item moved successfully" });
    } catch (e) {
      console.error(e);
      toast.add({ type: "error", title: "Failed to move item" });
    }
  };

  const handleDelete = (item: FileNode) => {
    deleteAnchorRef.current = itemRows.current.get(item.id) ?? null;
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    deleteItem(itemToDelete.id);
    setDeleteDialogOpen(false);
  };

  const renderFileItem = (item: FileNode, depth = 0) => {
    const isSelected = (selectedItemId ?? currentFileId) === item.id;
    const isEditing = editingItemId === item.id;
    const icon =
      item.type === "directory" ? (
        <>
          <motion.span className="shrink-0" animate={{ rotate: item.isOpen ? 90 : 0 }} transition={treeTransition}>
            <ChevronRight className="size-4" />
          </motion.span>
          {item.isOpen ? <FolderOpen className="size-4" /> : <Folder className="size-4" />}
        </>
      ) : (
        <>
          <span className="w-4 shrink-0" />
          <File className="size-4" />
        </>
      );

    return (
      <motion.div
        key={item.id}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={treeTransition}
        className="overflow-hidden"
      >
        <ContextMenu>
          <ContextMenuTrigger
            ref={(element) => {
              if (element) itemRows.current.set(item.id, element);
              else itemRows.current.delete(item.id);
            }}
            render={
              <div
                className={`flex min-h-8 items-center gap-2 px-2 rounded cursor-pointer transition-none group [&_svg]:shrink-0 ${isEditing ? "py-1" : "h-8"} ${isSelected ? "bg-primary/15" : "hover:bg-foreground/5"}`}
                style={{ paddingLeft: `${8 + depth * 16}px` }}
                draggable={!isEditing}
                onDragStart={(e) => handleDragStart(e, item)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.type === "directory" ? item.id : null)}
              />
            }
          >
            {isEditing ? (
              <>
                {icon}
                <NameEditor
                  label={`Rename ${item.name}`}
                  value={editingName}
                  error={nameError}
                  onChange={(value) => {
                    setEditingName(value);
                    setNameError(null);
                  }}
                  onSave={saveRename}
                  onCancel={() => setEditingItemId(null)}
                />
              </>
            ) : (
              <button
                type="button"
                className="flex h-8 min-w-0 flex-1 items-center gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                aria-expanded={item.type === "directory" ? Boolean(item.isOpen) : undefined}
                aria-current={currentFileId === item.id ? "page" : undefined}
                onClick={() => {
                  setSelectedItemId(item.id);
                  if (item.type === "directory") toggleDirectory(item.id);
                  else openFile(item.id);
                }}
              >
                {icon}
                <span className="truncate text-sm">{item.name}</span>
              </button>
            )}

            <Button
              variant="link"
              size="sm"
              aria-label={`Actions for ${item.name}`}
              className={`h-6 w-6 shrink-0 p-0 cursor-pointer opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ${isEditing ? "hidden" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                // Programmatically trigger context menu on this item
                const trigger = e.currentTarget.closest<HTMLElement>('[data-slot="context-menu-trigger"]');
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
          <ContextMenuContent finalFocus={newItem || editingItemId || deleteDialogOpen ? false : undefined}>
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
                <ContextMenuItem onClick={() => startNewItem("file", item.id)}>
                  <FilePlus className="h-4 w-4 mr-2" />
                  New File
                </ContextMenuItem>
                <ContextMenuItem onClick={() => startNewItem("directory", item.id)}>
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

        <AnimatePresence initial={false}>
          {item.type === "directory" && item.isOpen && (
            <motion.div
              key="children"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={treeTransition}
              className="overflow-hidden"
            >
              <AnimatePresence initial={false}>
                {item.children?.map((child) => renderFileItem(child, depth + 1))}
              </AnimatePresence>
              {newItem?.parentId === item.id && renderNewItem(depth + 1)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderNewItem = (depth: number) => {
    if (!newItem) return null;
    return (
      <div
        key={newItem.id}
        className="flex min-h-8 items-start gap-2 py-1 pr-1"
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        <span className="w-4 shrink-0" />
        {newItem.type === "file" ? (
          <File className="mt-1 size-4 shrink-0" />
        ) : (
          <Folder className="mt-1 size-4 shrink-0" />
        )}
        <NameEditor
          label={newItem.type === "file" ? "File name" : "Folder name"}
          value={newItemName}
          error={nameError}
          onChange={(value) => {
            setNewItemName(value);
            setNameError(null);
          }}
          onSave={createNewItem}
          onCancel={() => setNewItem(null)}
        />
      </div>
    );
  };

  // Animate sidebar collapse/expand
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 0 : 256 }}
      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
      className="border-r bg-card flex shrink-0 flex-col h-full overflow-hidden [&_button]:transition-none [&_input]:transition-none"
    >
      <div className="p-3 border-b w-64">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Files</h3>
          <div className="flex gap-1">
            <Button
              ref={newFileRef}
              variant="ghost"
              size="icon-sm"
              aria-label="New file"
              title="New file"
              onClick={() => startNewItem("file", creationParentId)}
            >
              <FilePlus />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="New folder"
              title="New folder"
              onClick={() => startNewItem("directory", creationParentId)}
            >
              <FolderPlus />
            </Button>
          </div>
        </div>
      </div>

      <ContextMenu>
        <ContextMenuTrigger render={<div className="flex-1 overflow-auto p-2 w-64" />}>
          <AnimatePresence initial={false}>{fileTree.map((item) => renderFileItem(item))}</AnimatePresence>
          {newItem?.parentId === null && renderNewItem(0)}
          {fileTree.length === 0 && !newItem && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              Create a file or folder to get started.
            </p>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent finalFocus={newItem ? false : undefined}>
          <ContextMenuItem onClick={() => startNewItem("file")}>
            <FilePlus className="h-4 w-4 mr-2" />
            New File
          </ContextMenuItem>
          <ContextMenuItem onClick={() => startNewItem("directory")}>
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

      <div className="py-2 px-4 mt-auto flex justify-end w-64">
        <InfoDialog />
      </div>

      <DeleteItemConfirmation
        item={itemToDelete}
        anchor={deleteAnchorRef}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onOpenChangeComplete={(open) => {
          if (!open) setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        returnFocus={() => {
          if (isCollapsed) return false;
          const row =
            itemToDelete && findFileById(fileTree, itemToDelete.id)
              ? deleteAnchorRef.current
              : [...itemRows.current].find(([id]) => findFileById(fileTree, id))?.[1];
          return row?.querySelector<HTMLButtonElement>("button") ?? newFileRef.current;
        }}
      />
    </motion.div>
  );
}
