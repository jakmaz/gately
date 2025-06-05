import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Need Help?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Welcome to Gately! This app lets you experiment with logical gates
            and build complex circuits easily.
          </p>
          <p>
            <strong>Tip:</strong> Hold the <kbd>Shift</kbd> key to select
            multiple items at once.
          </p>
          <div className="mt-4">
            <Button variant="outline" className="w-full" >
              <ExternalLink className="mr-1" />
              <a
                href="https://www.roadwiseapp.com/app/gately"
                target="_blank"
                rel="noopener noreferrer"
              >
                Suggest features and provide feedback here!
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
