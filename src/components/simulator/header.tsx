import { Button } from "@/components/ui/button";
import {
  Menu,
} from "lucide-react";
import Link from "next/link";
import AndGate from "../icons/and-gate";
import { SettingsDialog } from "./settings-dialog";
import { ShareDialog } from "./share-dialog";

interface EnhancedHeaderProps {
  onToggleSidebar: () => void;
  currentFileName: string;
}

export function Header({ onToggleSidebar, currentFileName }: EnhancedHeaderProps) {

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

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{currentFileName}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ShareDialog />
        <SettingsDialog />
      </div>
    </div>
  );
}
