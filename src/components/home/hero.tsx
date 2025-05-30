import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, } from "lucide-react";
import Link from "next/link";
import { MiniPreview } from "./mini-preview";

export function Hero() {
  return (
    <section className="relative isolate container mx-auto w-full py-14 lg:py-40">
      <div className="relative z-10 px-4 md:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Column - Text Content */}
          <div className="mx-auto sm:text-left text-center">
            <div className="flex justify-center sm:justify-start">
              <Badge
                className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm transition-none"
                variant="secondary"
              >
                <span className="text-primary mr-1">✦</span> Visual Logic Editor
              </Badge>
            </div>
            <h1 className="from-foreground via-foreground/90 to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
              Design Logic<br /><span className="-ml-2 font-serif text-muted-foreground italic">Visually</span> with <span className="text-primary">gately</span>
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed md:text-xl">
              Build logic circuits with a drag-and-drop interface. Real-time feedback.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="h-12 w-full cursor-pointer rounded-full text-base shadow-md transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  Open Editor
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href="#examples">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/20 w-full hover:border-primary/50 h-12 cursor-pointer rounded-full px-8 text-base transition-transform duration-300 hover:translate-y-[-2px]"
                >
                  View Examples
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap sm:justify-start justify-center items-center gap-6">
              <div className="hidden sm:flex text-muted-foreground items-center gap-2 text-sm">
                <Check className="text-primary size-5" />
                <span>Drag & Drop Interface</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Check className="text-primary size-5" />
                <span>Live Simulation</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Check className="text-primary size-5" />
                <span>No signup required</span>
              </div>
            </div>
          </div>

          {/* Right Column - Preview Card */}
          <div className="relative">
            <Card className="p-0 border-border/40 from-background to-background/95 relative overflow-hidden rounded-2xl bg-gradient-to-b shadow-xl backdrop-blur">
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="size-3 rounded-full bg-red-500"></div>
                      <div className="size-3 rounded-full bg-yellow-500"></div>
                      <div className="size-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 p-2 md:p-6">
                  <MiniPreview />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_30%,var(--muted),transparent_35%)] blur-3xl"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_70%,var(--muted),transparent_10%)] blur-3xl"></div>
    </section>
  );
}
