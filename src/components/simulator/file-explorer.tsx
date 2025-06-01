import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Folder,
  FolderOpen,
  File,
  Plus,
  ChevronRight,
  ChevronDown,
  Download,
  MoreVertical,
  Trash2,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import { useFileSystem, FileNode } from "@/hooks/use-file-system";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FileExplorerProps {
  isCollapsed: boolean;
}

export function FileExplorer({
  isCollapsed,
}: FileExplorerProps) {
  const { fileTree, createItem, updateFileTree, currentFileId, switchToFile, renameItem, moveItem, deleteItem } = useFileSystem();

  const [newItemDialog, setNewItemDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'directory'>('file');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<FileNode | null>(null);

  const toggleDirectory = (id: string) => {
    updateFileTree(tree => {
      const toggleOpen = (items: FileNode[]): FileNode[] => {
        return items.map(item => {
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
      toast.error('Please enter a name');
      return;
    }

    const newItem: FileNode = {
      id: Date.now().toString(),
      name: newItemName,
      type: newItemType,
      children: newItemType === 'directory' ? [] : undefined,
      isOpen: newItemType === 'directory' ? false : undefined,
    };

    createItem(null, newItem);  // Add to root for now

    setNewItemDialog(false);
    setNewItemName('');
    toast.success(`${newItemType === 'file' ? 'File' : 'Directory'} created successfully`);
  };

  const handleRename = (item: FileNode) => {
    setEditingItemId(item.id);
    setEditingName(item.name);
  };

  const saveRename = () => {
    if (!editingItemId || !editingName.trim()) {
      toast.error('Please enter a valid name');
      return;
    }
    renameItem(editingItemId, editingName.trim());
    setEditingItemId(null);
    setEditingName('');
    toast.success('Item renamed successfully');
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: FileNode) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ id: item.id }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string | null) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.id === targetId) return; // Don't move to self
      moveItem(data.id, targetId);
      toast.success('Item moved successfully');
    } catch (e) {
      console.error(e);
      toast.error('Failed to move item');
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
    toast.success(`${itemToDelete.type === 'file' ? 'File' : 'Directory'} deleted successfully`);
  };

  const renderFileItem = (item: FileNode, depth = 0) => {
    const isSelected = currentFileId === item.id;
    const isEditing = editingItemId === item.id;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors ${isSelected ? 'bg-primary/30' : ' hover:bg-primary/10 '}`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            if (item.type === 'directory') {
              toggleDirectory(item.id);
            } else {
              switchToFile(item.id);
            }
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item.type === 'directory' ? item.id : null)}
        >
          {item.type === 'directory' ? (
            <>
              {item.isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {item.isOpen ? (
                <FolderOpen className="h-4 w-4" />
              ) : (
                <Folder className="h-4 w-4" />
              )}
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
                if (e.key === 'Enter') saveRename();
                if (e.key === 'Escape') setEditingItemId(null);
              }}
              onClick={(e) => e.stopPropagation()}
              className="h-6 text-sm"
              autoFocus
            />
          ) : (
            <span className="text-sm truncate flex-1">{item.name}</span>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 cursor-pointer">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRename(item)} className="focus:bg-white/10 ">
                <Edit className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(item)}
                className="focus:text-destructive focus:bg-white/10 text-destructive"
              >
                <Trash2 className="h-4 text-destructive w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {item.type === 'directory' && item.isOpen && item.children && (
          <div>
            {item.children.map(child => renderFileItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Completely hide when collapsed
  if (isCollapsed) {
    return null;
  }

  return (
    <div className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Files</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="p-1">
              <Download className="h-4 w-4" />
            </Button>
            <Dialog open={newItemDialog} onOpenChange={setNewItemDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Item</DialogTitle>
                  <DialogDescription>
                    Create a new file or directory in your workspace.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant={newItemType === 'file' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewItemType('file')}
                    >
                      File
                    </Button>
                    <Button
                      variant={newItemType === 'directory' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewItemType('directory')}
                    >
                      Directory
                    </Button>
                  </div>
                  <Input
                    placeholder={`Enter ${newItemType} name`}
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && createNewItem()}
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

      <div className="flex-1 overflow-auto p-2">
        {fileTree.map(item => renderFileItem(item))}
      </div>

      <div className="p-2 mt-auto flex justify-between">
        <ThemeToggle />
        <Button variant="outline" size="sm">
          Help
        </Button>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {itemToDelete?.type === 'file' ? 'File' : 'Directory'}</DialogTitle>
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
    </div>
  );
}
