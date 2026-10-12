"use client";

import { Copy, Pencil, Power, Trash2, Unplug } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Button } from "../../ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../../ui/context-menu";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { H, W } from "./constants";
import { GateHandle } from "./gate-handle";
import { GateSymbol, getPortState } from "./gate-symbol";
import type { GateRendererProps } from "./types";
import { useGateActions } from "./use-gate-actions";

export function GateRenderer({ id, data, isConnectable, geometry, label, children, canToggle }: GateRendererProps) {
  const actions = useGateActions(id);
  const [renameOpen, setRenameOpen] = useState(false);
  const [name, setName] = useState(data.label);
  const [nameError, setNameError] = useState(false);
  const nameId = useId();
  const nameInput = useRef<HTMLInputElement>(null);
  const title = geometry.terminal
    ? `${data.label} (${label}): ${Number(data.state)}`
    : `${label}: ${Number(data.state)}`;
  const content = (
    <>
      <GateSymbol geometry={geometry} data={data} label={title} />
      {!data.preview && children}
      {!data.preview &&
        geometry.ports.map((port) => (
          <GateHandle key={port.id} port={port} state={getPortState(port, data)} isConnectable={isConnectable} />
        ))}
    </>
  );

  if (data.preview)
    return (
      <div className="relative" style={{ width: W, height: H }}>
        {content}
      </div>
    );

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger render={<div className="relative" style={{ width: W, height: H }} title={title} />}>
          {content}
        </ContextMenuTrigger>
        <ContextMenuContent>
          {geometry.terminal && (
            <ContextMenuItem
              onClick={() => {
                setName(data.label);
                setNameError(false);
                setRenameOpen(true);
              }}
            >
              <Pencil /> Rename
            </ContextMenuItem>
          )}
          <ContextMenuItem onClick={actions.duplicate}>
            <Copy /> Duplicate
          </ContextMenuItem>
          <ContextMenuItem onClick={actions.disconnect}>
            <Unplug /> Disconnect all
          </ContextMenuItem>
          {canToggle && (
            <ContextMenuItem onClick={actions.toggleState}>
              <Power /> Toggle state
            </ContextMenuItem>
          )}
          <ContextMenuSeparator />
          <ContextMenuItem onClick={actions.remove} variant="destructive">
            <Trash2 /> Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {geometry.terminal && (
        <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
          <DialogContent initialFocus={nameInput}>
            <form
              className="nodrag nopan grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!name.trim()) {
                  setNameError(true);
                  return;
                }
                actions.rename(name);
                setRenameOpen(false);
              }}
            >
              <DialogHeader>
                <DialogTitle>{geometry.terminal === "output" ? "Rename output" : "Rename input"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2">
                <Label htmlFor={nameId}>Name</Label>
                <Input
                  ref={nameInput}
                  id={nameId}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setNameError(false);
                  }}
                  onFocus={(event) => event.target.select()}
                  aria-invalid={nameError || undefined}
                  aria-describedby={nameError ? `${nameId}-error` : undefined}
                />
                {nameError && (
                  <p id={`${nameId}-error`} className="text-xs text-destructive" role="alert">
                    Enter a name.
                  </p>
                )}
              </div>
              <DialogFooter>
                <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
