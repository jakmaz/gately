import { Boxes, Braces, Circle, GitBranch, Orbit, Triangle, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const categories = [
  {
    title: "Logic Gates",
    description: "Complete gate library",
    icon: <Circle className="size-5" />,
    color: "from-blue-500/10 to-cyan-500/10",
    items: [
      { name: "AND Gate", icon: "∧", description: "Basic conjunction logic" },
      { name: "OR Gate", icon: "∨", description: "Basic disjunction logic" },
      { name: "NOT Gate", icon: "¬", description: "Logic inverter" },
      { name: "XOR Gate", icon: "⊕", description: "Exclusive OR operation" },
      { name: "NAND Gate", icon: "⊼", description: "Universal logic gate" },
      { name: "NOR Gate", icon: "⊽", description: "Universal logic gate" },
    ],
  },
  {
    title: "Circuit Components",
    description: "Advanced building blocks",
    icon: <Boxes className="size-5" />,
    color: "from-purple-500/10 to-pink-500/10",
    items: [
      { name: "Toggle Switch", icon: "◉", description: "Interactive input control" },
      { name: "LED Output", icon: "●", description: "Visual output indicator" },
      { name: "Clock Signal", icon: "⌇", description: "Timed pulse generator" },
      { name: "Custom Labels", icon: "A", description: "Name your components" },
    ],
  },
  {
    title: "Editor Features",
    description: "Powerful editing tools",
    icon: <Braces className="size-5" />,
    color: "from-green-500/10 to-emerald-500/10",
    items: [
      { name: "Drag & Drop", icon: "⇄", description: "Intuitive component placement" },
      { name: "Smart Wiring", icon: "─", description: "Auto-routing connections" },
      { name: "Grid Snapping", icon: "#", description: "Precise alignment" },
      { name: "Undo/Redo", icon: "↺", description: "Full history support" },
      { name: "Zoom & Pan", icon: "⊕", description: "Navigate large circuits" },
      { name: "Multi-Select", icon: "□", description: "Batch operations" },
    ],
  },
  {
    title: "Simulation",
    description: "Real-time circuit testing",
    icon: <Zap className="size-5" />,
    color: "from-yellow-500/10 to-orange-500/10",
    items: [
      { name: "Live Simulation", icon: "▶", description: "Instant feedback" },
      { name: "Truth Tables", icon: "⊞", description: "Auto-generated tables" },
      { name: "Signal Flow", icon: "→", description: "Visual signal tracing" },
      { name: "Step-by-Step", icon: "⊳", description: "Debug mode" },
    ],
  },
  {
    title: "Organization",
    description: "Manage your projects",
    icon: <GitBranch className="size-5" />,
    color: "from-indigo-500/10 to-violet-500/10",
    items: [
      { name: "Multiple Files", icon: "📁", description: "Organize circuits" },
      { name: "Local Storage", icon: "💾", description: "Auto-save to browser" },
      { name: "Import/Export", icon: "⇅", description: "JSON file support" },
      { name: "Quick Search", icon: "🔍", description: "Find components fast" },
    ],
  },
  {
    title: "Customization",
    description: "Make it your own",
    icon: <Orbit className="size-5" />,
    color: "from-red-500/10 to-rose-500/10",
    items: [
      { name: "Dark/Light Mode", icon: "☾", description: "Theme switching" },
      { name: "Custom Colors", icon: "🎨", description: "Personalize gates" },
      { name: "Grid Settings", icon: "⊞", description: "Adjust grid size" },
      { name: "Shortcuts", icon: "⌘", description: "Keyboard navigation" },
    ],
  },
];

export function FeatureShowcase() {
  return (
    <section className="w-full py-14 md:py-24 relative isolate">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b_/_0.03),transparent_70%)]"></div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm mb-4" variant="secondary">
            <Triangle className="size-3 mr-2" />
            Feature Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Comprehensive Toolset
          </h2>
          <p className="text-muted-foreground text-lg">
            From basic gates to advanced circuit design, every feature is crafted for your workflow
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                className={`h-full border-border/40 bg-gradient-to-br ${category.color} backdrop-blur hover:shadow-xl hover:border-primary/30 transition-all group`}
              >
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {category.items.map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-border/20 hover:border-primary/20"
                      >
                        <div className="text-2xl w-8 h-8 flex items-center justify-center shrink-0 text-primary">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
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
