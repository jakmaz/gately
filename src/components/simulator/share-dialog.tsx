import { Label } from "@radix-ui/react-label";
import { Copy, Share } from "lucide-react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function ShareDialog() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const handleShare = () => {
    // Generate a shareable URL (this would be implemented with actual backend)
    const shareId = Math.random().toString(36).substring(2, 15);
    const url = `${window.location.origin}/shared/${shareId}`;
    setShareUrl(url);
    setShareDialogOpen(true);
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share URL copied to clipboard');
    setShareDialogOpen(false)
  };

  return (
    <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
      <Button disabled variant="ghost" size="sm" onClick={handleShare}>
        <Share className="h-4 w-4 mr-2" />
        Share
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Circuit</DialogTitle>
          <DialogDescription>
            Share your circuit with others using this link
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Shareable Link</Label>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly />
              <Button variant="outline" size="sm" onClick={copyShareUrl}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Anyone with this link will be able to view and copy your circuit.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
