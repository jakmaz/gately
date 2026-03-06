import { ArrowRight, BookOpen, Lightbulb, Rocket, Wrench } from "lucide-react";
import { motion } from "motion/react";

const sections = [
  {
    title: "Getting Started",
    description: "Quick start guide to building your first circuit",
    icon: <Rocket className="size-5" />,
    topics: [
      "Creating your first circuit",
      "Understanding the interface",
      "Basic gate operations",
      "Saving and loading projects",
    ],
  },
  {
    title: "Gate Reference",
    description: "Complete guide to all available logic gates",
    icon: <BookOpen className="size-5" />,
    topics: ["AND, OR, NOT gates", "NAND and NOR gates", "XOR and XNOR gates", "Truth tables explained"],
  },
  {
    title: "Editor Features",
    description: "Master the circuit editor tools",
    icon: <Wrench className="size-5" />,
    topics: ["Drag and drop components", "Wiring and connections", "Labeling and organization", "Keyboard shortcuts"],
  },
  {
    title: "Tutorials",
    description: "Step-by-step project guides",
    icon: <Lightbulb className="size-5" />,
    topics: ["Build a half adder", "Create a full adder", "Design a multiplexer", "Complex circuit patterns"],
  },
];

export function DocsGrid() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate bg-muted/20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="h-full border border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur hover:shadow-lg transition-all hover:border-primary/20 rounded-lg p-6 space-y-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  {section.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{section.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                </div>

                <ul className="space-y-2.5 text-sm">
                  {section.topics.map((topic) => (
                    <motion.li
                      key={topic}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2 text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      <ArrowRight className="size-3.5 mt-0.5 shrink-0 text-primary/60" />
                      <span>{topic}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
