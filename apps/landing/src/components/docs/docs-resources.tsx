import { Button } from "@gately/ui/components/ui/button";
import { Card, CardContent } from "@gately/ui/components/ui/card";
import { ArrowRight, Github, MessageCircle } from "lucide-react";

export function DocsResources() {
  return (
    <section className="w-full py-14 md:py-24 bg-muted/30 relative overflow-hidden isolate">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Need More Help?
          </h2>
          <p className="text-muted-foreground text-lg">Join our community or explore additional resources</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div>
            <Card className="h-full border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all hover:border-primary/20 group">
              <CardContent className="text-center space-y-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Github className="size-8" />
                </div>
                <h3 className="text-xl font-bold">GitHub</h3>
                <p className="text-muted-foreground text-sm">Browse the source code, report issues, and contribute</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://github.com/jakmaz/gately" target="_blank" rel="noopener noreferrer">
                    View Repository
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all hover:border-primary/20 group">
              <CardContent className="text-center space-y-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <MessageCircle className="size-8" />
                </div>
                <h3 className="text-xl font-bold">Discord</h3>
                <p className="text-muted-foreground text-sm">Join our community for help and discussions</p>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all hover:border-primary/20 group">
              <CardContent className="text-center space-y-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <span className="text-3xl">📖</span>
                </div>
                <h3 className="text-xl font-bold">Examples</h3>
                <p className="text-muted-foreground text-sm">Explore sample circuits and templates</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/editor">
                    Try Editor
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
