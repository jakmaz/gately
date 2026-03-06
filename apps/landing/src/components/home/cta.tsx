import { ArrowRight } from "lucide-react";
import { Button } from "@gately/ui/components/ui/button";

export function CTA() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden isolate">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--primary-foreground)_r_g_b_/_0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--primary-foreground)_r_g_b_/_0.075)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-foreground/15 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-24 -right-24 w-64 h-64 bg-foreground/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to Build Smarter Circuits?
          </h2>
          <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
            Start designing logic circuits visually with Gately - fast, intuitive, and perfect for learning or
            prototyping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full h-12 px-8 text-base cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
              asChild
            >
              <a href="/editor">
                Try It Now
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <a href="https://github.com/jakmaz/gately" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent h-12 px-8 text-base transition-all duration-300 hover:translate-y-[-2px]"
              >
                View on GitHub
              </Button>
            </a>
          </div>
          <p className="text-sm text-primary-foreground/80 mt-4">
            No login. No limits. Free and open source.
          </p>
        </div>
      </div>
    </section>
  );
}
