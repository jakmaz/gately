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
} from "lucide-react";
import { toast } from "sonner";
import { useFileSystem, FileNode } from "@/hooks/use-file-system";
import { ThemeToggle } from "./theme-toggle";

interface FileExplorerProps {
  isCollapsed: boolean;
  currentFileName: string;
  onFileSelect: (fileId: string) => void;
  currentFileId: string;
}

export function FileExplorer({
  isCollapsed,
  onFileSelect,
  currentFileId
}: FileExplorerProps) {
  const { fileTree, createItem, updateFileTree } = useFileSystem();

  const [newItemDialog, setNewItemDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'directory'>('file');

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

  const renderFileItem = (item: FileNode, depth = 0) => {
    const isSelected = currentFileId === item.id;

    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-accent transition-colors ${isSelected ? 'bg-accent' : ''
            }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            if (item.type === 'directory') {
              toggleDirectory(item.id);
            } else {
              onFileSelect(item.id);
            }
          }}
        >
          {item.type === 'directory' ? (
            <>
              {item.isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {item.isOpen ? (
                <FolderOpen className="h-4 w-4 text-blue-500" />
              ) : (
                <Folder className="h-4 w-4 text-blue-500" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" /> {/* Spacer for alignment */}
              <File className="h-4 w-4 text-gray-500" />
            </>
          )}
          <span className="text-sm truncate flex-1">{item.name}</span>
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
    </div>
  );
}
