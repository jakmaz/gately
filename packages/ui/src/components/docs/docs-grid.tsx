import { BookOpen, Lightbulb, Rocket, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";

const sections = [
  {
    title: "Getting Started",
    description: "Quick start guide to building your first circuit",
    icon: <Rocket className="size-6" />,
    color: "from-blue-500/10 to-cyan-500/10",
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
    icon: <BookOpen className="size-6" />,
    color: "from-purple-500/10 to-pink-500/10",
    topics: ["AND, OR, NOT gates", "NAND and NOR gates", "XOR and XNOR gates", "Truth tables explained"],
  },
  {
    title: "Editor Features",
    description: "Master the circuit editor tools",
    icon: <Wrench className="size-6" />,
    color: "from-green-500/10 to-emerald-500/10",
    topics: ["Drag and drop components", "Wiring and connections", "Labeling and organization", "Keyboard shortcuts"],
  },
  {
    title: "Tutorials",
    description: "Step-by-step project guides",
    icon: <Lightbulb className="size-6" />,
    color: "from-yellow-500/10 to-orange-500/10",
    topics: ["Build a half adder", "Create a full adder", "Design a multiplexer", "Complex circuit patterns"],
  },
];

export function DocsGrid() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b_/_0.03),transparent_70%)]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card
                className={`h-full border-border/40 bg-gradient-to-br ${section.color} backdrop-blur hover:shadow-xl hover:border-primary/30 transition-all group cursor-pointer`}
              >
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground">{section.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pl-[72px]">
                    {section.topics.map((topic, i) => (
                      <motion.div
                        key={topic}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 + i * 0.05 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <div className="size-1.5 rounded-full bg-primary"></div>
                        <span>{topic}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
