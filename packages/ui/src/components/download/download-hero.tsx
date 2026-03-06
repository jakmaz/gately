import { Apple, ArrowRight, Monitor } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function DownloadHero() {
  return (
    <section className="relative isolate container mx-auto w-full py-20 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,var(--muted),transparent_50%)] blur-3xl"></div>

      <div className="relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm" variant="secondary">
              <Monitor className="size-3 mr-2" />
              Desktop Application
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
          >
            Gately for <span className="text-primary">Desktop</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience the full power of Gately with native performance, offline access, and seamless integration with
            your workflow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              disabled
              className="h-14 px-8 rounded-full text-base shadow-lg relative overflow-hidden group"
            >
              <Apple className="mr-2 size-5" />
              Download for macOS
              <Badge variant="secondary" className="ml-2 text-xs">
                Coming Soon
              </Badge>
            </Button>

            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base" asChild>
              <a href="/editor">
                Try Web Version
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm text-muted-foreground mt-6"
          >
            Windows and Linux versions are in development
          </motion.p>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    </section>
  );
}
