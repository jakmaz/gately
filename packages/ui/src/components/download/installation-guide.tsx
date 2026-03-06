import { motion } from "motion/react";
import { Badge } from "../ui/badge";

const steps = [
  {
    number: "1",
    title: "Download Installer",
    description: "Get the latest version for your operating system. One-click download, no account needed.",
  },
  {
    number: "2",
    title: "Install & Launch",
    description: "Run the installer and follow the prompts. Gately will be ready in seconds.",
  },
  {
    number: "3",
    title: "Start Building",
    description: "Open Gately and start creating circuits immediately. Your work saves automatically.",
  },
];

export function InstallationGuide() {
  return (
    <section className="w-full py-14 md:py-24 relative overflow-hidden isolate">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm mb-4" variant="secondary">
            <span className="mr-1 text-primary">✦</span> Quick Setup
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Get Started in Minutes
          </h2>
          <p className="text-muted-foreground text-lg">Simple installation process with no complex configuration</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[16.666%] right-[16.666%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center space-y-4"
            >
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-3xl font-bold shadow-xl relative overflow-hidden group">
                  <span className="relative z-10">{step.number}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div
                  className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping opacity-40"
                  style={{
                    animationDuration: "3s",
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
