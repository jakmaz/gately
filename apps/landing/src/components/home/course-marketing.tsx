"use client";

import { Badge } from "@gately/ui/components/ui/badge";
import { ArrowRight, Cpu, Layers, Zap } from "lucide-react";

export function CourseMarketing() {
  return (
    <section className="relative isolate py-24 sm:py-40 overflow-hidden bg-muted/20 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 opacity-0 animate-[fade-up_0.5s_ease-out_forwards]">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            The Interactive Computer Science Course
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Forget about static diagrams. Experience exactly how a processor computes mathematically using fully
            functional digital physics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] max-w-6xl mx-auto">
          {/* Main Massive Card */}
          <a
            href="/learn/first-circuit"
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-2xl opacity-0 animate-[fade-up_0.5s_ease-out_forwards]"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent z-0"></div>
            <div className="relative z-10 flex flex-col h-full">
              <Badge className="w-fit mb-4 bg-primary text-primary-foreground border-none">01 / The Fundamentals</Badge>
              <h3 className="text-3xl font-bold mb-4">Start your engine.</h3>
              <p className="text-lg text-muted-foreground max-w-md">
                Learn the physics of computing using logic primitives. Watch binary electrons physically pulse through
                your wires.
              </p>

              <div className="mt-auto self-start bg-primary/10 text-primary px-6 py-3 rounded-full font-bold flex items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Start Course <ArrowRight className="ml-2 size-5" />
              </div>

              {/* Decorative graphic bottom right */}
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="size-64" />
              </div>
            </div>
          </a>

          {/* Small Top Right Card */}
          <a
            href="/learn/nand-nor-gates"
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-xl opacity-0 animate-[fade-up_0.5s_ease-out_forwards] [animation-delay:100ms]"
          >
            <div className="absolute right-4 top-4 text-muted-foreground group-hover:text-primary transition-colors">
              <Layers className="size-6" />
            </div>
            <div className="flex flex-col h-full justify-end">
              <Badge variant="outline" className="w-fit mb-4">
                02 / Universal Logic
              </Badge>
              <h4 className="text-xl font-bold mb-2">NAND & NOR</h4>
              <p className="text-sm text-muted-foreground">
                Construct absolute any circuit strictly out of NAND primitives.
              </p>
            </div>
          </a>

          {/* Small Bottom Right Card */}
          <a
            href="/learn/half-adder"
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-xl opacity-0 animate-[fade-up_0.5s_ease-out_forwards] [animation-delay:200ms]"
          >
            <div className="absolute right-4 top-4 text-muted-foreground group-hover:text-primary transition-colors">
              <Cpu className="size-6" />
            </div>
            <div className="flex flex-col h-full justify-end">
              <Badge variant="outline" className="w-fit mb-4">
                03 / Architecture
              </Badge>
              <h4 className="text-xl font-bold mb-2">Build Adders</h4>
              <p className="text-sm text-muted-foreground">
                Learn how computers literally execute math using Ripple Carry.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
