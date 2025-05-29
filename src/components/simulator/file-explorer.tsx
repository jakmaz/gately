"use client";

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
import { Edge, Node } from "reactflow";
import { GateNodeProps } from "@/lib/types";

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'directory';
  children?: FileItem[];
  isOpen?: boolean;
}

interface FileExplorerProps {
  isCollapsed: boolean;
  nodes: Node<GateNodeProps>[];
  edges: Edge[];
  currentFileName: string;
}

export function FileExplorer({ isCollapsed, nodes, edges, currentFileName }: FileExplorerProps) {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'My Circuits',
      type: 'directory',
      isOpen: true,
      children: [
        { id: '2', name: 'Basic Gates.json', type: 'file' },
        { id: '3', name: 'Adder Circuit.json', type: 'file' },
      ],
    },
    {
      id: '4',
      name: 'Shared',
      type: 'directory',
      isOpen: false,
      children: [
        { id: '5', name: 'Counter.json', type: 'file' },
        { id: '6', name: 'Multiplexer.json', type: 'file' },
      ],
    },
  ]);
  
  const [selectedFile, setSelectedFile] = useState<string>('2');
  const [newItemDialog, setNewItemDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'directory'>('file');

  const handleExport = () => {
    const circuitData = {
      nodes,
      edges,
      metadata: {
        name: currentFileName,
        created: new Date().toISOString(),
        version: '1.0'
      }
    };

    const dataStr = JSON.stringify(circuitData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentFileName.replace('.json', '')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Circuit exported successfully');
  };

  const toggleDirectory = (id: string) => {
    setFiles(prev => updateFileTree(prev, id, (item) => ({
      ...item,
      isOpen: !item.isOpen
    })));
  };

  const updateFileTree = (items: FileItem[], id: string, updater: (item: FileItem) => FileItem): FileItem[] => {
    return items.map(item => {
      if (item.id === id) {
        return updater(item);
      }
      if (item.children) {
        return {
          ...item,
          children: updateFileTree(item.children, id, updater)
        };
      }
      return item;
    });
  };

  const createNewItem = () => {
    if (!newItemName.trim()) {
      toast.error('Please enter a name');
      return;
    }

    const newItem: FileItem = {
      id: Date.now().toString(),
      name: newItemName + (newItemType === 'file' ? '.json' : ''),
      type: newItemType,
      children: newItemType === 'directory' ? [] : undefined,
      isOpen: newItemType === 'directory' ? false : undefined,
    };

    setFiles(prev => [...prev, newItem]);
    setNewItemDialog(false);
    setNewItemName('');
    toast.success(`${newItemType === 'file' ? 'File' : 'Directory'} created successfully`);
  };

  const renderFileItem = (item: FileItem, depth = 0) => {
    const isSelected = selectedFile === item.id;
    
    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-accent transition-colors ${
            isSelected ? 'bg-accent' : ''
          }`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => {
            if (item.type === 'directory') {
              toggleDirectory(item.id);
            } else {
              setSelectedFile(item.id);
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Files</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="p-1" onClick={handleExport}>
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
        {files.map(item => renderFileItem(item))}
      </div>
    </div>
  );
}