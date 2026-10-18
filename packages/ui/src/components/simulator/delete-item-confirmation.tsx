import { type RefObject, useRef, useSyncExternalStore } from "react";
import type { FileNode } from "../../hooks/use-file-system";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Popover, PopoverContent, PopoverDescription, PopoverTitle } from "../ui/popover";

const NARROW_VIEWPORT = "(width < 640px)";

function subscribeToViewport(onChange: () => void) {
  const media = window.matchMedia(NARROW_VIEWPORT);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function countFiles(items: FileNode[]): number {
  return items.reduce((count, item) => count + (item.type === "file" ? 1 : countFiles(item.children ?? [])), 0);
}

interface DeleteItemConfirmationProps {
  item: FileNode | null;
  anchor: RefObject<HTMLElement | null>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChangeComplete: (open: boolean) => void;
  onConfirm: () => void;
  returnFocus: () => HTMLElement | false | null;
}

export function DeleteItemConfirmation({
  item,
  anchor,
  open,
  onOpenChange,
  onOpenChangeComplete,
  onConfirm,
  returnFocus,
}: DeleteItemConfirmationProps) {
  const isNarrow = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia(NARROW_VIEWPORT).matches,
    () => false,
  );
  const cancelRef = useRef<HTMLButtonElement>(null);
  const title = `Delete “${item?.name ?? ""}”?`;
  const fileCount = countFiles(item?.children ?? []);
  const description =
    item?.type === "directory"
      ? `The folder and its ${fileCount} ${fileCount === 1 ? "file" : "files"} will be permanently deleted.`
      : "This file will be permanently deleted.";
  const actions = (
    <>
      <Button ref={cancelRef} variant="outline" onClick={() => onOpenChange(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={onConfirm}>
        Delete
      </Button>
    </>
  );

  if (isNarrow) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
        <DialogContent showCloseButton={false} initialFocus={cancelRef} finalFocus={returnFocus}>
          <DialogHeader>
            <DialogTitle className="leading-snug wrap-anywhere">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row justify-end">{actions}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
      <PopoverContent
        anchor={anchor}
        side="right"
        align="start"
        sideOffset={8}
        initialFocus={cancelRef}
        finalFocus={returnFocus}
      >
        <PopoverTitle>{title}</PopoverTitle>
        <PopoverDescription>{description}</PopoverDescription>
        <div className="flex justify-end gap-2">{actions}</div>
      </PopoverContent>
    </Popover>
  );
}
