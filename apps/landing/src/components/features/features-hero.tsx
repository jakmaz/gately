import { Badge } from "@gately/ui/components/ui/badge";
import { Button } from "@gately/ui/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturesHero() {
  return (
    <section className="relative isolate container mx-auto w-full py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,var(--muted),transparent_50%)] blur-3xl"></div>

      <div className="relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm" variant="secondary">
              <Sparkles className="size-3 mr-2" />
              Full Feature Set
            </Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Everything You Need to Build <span className="text-primary">Great Circuits</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Powerful tools, intuitive design, and seamless workflow. Gately combines professional-grade features with
            beginner-friendly simplicity.
          </p>

          <div>
            <Button
              size="lg"
              className="h-14 px-8 rounded-full text-base shadow-lg hover:shadow-xl transition-all hover:scale-105"
              asChild
            >
              <a href="/editor">
                Start Building
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </section>
  );
}
