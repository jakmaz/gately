import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { version } from "../../../package.json"

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
          <span className="sr-only">App Information</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Gately <span className="ml-1 text-sm text-muted-foreground">v{version}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto mt-4 flex-1 text-sm">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">About</h3>
            <p>
              Gately is an interactive tool designed for creating, simulating, and sharing digital logic circuits. It allows users to experiment with logic gates, build intricate circuits, and visualize their functionality in real-time.
              Gately is perfect for students, educators, and engineers looking to learn, teach, or prototype digital logic at any complexity.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">How to Use</h3>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Open the simulator and start adding logic gates and components</li>
              <li>Connect gates by dragging and dropping wires between nodes</li>
              <li>Click on inputs to toggle their state</li>
              <li>Hold the <kbd>Shift</kbd> key to select multiple elements at once</li>
            </ol>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" asChild className="w-full">
            <a
              href="https://roadwiseapp.com/app/gately"
              target="_blank"
              rel="noopener noreferrer"
            >
              Suggest features and provide feedback here!
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
