import { Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { useReactFlow } from "reactflow";
import { Button } from "../ui/button";

export function Controls() {
  const reactFlowInstance = useReactFlow();

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => reactFlowInstance.fitView({ padding: 0.1, duration: 800 })}
        title="Center Canvas"
        className="p-2"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => reactFlowInstance.zoomIn({ duration: 300 })}
        title="Zoom In"
        className="p-2"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => reactFlowInstance.zoomOut({ duration: 300 })}
        title="Zoom Out"
        className="p-2"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      {/* <Button */}
      {/*   variant="ghost" */}
      {/*   size="sm" */}
      {/*   onClick={onToggleLock} */}
      {/*   title={isLocked ? "Unlock Canvas" : "Lock Canvas"} */}
      {/*   className="p-2" */}
      {/* > */}
      {/*   {isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />} */}
      {/* </Button> */}
    </div >

  )
}
