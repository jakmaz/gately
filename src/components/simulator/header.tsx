import { Button } from "@/components/ui/button";
import {
  Menu
} from "lucide-react";
import Link from "next/link";
import AndGate from "../icons/and-gate";
import { Controls } from "./controls";
import { SettingsDialog } from "./settings-dialog";
import { ShareDialog } from "./share-dialog";
import { useFileSystem } from "@/hooks/use-file-system";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({
  onToggleSidebar,
}: HeaderProps) {
  const { getCurrentFile } = useFileSystem();
  const hasMounted = useHasMounted();
  const currentFile = getCurrentFile();

  return (
    <div className="h-14 border-b bg-card flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2"
        >
          <Menu className="h-4 w-4" />
        </Button>

        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-0.5 rounded-md">
            <AndGate className="text-white h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">gately</h1>
        </Link>

        {hasMounted ? (
          <span className="mt-0.5">{currentFile?.name || 'No file selected'}</span>
        ) : (
          <Skeleton className="h-7 w-30 bg-muted-foreground/10" />
        )}
        {/* Canvas Controls */}
        <Controls />
      </div>

      <div>
        <ShareDialog />
        <SettingsDialog />
      </div>

    </div>
  );
}
