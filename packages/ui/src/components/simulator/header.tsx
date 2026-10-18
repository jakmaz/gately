import { Menu } from "lucide-react";
import { findFileById, useFileSystem } from "../../hooks/use-file-system";
import { useHasMounted } from "../../hooks/use-has-mounted";
import { Logo } from "../Logo";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Controls } from "./controls";
import { ImportExportButtons } from "./import-export";
import { SettingsDialog } from "./settings-dialog";
import { ThemePicker } from "./theme-picker";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const currentFile = useFileSystem((state) =>
    state.currentFileId ? findFileById(state.fileTree, state.currentFileId) : undefined,
  );
  const hasMounted = useHasMounted();

  return (
    <div className="h-14 border-b bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="p-2">
          <Menu className="h-4 w-4" />
        </Button>

        <a href="/" className="flex items-center gap-2">
          <Logo className="size-7 shrink-0" aria-hidden="true" />
          <h1 className="text-xl font-bold">gately</h1>
        </a>

        {hasMounted ? (
          <span className="mt-0.5 max-w-64 truncate" title={currentFile?.name}>
            {currentFile?.name || "No file selected"}
          </span>
        ) : (
          <Skeleton className="h-7 w-30 bg-muted-foreground/10" />
        )}
        {/* Canvas Controls */}
        <Controls />
      </div>

      <div className="flex items-center gap-2">
        <ImportExportButtons />
        {/* <ShareDialog /> */}
        <ThemePicker />
        <SettingsDialog />
      </div>
    </div>
  );
}
