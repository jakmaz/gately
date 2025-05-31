import { Button } from "@/components/ui/button";
import {
  Lock,
  Maximize2,
  Menu,
  Unlock,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Link from "next/link";
import AndGate from "../icons/and-gate";
import { SettingsDialog } from "./settings-dialog";
import { ShareDialog } from "./share-dialog";
import { Separator } from "../ui/separator";

interface EnhancedHeaderProps {
  onToggleSidebar: () => void;
  currentFileName: string;
  onCenterCanvas?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onToggleLock?: () => void;
  isLocked?: boolean;
  canvasControlsEnabled?: boolean;
}

export function Header({
  onToggleSidebar,
  currentFileName,
  onCenterCanvas,
  onZoomIn,
  onZoomOut,
  onToggleLock,
  isLocked = false,
  canvasControlsEnabled = false,
}: EnhancedHeaderProps) {
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

        <div className="text-muted-foreground">
          <span>{currentFileName}</span>
        </div>
        <Separator orientation="vertical" />
        {/* Canvas Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCenterCanvas}
            disabled={!canvasControlsEnabled}
            title="Center Canvas"
            className="p-2"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomIn}
            disabled={!canvasControlsEnabled}
            title="Zoom In"
            className="p-2"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomOut}
            disabled={!canvasControlsEnabled}
            title="Zoom Out"
            className="p-2"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLock}
            disabled={!canvasControlsEnabled}
            title={isLocked ? "Unlock Canvas" : "Lock Canvas"}
            className="p-2"
          >
            {isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div>
        <ShareDialog />
        <SettingsDialog />
      </div>

    </div>
  );
}
